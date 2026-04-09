from typing import Sequence, Dict

import dlt
from datetime import datetime
import json
from dateutil import parser as date_parser

from google_sheets import google_spreadsheet
from dlt.sources.credentials import GcpServiceAccountCredentials
from dlt.sources.credentials import GcpOAuthCredentials

def load_pipeline(
    spreadsheet_url_or_id: str,
    range_names: Sequence[str],
     metadata: Dict[str, Dict[str, str]]
) -> None:
    
    try:
        pipeline = dlt.pipeline(
            pipeline_name="{0}_pipeline",
            destination='{3}',
            staging={4},
            dataset_name='{0}',
        )

        data = google_spreadsheet(
            spreadsheet_url_or_id=spreadsheet_url_or_id,
            range_names=range_names,
            get_sheets=not range_names,
            get_named_ranges=False,
        )
        
        for name, original_resource in data.resources.items():
            meta = metadata.get(name, {{}})
            if meta:
                incremental_column = meta.get("replication_key")
                incremental_value = meta.get("replication_value")
                primary_key = json.loads(meta.get("primary_key")) if meta.get("primary_key") else []
                filter_dt = date_parser.parse(incremental_value)
                def filtered_resource():
                    errorRowCount = 0
                    for row in original_resource:
                        row_value = row.get(incremental_column)
                        if row_value:
                            try:
                                parsed_value = date_parser.parse(row_value)
                                if parsed_value > filter_dt:
                                    row[incremental_column] = parsed_value
                                    yield row
                            except Exception as e:
                                if 'Parser must be a string or character stream, not Date' in str(e):
                                    if row_value > filter_dt:
                                        yield row
                                else:
                                    errorRowCount += 1
                                    if errorRowCount == 1:
                                        print(f"Error parsing date for row {{row}}: {{e}}")
                    if errorRowCount > 1:
                        print(f"Total {{errorRowCount}} rows had errors during parsing or empty values and skipped.")
                if primary_key:
                    resource = dlt.resource(filtered_resource, name=name, primary_key= primary_key)
                else:
                    resource = dlt.resource(filtered_resource, name=name)
            else:
                def passthrough_resource(original_resource=original_resource):
                    for row in original_resource:
                        yield row
                resource = dlt.resource(passthrough_resource, name=name)


            # wrapped.apply_hints(incremental=incremental_column)
            info = pipeline.run(resource, write_disposition="merge")
            print(info)
    except Exception as e:
        print(f'An unexpected error occurred: {{e}}')


def load_pipeline_with_named_ranges(spreadsheet_url_or_id: str) -> None:
    """
    Will not load the sheets in the spreadsheet, but it will load all the named ranges in the spreadsheet.
    """
    pipeline = dlt.pipeline(
        pipeline_name="google_sheets_pipeline",
        destination='{3}',
        staging={4},
        full_refresh=True,
        dataset_name="sample_google_sheet_data",
    )
    data = google_spreadsheet(
        spreadsheet_url_or_id=spreadsheet_url_or_id,
        get_sheets=False,
        get_named_ranges=True,
    )
    info = pipeline.run(data)
    print(info)


def load_pipeline_with_sheets_and_ranges(spreadsheet_url_or_id: str) -> None:
    """
    Will load all the sheets in the spreadsheet and all the named ranges in the spreadsheet.
    """
    pipeline = dlt.pipeline(
        pipeline_name="google_sheets_pipeline",
        destination='{3}',
        staging={4},
        full_refresh=True,
        dataset_name="sample_google_sheet_data",
    )
    data = google_spreadsheet(
        spreadsheet_url_or_id=spreadsheet_url_or_id,
        get_sheets=True,
        get_named_ranges=True,
    )
    info = pipeline.run(data)
    print(info)


def load_with_table_rename_and_multiple_spreadsheets(
    spreadsheet_url_or_id: str, range_names1: Sequence[str]
) -> None:
    """Demonstrates how to load two spreadsheets in one pipeline and how to rename tables"""

    pipeline = dlt.pipeline(
        pipeline_name="{0}_pipeline",
        destination='{3}',
        staging={4},
        # full_refresh=True,
        dataset_name="{0}",
    )

    # take data from spreadsheet 1
    data = google_spreadsheet(
        spreadsheet_url_or_id=spreadsheet_url_or_id,
        range_names=[range_names1[0]],
        get_named_ranges=False,
    )

    # take data from spreadsheet 2
    data_2 = google_spreadsheet(
        spreadsheet_url_or_id=spreadsheet_url_or_id,
        range_names=[range_names1[1]],
        get_named_ranges=False,
    )
    # apply the table name to the existing resource: the resource name is the name of the range
    data.resources[range_names1[0]].apply_hints(table_name="first_sheet_data")
    data_2.resources[range_names1[1]].apply_hints(table_name="second_sheet_data")

    # load two spreadsheets
    info = pipeline.run([data, data_2])
    print(info)
    # yes the tables are there
    user_tables = pipeline.default_schema.data_tables()
    # check if table is there
    assert {{t["name"] for t in user_tables}} == {{
        "first_sheet_data",
        "second_sheet_data",
    }}
    
if __name__ == "__main__":
    url_or_id = "{1}"
    range_names = {2}
    metadata={5}

    load_pipeline(
        spreadsheet_url_or_id=url_or_id,
        range_names=range_names, 
        metadata=metadata,
    )