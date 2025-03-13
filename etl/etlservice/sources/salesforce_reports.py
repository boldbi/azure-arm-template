import requests
import time
import duckdb
from datetime import datetime

SF_INSTANCE =  'salesforce_instance_url' 
ACCESS_TOKEN = 'salesforce_access_token'
report_id = "salesforce_report_id"
table_name = 'salesforce_table_name'
pipeline_name = 'salesforce_pipeline_name'

def process_report():
    url = f"{SF_INSTANCE}/services/data/v60.0/analytics/reports/{report_id}"
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}"
    }
    response = requests.get(url, headers=headers)
    return response.json()
    
    
def fetch_report_instance(report_id):
    url = f"{SF_INSTANCE}/services/data/v60.0/analytics/reports/{report_id}/instances"
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}"
    }
    response = requests.get(url, headers=headers)
    return response.json()


def process_report_instance(instance_url):
    url = f"{SF_INSTANCE}{instance_url}"
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}"
    }
    response = requests.get(url, headers=headers)
    return response.json()


# Move data to DuckDB
def move_to_duckdb(data, columns):
    con = duckdb.connect(r"salesforce_duckdb_path")
    
    
    rows = [[cell.get("label", "") for cell in row["dataCells"]] for row in data["factMap"]["T!T"]["rows"]]
    isDataMoved = False
    if not rows:
        con.close()
        isDataMoved = False
    else:
        con.execute(f"""
                CREATE SCHEMA IF NOT EXISTS {pipeline_name}
        """)
        
        con.execute(f"""
            CREATE TABLE IF NOT EXISTS {pipeline_name}.{table_name} ({', '.join([f'"{col}" TEXT' for col in columns])})
        """)
        
        # Insert data 
        con.executemany(f"INSERT INTO {pipeline_name}.{table_name} VALUES ({', '.join(['?'] * len(columns))})", rows)
        con.commit()
        con.close()
        isDataMoved =  True
    return isDataMoved


instances = fetch_report_instance(report_id)
print('Instance Count:' , len(instances))
if(len(instances) > 0):
    for instance in instances:
        instance_data = process_report_instance(instance["url"])
        columns = [col.replace(" ", "_").lower() for col in instance_data["reportMetadata"]["detailColumns"]]
        isCompleted = move_to_duckdb(instance_data, columns)
        if(isCompleted):
            print(f"Data for instance {instance['id']} has been processed.")
        else:
            print(f"No Data found for instance {instance['id']}.")
else:
    print('Fetching data from the report')
    data = process_report()
    columns = [col.replace(" ", "_").lower() for col in data["reportMetadata"]["detailColumns"]]
    isCompleted = move_to_duckdb(data, columns)
    if(isCompleted):
        print(f"Data for report, {report_id} has been processed.")
    else:
        print(f"No Data found for report, {report_id}.")      
