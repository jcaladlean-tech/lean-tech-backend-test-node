# lean-tech-backend-test-node

### Hello world (Project setup)

  *  Install [Node](https://nodejs.org/en/download/)
  *  Install package.json
  
        ```
        npm install
     ```
          
  * Setup posgres db
  
       ```
        npm run initdb
       ```
    
  * Configure environment variables
                            
    ```
    # Server
    PORT=
    
    # Data Base
    MONGO_URL=
    
    # Postgres
    PGHOST=
    PGUSER=
    PGDATABASE=
    PGPASSWORD=
    PGPORT=
    
    # US Energy Information Administration
    EIA_API_KEY=
    EIA_URL=
    
    # Auth
    TOKEN_KEY=
    
    # Google Drive
    CLIENT_ID=
    CLIENT_SECRET=
    REDIRECT_URIS=
    REFRESH_TOKEN=
    FOLDER=
    
    # Send Email
    EMAIL=
    PASSWORD=
    ```
    
  * Start project
  
       ```
        npm run build
        npm run start
       ```
    
  * Hello World Urls
     * [hola mundo txt](http://ec2-3-12-123-222.us-east-2.compute.amazonaws.com:8080/holamundo/txt)
     * [hola mundo json](http://ec2-3-12-123-222.us-east-2.compute.amazonaws.com:8080/holamundo/json)
  
### NoQSL and SQL
For these tests I used postgres and mongo and I created a simple shipment structure
  * [Shipment SQL](http://ec2-3-12-123-222.us-east-2.compute.amazonaws.com:8080/api/sql/shipment)
  * [Shipment NoSQL](http://ec2-3-12-123-222.us-east-2.compute.amazonaws.com:8080/api/nosql/shipment)

### Demo
This demo are created with the structure in the csv "Data", the urls for Get, Post, Put, Delete
  * [carrier](http://ec2-3-12-123-222.us-east-2.compute.amazonaws.com:8080/api/demo/carrier)
  * [shipment](http://ec2-3-12-123-222.us-east-2.compute.amazonaws.com:8080/api/demo/shipment)  
  * Filters in shipment ("q" param)
    * status
    * origin state
    * origin city
    * destination state
    * destination city
    
### Authentication
  Authentication with JWT

  * [create user](http://ec2-3-12-123-222.us-east-2.compute.amazonaws.com:8080/api/demo/signup) 
    * It needs {fullName:"", email:"", password:"",role:admin-readOnly}
  * [login to get token](http://ec2-3-12-123-222.us-east-2.compute.amazonaws.com:8080/api/demo/signin) 
    * It needs {email:"", password:""}
    * use the token in Authorization header in this way ==>      Bearer {token}
    
### Import - Export
  To import data the application takes a file  with the structure of the xlsx file given for the test "Data-Schema-1.xlsx"

  * [Import carriers](http://ec2-3-12-123-222.us-east-2.compute.amazonaws.com:8080/api/demo/import/carrier) 
    * It needs {uploadFile: file}
  * [Import shipments](http://ec2-3-12-123-222.us-east-2.compute.amazonaws.com:8080/api/demo/import/shipment) 
      * It needs {uploadFile: file}
      
 The data is exported to Google Drive, after that the application sends an email to the user who logs in
  * [Export data](http://ec2-3-12-123-222.us-east-2.compute.amazonaws.com:8080/api/demo/export) 
    * It needs {fileType: xlsx-csv}
    
### Deployment
  The application is in a container on aws

  * [AWS Index url](http://ec2-3-12-123-222.us-east-2.compute.amazonaws.com:8080/) 
