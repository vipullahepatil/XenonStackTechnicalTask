import express, { request, response } from 'express';
import { createConnection } from 'mysql';
import cors from 'cors';

const app=express();
app.use(cors());
app.use(express.json());

const con=createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"project123"
});

con.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("database Connection Done");
    }
});

const tableName = 'projectDemo1';
const columns = [
  'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY',
  'name VARCHAR(255) NOT NULL',
  'email VARCHAR(255) NOT NULL UNIQUE',
  'password VARCHAR(255) NOT NULL'
];

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(',')})`;
con.query(createTableQuery, (error) => {
    if(error){
        console.log(error);
    }
    else{
        console.log("Table Create succesfully");
    }
  });

app.post('/register',(request,response)=>{
    var insertQry=`insert into projectDemo1 values(
        ${request.body.id},'${request.body.name}',
        '${request.body.email}',
        '${request.body.password}'
    )`;
    con.query(insertQry,(error,result)=>{
        if(error){
            response.status(500).send({message:"Internal Error"});
        }
        else{
            response.status(200).send({message:"Data inserted succesfully"});
        }
    });
});

app.post('/login',(request,response)=>{
    var selectQry=`select * from projectDemo1 where email='${request.body.email}' and password='${request.body.password}'`;
    con.query(selectQry,(error,result)=>{
        if(error){
            response.status(500).send({message:"something went wrong"});
        }
        else if(result==''){
            response.status(500).send({message:"Data not found"});
        }
        else{
            response.status(200).send(result);
        }
    });
});

app.listen(9800,()=>{
    console.log("Server listening on port 9800");
});
