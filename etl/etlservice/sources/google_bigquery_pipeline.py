import dlt
import pandas as pd
from google.cloud import bigquery

def load_standalone_table_resource() -> None:
    credentials_path = "{1}"
    project_id = "{2}"
    dataset = "{5}"
    table_names = [{4}]  # Example: ["sales", "stores"]

    pipeline = dlt.pipeline(
        pipeline_name="{0}_pipeline",
        destination="{3}",
        dataset_name="{0}"
    )

    for table in table_names:
        df = load_bigquery_table(credentials_path, project_id, dataset, table)
        resource = dlt.resource(df, name=table)
        load_info = pipeline.run(resource, table_name=table, write_disposition="merge")
        print(load_info)

def load_bigquery_table(credentials_path: str, project_id: str, dataset: str, table_name: str) -> pd.DataFrame:
    client = bigquery.Client.from_service_account_json(credentials_path)
    query = "SELECT * FROM `" + project_id + "." + dataset + "." + table_name + "`"
    df = client.query(query).to_dataframe(create_bqstorage_client=True)
    return df

if __name__ == "__main__":
    load_standalone_table_resource()
