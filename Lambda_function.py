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
        cursorclass=pymysql.cursors.DictCursor
    )

# Lambda handler function
def lambda_handler(event, context):
    try:
        operation = event.get('operation')  # "CREATE", "READ", "UPDATE", "DELETE"
        data = event.get('data', {})

        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                if operation == "CREATE":
                    sql = "INSERT INTO your_table_name (column1, column2) VALUES (%s, %s)"
                    cursor.execute(sql, (data['column1'], data['column2']))
                    connection.commit()
                    return {"status": "Record created successfully"}

                elif operation == "READ":
                    sql = "SELECT * FROM your_table_name WHERE id = %s"
                    cursor.execute(sql, (data['id'],))
                    result = cursor.fetchone()
                    return {"status": "Record fetched successfully", "data": result}

                elif operation == "UPDATE":
                    sql = "UPDATE your_table_name SET column1 = %s WHERE id = %s"
                    cursor.execute(sql, (data['column1'], data['id']))
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
