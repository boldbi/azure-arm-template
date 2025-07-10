from clickhouse_driver import Client

client = Client(
    host='{0}',
    port={1},
    user='{2}',
    password='{3}',  # Add password if applicable
    secure={4}  # Use True only if SSL is enabled
)

try:
    client.execute('SELECT 1')
    print("Connection successful")
except Exception as e:
    print(f"Connection failed: {{e}}")
