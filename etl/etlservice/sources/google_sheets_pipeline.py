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

if __name__ == "__main__":
    url_or_id = "{1}"
    range_names = {2}
    metadata={5}

    load_pipeline(
        spreadsheet_url_or_id=url_or_id,
        range_names=range_names, 
        metadata=metadata,
    )