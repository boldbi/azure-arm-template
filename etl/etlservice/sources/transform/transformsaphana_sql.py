from hdbcli import dbapi
import duckdb
import numpy as np

SAP_HANA_HOST = "saphana_host"
SAP_HANA_PORT = "saphana_port"  # Adjust as needed
SAP_HANA_USER = "saphana_username"
SAP_HANA_PASS = "saphana_password"
SAP_HANA_DATABASE = "saphana_db"

# Function to get DuckDB table schema
def get_duckdb_schema(duck_connection, table_name):
    query = f"DESCRIBE {table_name}"
    result = duck_connection.execute(query).fetchdf()
    return result

# Function to convert DuckDB column types to saphana compatible types
def map_to_saphana_type(duckdb_type):
    type_mapping = {
        "INTEGER": "INT",
        "BIGINT": "BIGINT",
        "FLOAT": "REAL",  # SAP HANA uses REAL for single-precision floating points
        "DOUBLE": "DOUBLE",
        "VARCHAR": "NVARCHAR(1000)",
        "TEXT": "NCLOB",  # NCLOB for large text in SAP HANA
        "DATE": "DATE",
        "TIMESTAMP": "TIMESTAMP",
        "BOOLEAN": "BOOLEAN" 
    }
    return type_mapping.get(duckdb_type.upper(), "NVARCHAR(5000)")  # Default to NVARCHAR

# Function to generate CREATE TABLE statement for saphana
def generate_create_table_query(duck_table_schema, saphana_table_name):
    create_query = f"CREATE TABLE {saphana_table_name} ("
    columns = []

    for index, row in duck_table_schema.iterrows():
        column_name = row['column_name']
        duckdb_type = row['column_type']
        saphana_type = map_to_saphana_type(duckdb_type)
        columns.append(f"\"{column_name}\" {saphana_type}")

    create_query += ", ".join(columns) + ")"
    return create_query

# Function to generate INSERT INTO statement for saphana
def generate_insert_query(duck_table_schema, saphana_table_name):
    # Wrap each column name with double quotes
    column_names = ", ".join([f'"{col}"' for col in duck_table_schema['column_name']])

    # Create placeholders for each value
    placeholders = ", ".join(["?" for _ in duck_table_schema['column_name']])

    # Generate the INSERT INTO query
    insert_query = f"INSERT INTO {saphana_table_name} ({column_names}) VALUES ({placeholders})"

    return insert_query

# Step 1: Connect to DuckDB and get schema
duck_connection = duckdb.connect(database='duckdbpath', read_only=True)
duck_sqlquery = """sql_query"""
# Define your DuckDB table
duck_table_name = "src_tablename"

# Get schema from DuckDB
duck_table_schema = get_duckdb_schema(duck_connection, duck_sqlquery)
# Step 2: Generate the CREATE TABLE and INSERT INTO queries for saphana
saphana_table_name = "dest_tablename"  # The table name in saphana

create_query = generate_create_table_query(duck_table_schema, saphana_table_name)
insert_query = generate_insert_query(duck_table_schema, saphana_table_name)

# Print the CREATE TABLE and INSERT INTO queries
print("Generated CREATE TABLE Query for Teradata:")
print(create_query)

print("\nGenerated INSERT INTO Query for Teradata:")
print(insert_query)

duck_query = f"{duck_sqlquery}"
df = duck_connection.execute(duck_query).fetchdf()



try:
    con = dbapi.connect(address=SAP_HANA_HOST, port=SAP_HANA_PORT, user=SAP_HANA_USER, password=SAP_HANA_PASS, database=SAP_HANA_DATABASE)
    with con.cursor() as cur:
        try:
            # Check if the table exists
            cur.execute(f"""
                SELECT 1 
                FROM SYS.TABLES 
                WHERE SCHEMA_NAME = '{SAP_HANA_USER}' 
                AND TABLE_NAME = '{saphana_table_name.upper()}';
            """)

            result = cur.fetchone()
            if result:
                # Drop the table if it exists
                drop_table_query = f"DROP TABLE \"{SAP_HANA_USER}\".\"{saphana_table_name.upper()}\";"
                cur.execute(drop_table_query)
        except Exception as e:
            print(f"Error droping table: {e}")
        try:
            cur.execute(create_query)
            print("Table created in saphana")
        except Exception as e:
            print(f"Error creating table: {e}")

        data_to_insert = []
        for index, row in df.iterrows():
            # Debugging: print the data being inserted
            for col_name in duck_table_schema['column_name']:
                if isinstance(row[col_name], float) and np.isnan(row[col_name]):
                    row[col_name] = None  # Replace NaN with None

            data_to_insert.append(tuple(row[col] for col in df.columns))
        try:
            cur.executemany(insert_query, data_to_insert)
        except Exception as e:
            print(f"Error executing inserting", e)
except dbapi.DatabaseError as db_err:
    # Handle any errors that occur during the database connection
    print("Error while connecting to the Teradata database:", db_err)
