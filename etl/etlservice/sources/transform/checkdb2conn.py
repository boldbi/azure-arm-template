import os
db2clientlib
import ibm_db
# Function to validate Db2 connection
def validate_db2_connection(db2_connection_string):
    try:
        # Attempt to connect to the DB2 database
        db2_connection = ibm_db.connect(db2_connection_string, "", "")
        
        if db2_connection:
            print("Connection to IBM DB2 successful!")
            ibm_db.close(db2_connection)

            return True
        else:
            print("Failed to connect to IBM DB2.")
            return False
    except Exception as e:
        print(f"Error: {e}")
        return False

# Main function
if __name__ == "__main__":
    # Connection string format: DATABASE=your_db;HOSTNAME=your_host;PORT=your_port;UID=your_user;PWD=your_password
    db2_connection_string = (
        "DATABASE=your_db2_database;"
        "HOSTNAME=your_db2_hostname;"
        "PORT=portnum;"  # Replace with your DB2 port
        "UID=your_db2_user_id;"
        "PWD=your_db2_password;"
    )
    
    # Call function to validate connection
    is_connected = validate_db2_connection(db2_connection_string)

   