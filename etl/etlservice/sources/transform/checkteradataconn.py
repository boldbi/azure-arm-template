import teradatasql
import duckdb

hostname = "{0}"                                 #Add Host
username = "{1}"                                   #Add Username
password = "{2}"                                   #Add Password
database = "{3}"                               # Add database

try:
    # Attempt to connect to the DB2 database
    if({4}):
        with teradatasql.connect(host=hostname, user=username, password=password) as db2_connection:
            with db2_connection.cursor() as cursor:
                create_database_query = f"CREATE DATABASE {{database}}"
                cursor.execute(create_database_query)
                print("Connection to Teradata successful!")
    else:
        db2_connection = teradatasql.connect(host=hostname, user=username, password=password, database=database)
        if db2_connection:
            print("Connection to Teradata successful!")
            db2_connection.close()
        else:
            print("Failed to connect to Teradata.")
    
except Exception as e:
    print(f"Error: {{e}}")