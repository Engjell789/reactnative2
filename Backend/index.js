const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require('jsonwebtoken');




const path = require('path');


const secretKey = 'my_secret_key';




const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "webmobile",
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.json())
app.use(cors())


app.get("/dhomat", (req, res) => {
  db.query("SELECT * FROM dhomat", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});


//login
app.post('/v1/login', (req, res) => {
  const { name, email, password, role } = req.body;

 
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = 'INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, password, role], (err, result) => {
    if (err) {
      console.error('Error during POST request:', err);
      return res.status(500).send('Error adding user');
    } else {
      return res.status(201).json({ message: 'User added successfully' });
    }
  });
});


app.put('/v1/login/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

 
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = 'UPDATE login SET name = ?, email = ?, password = ?, role = ? WHERE id = ?';
  db.query(query, [name, email, password, role, id], (err, result) => {
    if (err) {
      console.error('Error during PUT request:', err);
      return res.status(500).send('Error updating user');
    } else {
      return res.json({ message: 'User updated successfully' });
    }
  });
});


app.delete('/v1/login/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM login WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error during DELETE request:', err);
      return res.status(500).send('Error deleting user');
    } else {
      return res.json({ message: 'User deleted successfully' });
    }
  });
});





//dhomat
app.get("/standarte", (req, res) => {
  db.query("SELECT * FROM standarte", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});

app.get("/vip", (req, res) => {
  db.query("SELECT * FROM vip", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});

app.get("/ekslusive", (req, res) => {
  db.query("SELECT * FROM ekslusive", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});
app.get("/suite", (req, res) => {
  db.query("SELECT * FROM suite", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});

app.get("/familjare", (req, res) => {
  db.query("SELECT * FROM familjare", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result);
  });
});
app.post("/dhomat", (req, res) => {
  const sql = "INSERT INTO dhomat (name, pershkrimi) VALUES (?, ?, ?)";
  const values = [
    
    req.body.name,
    req.body.pershkrimi
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});



app.put("/dhomat/:id", (req, res) => {
  const { id } = req.params;
  const { name, pershkrimi } = req.body;
  const sql = "UPDATE dhomat SET name = ?, pershkrimi = ? WHERE id = ?";
  const values = [name, pershkrimi, id];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});



app.delete("/dhomat/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM dhomat WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error deleting from database:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});





//puntoret
app.get("/puntoret", (req, res) => {
  const q = "SELECT * FROM puntoret"
  db.query(q,(err, data)=>{
    if(err) return res.json(err)
      return res.json(data)
    })
})

app.post("/puntoret", (req, res)=> {
  const q = "INSERT INTO puntoret (`name`, `sname`, `role`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.sname,
    req.body.role,
  ];
  db.query(q, [values], (err, data)=>{
    if(err) return res.json(err);
      return res.json("Eshte krijuar me sukses");
  });
});


app.delete("/puntoret/:id", (req, res)=>{
  const puntoriId = req.params.id;
  const q = "DELETE FROM puntoret WHERE id = ?";

  db.query(q, [puntoriId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Eshte fshire me sukses")
  });
});


app.put("/puntoret/:id", (req, res)=>{
  const puntoriId = req.params.id;
  const q = "UPDATE puntoret Set `name` = ?, `sname` = ?, `role` = ? WHERE id = ?";

  const values=[
    req.body.name,
    req.body.sname,
    req.body.role,
  ]

  db.query(q, [...values,puntoriId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Eshte ndryshuar me sukses")
  })
})








//menu
app.get("/menu", (req, res) => {
  const q = "SELECT * FROM menu1"
  db.query(q,(err, data)=>{
    if(err) return res.json(err)
      return res.json(data)
    })
})

app.post("/menu", (req, res)=> {
  const q = "INSERT INTO menu1 (`name`, `price`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
  ];
  db.query(q, [values], (err, data)=>{
    if(err) return res.json(err);
      return res.json("Eshte krijuar me sukses");
  });
});

app.delete("/menu/:id", (req, res)=>{
  const ushqimiId = req.params.id;
  const q = "DELETE FROM menu1 WHERE id = ?";

  db.query(q, [ushqimiId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Eshte fshire me sukses")
  });
});

app.put("/menu/:id", (req, res)=>{
  const ushqimiId = req.params.id;
  const q = "UPDATE menu1 Set `name` = ?, `price` = ? WHERE id = ?";

  const values=[
    req.body.name,
    req.body.price,
  ]

  db.query(q, [...values,ushqimiId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Eshte ndryshuar me sukses")
  })
})
 

//login
app.get("/v2/login", (req, res) => {
  db.query("SELECT * FROM login", (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).send("Internal Server Error");
    }
    res.send(result);
  });
});


//orari
app.get("/orari", (req, res) => {
  const q = "SELECT * FROM orari"
  db.query(q,(err, data)=>{
    if(err) return res.json(err)
      return res.json(data)
    })
})

app.post("/orari", (req, res)=> {
  const q = "INSERT INTO orari(`name`, `role`, `h`, `m`, `me`, `e`, `p`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.role,
    req.body.h,
    req.body.m,
    req.body.me,
    req.body.e,
    req.body.p,
  ];
  db.query(q, [values], (err, data)=>{
    if(err) return res.json(err);
      return res.json("Eshte krijuar me sukses");
  });
});

app.delete("/orari/:id", (req, res)=>{
  const orariId = req.params.id;
  const q = "DELETE FROM orari WHERE id = ?";

  db.query(q, [orariId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Eshte fshire me sukses")
  });
});

app.put("/orari/:id", (req, res)=>{
  const orariId = req.params.id;
  const q = "UPDATE orari Set `name` = ?, `role` = ?, `h` = ?, `m` = ?, `me` = ?, `e` = ?, `p` = ? WHERE id = ?";

  const values=[
    req.body.name,
    req.body.role,
    req.body.h,
    req.body.m,
    req.body.me,
    req.body.e,
    req.body.p,
  ]

  db.query(q, [...values,orariId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Eshte ndryshuar me sukses")
  })
})



//login
app.post('/v1/signin', (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT role FROM login WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, data) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (data.length > 0) {
      const userRole = data[0].role;
      const payload = { email, role: userRole };
      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
      return res.json({ token, role: userRole, message: "Success" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  });
});



//register
app.post('/v1/register', (req, res) => {
  const { name, email, password } = req.body;


  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
  const values = [name, email, password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: "Error inserting data into the database" });
    }

    const payload = { name, email };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    return res.status(200).json({
      message: "User registered successfully",
      token,
    });
  });
});


//rezervimet
// Marr të gjitha dhomat e një tipi (p.sh standard, vip)
app.get('/rooms/:type', (req, res) => {
  const { type } = req.params; 

  const query = 'SELECT * FROM reservations WHERE name = ?';

  db.query(query, [type], (err, rooms) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching rooms');
    }
    
    res.json(rooms);  
  });
});


app.post('/reserve', (req, res) => {
  const { roomId, from_date, to_date } = req.body;

  if (!roomId || !from_date || !to_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    UPDATE reservations
    SET reservation_status = '1', from_date = ?, to_date = ?
    WHERE id = ?
  `;

  db.query(query, [from_date, to_date, roomId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Room not found or already reserved' });
    }

    res.json({ message: 'Room reserved successfully!' });
  });
});




// Merr të gjitha rezervimet (për admin)
app.get('/admin/reservations', (req, res) => {
  const query = 'SELECT * FROM reservations';

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching reservations' });
    }

    res.json(results);
  });
});

// Anulo rezervimin e një dhome
app.post('/cancel', (req, res) => {
  const { roomId } = req.body;

  if (!roomId) {
    return res.status(400).json({ message: 'Room ID is required' });
  }

  const sql = `
    UPDATE reservations 
    SET reservation_status = 0, from_date = NULL, to_date = NULL 
    WHERE id = ? AND reservation_status = '1'
  `;

  db.query(sql, [roomId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to cancel the reservation' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found or already available' });
    }

    res.status(200).json({ message: 'Reservation canceled successfully' });
  });
});






app.listen(3008, () => {
  console.log("Server is listening on port 3008");
})








