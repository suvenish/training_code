import json
import pymysql
import os

# Retrieve database credentials from environment variables for security
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

# Establish a connection to MySQL
def get_db_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor # Send the commands to db and to retrieve the data from the db
    ) # in the form of dict

# Lambda handler function
def lambda_handler(event, context):
    try:
        operation = event.get('operation')  # CRUD
        data = event.get('data', {})

        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                if operation == "CREATE":
                    sql = "INSERT INTO your_table_name (col_1, col_2) VALUES (%s, %s)"
                    cursor.execute(sql, (data['col_1'], data['col_2']))
                    connection.commit() # To make sure the changes made to the db are consistent
                    return {"status": "Record created successfully"}

                elif operation == "READ":
                    sql = "SELECT * FROM your_table_name WHERE id = %s"
                    cursor.execute(sql, (data['id'],))
                    result = cursor.fetchone() # Fetch the data from the active db and gives us the fst row
                    return {"status": "Record fetched successfully", "data": result}

                elif operation == "UPDATE":
                    sql = "UPDATE your_table_name SET col_1 = %s WHERE id = %s"
                    cursor.execute(sql, (data['col_1'], data['id']))
                    connection.commit()
                    return {"status": "Record updated successfully"}

                elif operation == "DELETE":
                    sql = "DELETE FROM your_table_name WHERE id = %s"
                    cursor.execute(sql, (data['id'],))
                    connection.commit()
                    return {"status": "Record deleted successfully"}

                else:
                    return {"error": "Unsupported operation"}

    except Exception as e:
        print("Error:", str(e))
        return {"error": str(e)}


#Input
"""
{
  "operation": "CREATE",
  "data": {
    "column1": "value1",
    "column2": "value2"
  }
}
"""
