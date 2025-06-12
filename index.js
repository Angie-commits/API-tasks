const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello, this is a tasks API</h1>');
});

app.post('/tasks', async (req, res) => {
  const { title, description, isCompleted } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        isCompleted: isCompleted ?? false,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving task' });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, isCompleted } = req.body;
  try {
    const updated = await prisma.task.update({
      where: { id },
      data: { title, description, isCompleted },
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: 'Task not found or update failed' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.task.delete({ where: { id } });
    res.status(204).send(); 
  } catch (error) {
    res.status(404).json({ message: 'Task not found or delete failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});