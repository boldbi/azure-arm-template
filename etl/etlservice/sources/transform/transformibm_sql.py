import os
db2clientlib
import duckdb
import ibm_db
import pandas as pd
import numpy as np

# Function to get DuckDB table schema
def get_duckdb_schema(duck_connection, table_name):
    query = f"DESCRIBE {table_name}"
    result = duck_connection.execute(query).fetchdf()
    return result

# Function to convert DuckDB column types to DB2 compatible types
def map_to_db2_type(duckdb_type):
    type_mapping = {
        "INTEGER": "INT",
        "BIGINT": "BIGINT",
        "FLOAT": "FLOAT",
        "DOUBLE": "DOUBLE",
        "VARCHAR": "VARCHAR(8000)",  # Adjust length as needed
        "TEXT": "CLOB",
        "DATE": "DATE",
        "TIMESTAMP": "TIMESTAMP",
        "BOOLEAN": "BOOLEAN"
    }
    return type_mapping.get(duckdb_type.upper(), "VARCHAR(8000)")  # Default to VARCHAR

# Function to generate CREATE TABLE statement for IBM DB2
def generate_create_table_query(duck_table_schema, db2_table_name):
    create_query = f"CREATE TABLE {db2_table_name} ("
    columns = []
    
    for index, row in duck_table_schema.iterrows():
        column_name = row['column_name']
        duckdb_type = row['column_type']
        db2_type = map_to_db2_type(duckdb_type)
        columns.append(f"\"{column_name}\" {db2_type}")
    
    create_query += ", ".join(columns) + ")"
    return create_query

# Function to generate INSERT INTO statement for IBM DB2
def generate_insert_query(duck_table_schema, db2_table_name):
    # Wrap each column name with double quotes
    column_names = ", ".join([f'"{col}"' for col in duck_table_schema['column_name']])
    
    # Create placeholders for each value
    placeholders = ", ".join(["?" for _ in duck_table_schema['column_name']])
    
    # Generate the INSERT INTO query
    insert_query = f"INSERT INTO {db2_table_name} ({column_names}) VALUES ({placeholders})"
    
    return insert_query

# Step 1: Connect to DuckDB and get schema
duck_connection = duckdb.connect(database='duckdbpath', read_only=True)
duck_sqlquery = """sql_query"""
# Define your DuckDB table
duck_table_name = "src_tablename"

# Get schema from DuckDB
duck_table_schema = get_duckdb_schema(duck_connection, duck_sqlquery )

# Step 2: Generate the CREATE TABLE and INSERT INTO queries for IBM DB2
db2_table_name = "dest_tablename"  # The table name in DB2

create_query = generate_create_table_query(duck_table_schema, db2_table_name)
insert_query = generate_insert_query(duck_table_schema, db2_table_name)

# Print the CREATE TABLE and INSERT INTO queries
print("Generated CREATE TABLE Query for DB2:")
print(create_query)

print("\nGenerated INSERT INTO Query for DB2:")
print(insert_query)

# Step 3: Connect to IBM DB2 and insert data
# Connect to DB2 (replace with your DB2 credentials)
db2_connection_string = "db2connstring"
db2_connection = ibm_db.connect(db2_connection_string, "", "")

duck_query = f"{duck_sqlquery}"
df = duck_connection.execute(duck_query).fetchdf()
try:
    stmt = ibm_db.prepare(db2_connection, f"DROP TABLE {db2_table_name} IF EXISTS ")
    ibm_db.execute(stmt)
    print("DROP TABLE in DB2")
except Exception as e:
    print(f"Error creating table: {e}")
    # Optionally, print more details about the row and columns involved
try:
    stmt = ibm_db.prepare(db2_connection, create_query)
    ibm_db.execute(stmt)
    print("Table created in DB2")
except Exception as e:
    print(f"Error creating table: {e}")
    # Optionally, print more details about the row and columns involved
# Query data from DuckDB




# Insert data into DB2
for index, row in df.iterrows():
    # Debugging: print the data being inserted
    for col_name in duck_table_schema['column_name']:
        if isinstance(row[col_name], float) and np.isnan(row[col_name]):
            row[col_name] = None  # Replace NaN with None
    print(f"Inserting row {index}: {row.to_dict()}")
    
    stmt = ibm_db.prepare(db2_connection, insert_query)
    
    # Bind parameters to the insert statement
    for col_index, col_name in enumerate(duck_table_schema['column_name']):
        ibm_db.bind_param(stmt, col_index + 1, row[col_name])
    
    # Execute the insert statement
    try:
        ibm_db.execute(stmt)
    except Exception as e:
        print(f"Error executing insert for row {index}: {e}")
        # Optionally, print more details about the row and columns involved
        continue

# Close the DB2 connection
ibm_db.close(db2_connection)
duck_connection.close()

print("\nData transfer completed successfully!")
