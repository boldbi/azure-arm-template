from simple_salesforce import Salesforce
import requests
import pandas as pd
from io import StringIO
import duckdb

sf = Salesforce(username='salesforce_username',password='salesforce_password', security_token='salesforce_token')

sf_instance =  'salesforce_instance_url'
reportId = 'salesforce_report_id' 
export = '?isdtp=p1&export=1&enc=UTF-8&xf=csv'
sfUrl = sf_instance + '/' + reportId + export
response = requests.get(sfUrl, headers=sf.headers, cookies={'sid': sf.session_id})
pipeline_name = 'salesforce_pipeline_name'
download_report = response.content.decode('utf-8')
df1 = pd.read_csv(StringIO(download_report))
if len(df1) > 0:
    print('Row Count:' , len(df1))
    
    con = duckdb.connect(r"salesforce_duckdb_path")
    table_name = 'salesforce_table_name'
    
    con.execute(f"CREATE SCHEMA IF NOT EXISTS {pipeline_name}")
    
    con.execute(f"CREATE TABLE {pipeline_name}.{table_name} AS SELECT * FROM df1")
    
    print(f'Data moved to DuckDB, TableName: {table_name}')
else:
    print(f'No Data Found')