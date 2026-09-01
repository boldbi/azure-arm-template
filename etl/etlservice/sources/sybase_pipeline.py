import dlt
import pyodbc

# Step 1: Connect to Sybase using DSN
dsn_name = "{0}"
username = "{1}"
password = "{2}"
table_names = {3} 


conn_str = "DSN=" + dsn_name + ";UID=" + username + ";PWD=" + password
sybase_conn = pyodbc.connect(conn_str)

# Step 2: Define DLT pipeline
pipeline = dlt.pipeline(
    pipeline_name="{4}_pipeline",
    destination="{5}",
    dataset_name="{4}"
)

# Step 3: Create a DLT resource to stream data
def get_sybase_table_resource(table_names):
    @dlt.resource(name=table_names, write_disposition="replace")
    def table_data():
        cursor = sybase_conn.cursor()
        cursor.execute("SELECT * FROM " + table_names)
        columns = [column[0] for column in cursor.description]
        for row in cursor.fetchall():
            yield dict(zip(columns, row))
    return table_data

# Step 4: Run the pipeline
for table in table_names:
    resource = get_sybase_table_resource(table)
    info = pipeline.run(resource)
    print(info)
