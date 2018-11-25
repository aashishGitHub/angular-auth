const express = require('express');
const app = express();
const sqlite = require('sqlite3').verbose();

const database = new sqlite.Database('demo');
database.serialize(() => {
  database.run(`CREATE TABLE User (
      Name TEXT NOT NULL,
      Email TEXT NOT NULL,
      ContactNumber TEXT NOT NULL,
      Address TEXT NOT NULL,
      Edit TEXT NULL
    )`
  );
  const stmt = database.prepare(`INSERT INTO User VALUES (?,?,?,?,?)`);
  stmt.run('Jitendra Sabat','jitendra@gmail.com','7829831698','Bangalore','Edit');
  stmt.run('Jayadev Sabat','jayadev@gmail.com','1234567890','Bhubaneswar','Edit1');
  stmt.finalize();

  database.each('SELECT rowid, Name, Email, ContactNumber, Address, Edit FROM User', (err,row) =>{
    console.log("User : " + row.rowid, row.Name , row.Email, row.ContactNumber, row.Address, row.Edit);
  });
});

database.close();

app.get('/api/users', (req,res) => {
  res.send([
    {
      Name: 'Jitendra Sabat',
      Email: 'jitendra@gmail.com',
      ContactNumber: '7829831698',
      Address: 'Bangalore',
      Edit: 'Edit'
    }
  ]);
});

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
