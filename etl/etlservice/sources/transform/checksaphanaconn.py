from hdbcli import dbapi

def connect_to_sap_hana(host, port, user, password, database_name):
    try:
        # Establish connection
        connection = dbapi.connect(
            address=host,
            port=port,
            user=user,
            password=password,
            database=database_name
        )

        print("Connection successful!")
        connection.close()
    except dbapi.Error as err:
        print(f"Error connecting to SAP HANA: {err}")

# Example usage
if __name__ == "__main__":
    SAP_HANA_HOST = "saphana_host"
    SAP_HANA_PORT = "saphana_port"  # Adjust as ne eded
    SAP_HANA_USER = "saphana_user"
    SAP_HANA_PASSWORD = "saphana_pass"
    SAP_HANA_DATABASE = "saphana_db"
    connect_to_sap_hana(SAP_HANA_HOST, SAP_HANA_PORT, SAP_HANA_USER, SAP_HANA_PASSWORD, SAP_HANA_DATABASE)
