from firebolt.db import connect, OperationalError
from firebolt.client import DEFAULT_API_URL
from firebolt.client.auth import ClientCredentials
from datetime import datetime

connection = None
cursor = None

try:
    # Replace the firebolt_conn_string with the credentials from the settings tab
    connection  = connect(firebolt_conn_string)
    cursor = connection.cursor()
    cursor.execute("Select version();")
    print("Connection successful")
except Exception as e:
    print(f"Connection failed:", str(e))

finally:
    cursor.close()
    if connection:
        connection.close()