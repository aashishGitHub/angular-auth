const express = require('express');
const app = express();
const sqlite = require('sqlite3').verbose();

const database = new sqlite.Database('demo');

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers','Content-Type');
  next();
});

database.serialize(() => {
  database.run(`CREATE TABLE IF NOT EXISTS User (
      Name TEXT NOT NULL,
      Email TEXT NOT NULL,
      ContactNumber TEXT NOT NULL,
      Address TEXT NOT NULL,
      Edit TEXT NULL
    )`
  );

  let usersList = [];
  database.each('SELECT rowid, Name, Email, ContactNumber, Address, Edit FROM User', (err,row) => {
    usersList.push({
      Id: row.rowid,
      Name: row.Name,
      Email: row.Email,
      ContactNumber: row.ContactNumber,
      Address: row.Address,
      Edit: row.Edit
    });
  }, (err,row) => {
    console.log(usersList);
  });
});

//database.close();

app.get('/api/users', (req,res) => {
  let usersList = [];
    database.each('SELECT rowid, Name, Email, ContactNumber, Address, Edit FROM User', (err,row) =>{
      usersList.push({
        Id: row.rowid,
        Name: row.Name,
        Email: row.Email,
        ContactNumber: row.ContactNumber,
        Address: row.Address,
        Edit: row.Edit
      });
    },(error,row) => {
      console.log(usersList);
      res.send(usersList);
    });
});

app.post('/api/users', (req,res) => {
 const stmt = database.prepare(`INSERT INTO User VALUES (?,?,?,?,?)`);
 stmt.run(req.body.Name,req.body.Email,req.body.ContactNumber,req.body.Address,req.body.Edit);
 stmt.finalize();

 let usersList = [];
 database.each('SELECT rowid, Name, Email, ContactNumber, Address, Edit FROM User', (err,row) => {
   usersList.push({
     Id: row.rowid,
     Name: row.Name,
     Email: row.Email,
     ContactNumber: row.ContactNumber,
     Address: row.Address,
     Edit: row.Edit
   });
 },(err,row) => {
   console.log(usersList);
   res.send(usersList);
 });
});

app.put('/api/users/:Id',(req,res) => {
  const stmt = database.prepare(`UPDATE User SET Name = ?,Email = ?,ContactNumber = ?,
                                                 Address = ?,Edit = ? WHERE rowid = ?`);
  stmt.run(req.body.Name,req.body.Email,req.body.ContactNumber,req.body.Address,req.body.Edit,req.params.Id);
  stmt.finalize();
  res.status(200).send(`User ${req.body.Name} updated successfully`);

  let usersList = [];
  database.each('SELECT rowid, Name, Email, ContactNumber, Address, Edit FROM User', (err,row) => {
    usersList.push({
      Id: row.rowid,
      Name: row.Name,
      Email: row.Email,
      ContactNumber: row.ContactNumber,
      Address: row.Address,
      Edit: row.Edit
    });
  }, (err,row) => {
    console.log(usersList);
    res.send(usersList);
  });
});

app.delete('/api/users/:Id',(req,res) => {
  const stmt = database.prepare(`DELETE FROM User WHERE rowid=?`);
  stmt.run(req.params.Id);
  stmt.finalize();

  res.status(200).send(`User ${user.Name} deleted successfully`);
  usersList = [];
  database.each('SELECT rowid, Name, Email, ContactNumber, Address, Edit FROM User', (err,row) => {
    usersList.push({
      Id: row.rowid,
      Name: row.Name,
      Email: row.Email,
      ContactNumber: row.ContactNumber,
      Address: row.Address,
      Edit: row.Edit
    });
  },(err,row) => {
    console.log(usersList);
    res.send(usersList);
  });
});

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
