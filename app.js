const express = require('express');
const Todo = require('./src/model/Todo');
const sequelize = require('./src/utils/db');

const app = express();
const cors = require('cors');
const PORT = 3300;

app.use(express.json());
app.use(cors({ 
    methods: [
      'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
    ], 
  }));



// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new todo
app.post('/todos', async (req, res) => {

  const { title } = req.body;
  console.log("*** title *** "+JSON.stringify(title));

  try {
   
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//Toggle todo completion status

app.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  console.log("in patch method "+id)

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json({ message: 'Todo updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.destroy();

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  } 
});

const sampleTodos = [ 
  { title: 'Task A', completed: true }, 
  { title: 'Task B', completed: false }, 
  { title: 'Task C', completed: false },
];

sequelize
  .sync( {force : false} )
  .then(async () => {
    
    const count = await Todo.count(); 
    console.log("count "+count);
    if (count === 0) {
      await Todo.bulkCreate(sampleTodos);
      console.log('Sample todos added successfully');
    }

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

   
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });