import teradatasql
import duckdb
import pandas as pd
import numpy as np

hostname = "teradata_hostname"                                 #Add Host
USER = "teradata_username"                                   #Add Username
PASS = "teradata_password"                                  #Add Password
database = "teradata_database"                               # Add database
                                 

# Function to get DuckDB table schema
def get_duckdb_schema(duck_connection, table_name):
    query = f"DESCRIBE {table_name}"
    result = duck_connection.execute(query).fetchdf()
    return result

# Function to convert DuckDB column types to DB2 compatible types
def map_to_teradata_type(duckdb_type):
    type_mapping = {
        "INTEGER": "INTEGER",
        "BIGINT": "BIGINT",
        "SMALLINT": "SMALLINT",
        "FLOAT": "FLOAT",
        "DOUBLE": "DOUBLE PRECISION",
        "VARCHAR": "VARCHAR(8000)",  # Default max length in Teradata
        "TEXT": "CLOB",
        "DATE": "DATE",
        "TIMESTAMP": "TIMESTAMP",
        "BOOLEAN": "VARCHAR(50)"
    }
    return type_mapping.get(duckdb_type.upper(), "VARCHAR(8000)")  # Default to VARCHAR

# Function to generate CREATE TABLE statement for Teradata
def generate_create_table_query(duck_table_schema, teradata_table_name):
    create_query = f"CREATE TABLE {teradata_table_name} ("
    columns = []

    for index, row in duck_table_schema.iterrows():
        column_name = row['column_name']
        duckdb_type = row['column_type']
        teradata_type = map_to_teradata_type(duckdb_type)
        columns.append(f"\"{column_name}\" {teradata_type}")

    create_query += ", ".join(columns) + ")"
    return create_query

# Function to generate INSERT INTO statement for Teradata
def generate_insert_query(duck_table_schema, teradata_table_name):
    # Wrap each column name with double quotes
    column_names = ", ".join([f'"{col}"' for col in duck_table_schema['column_name']])

    # Create placeholders for each value
    placeholders = ", ".join(["?" for _ in duck_table_schema['column_name']])

    # Generate the INSERT INTO query
    insert_query = f"INSERT INTO {teradata_table_name} ({column_names}) VALUES ({placeholders})"

    return insert_query

# Step 1: Connect to DuckDB and get schema
duck_connection = duckdb.connect(database='duckdbpath', read_only=True)

# Define your DuckDB table
duck_table_name = "src_tablename"

# Get schema from DuckDB
duck_table_schema = get_duckdb_schema(duck_connection, duck_table_name)

# Step 2: Generate the CREATE TABLE and INSERT INTO queries for Teradata
teradata_table_name = "dest_tablename"  # The table name in Teradata

create_query = generate_create_table_query(duck_table_schema, teradata_table_name)
insert_query = generate_insert_query(duck_table_schema, teradata_table_name)

duck_query = f"SELECT * FROM {duck_table_name}"
df = duck_connection.execute(duck_query).fetchdf()



try:
    with teradatasql.connect(host=hostname, user=USER, password=PASS, database=database) as con:
        with con.cursor() as cur:

            cur.execute(f"""SELECT 1 FROM dbc.tables WHERE DatabaseName = '{database}' and tablename = '{teradata_table_name}';""")

            result = cur.fetchone()

            if result:
                # Drop the table if it exists
                drop_table_query = f"DROP TABLE {teradata_table_name};"
                cur.execute(drop_table_query)
         
            try:
                cur.execute(create_query)
            except Exception as e:
                print(f"Error creating table: {e}")

            data_to_insert = []
            for index, row in df.iterrows():
                data_to_insert.append(tuple(row[col] for col in df.columns))
            try:
                cur.executemany(insert_query, data_to_insert)
                print(f"Table moved to the destination, {teradata_table_name}")
            except Exception as e:
                print(f"Error while inserting the data", str(e))
except teradatasql.DatabaseError as db_err:
    # Handle any errors that occur during the database connection
    print("Error while connecting to the Teradata database:", db_err)

duck_connection.close()