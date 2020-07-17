const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


// middleware
app.use(cors());
// bodyparser
app.use(express.json());//req.body


// routes
// create todo
app.post("/todos" , async(req, res) =>{
try {
 const {description} = req.body;
 const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
 [description]) ;
 
 res.json(newTodo);
 
} catch (err) {
    console.error(err.message)
}
})

// get All todos
app.get("/todos",async (req, res) =>{
try {
    const alltodos = await pool.query("SELECT * FROM todo");
    res.json(alltodos.rows);
} catch (err) {
    console.error(err.message)
}
})
// get a todo
app.get('/todos/:id', async(req, res)=>{
    try {
     const{id} = req.params;
     const todo =  await pool.query('SELECT * FROM TODO WHERE todo_id =($1) ',[id]) 
   res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
// update todo
app.put('/todos/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const upodateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id= $2 ',[description, id])
        res.json(upodateTodo.rows[0]);
    } catch (err) {
       console.error(err.message) ;
    }
})

// delete todo
app.delete('/todos/:id', async(req, res) =>{
try {
  const {id}   =  req.params;
  const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = ($1)', [id]);
  res.json(deleteTodo.rows[0])
} catch (err) {
    console.log(err.message)
}
})

app.listen('5000' , ()=>{
    console.log('Server running on port 5000')
})