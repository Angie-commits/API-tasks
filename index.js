import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

//  Create a Task
app.post("/task", async (req, res) => {
  const { task_title, Task_description, is_completed } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        task_title,
        Task_description,
        is_completed: is_completed ?? false,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
});

//  Get All Tasks
app.get("/task", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

//  Get Task by ID
app.get("/task/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error retrieving task:", error);
    res.status(500).json({ message: "Error retrieving task" });
  }
});

//  Update Task
app.patch("/task/:id", async (req, res) => {
  const id = req.params.id;
  const { task_title, Task_description, is_completed } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { task_title, Task_description, is_completed },
    });
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(404).json({ message: "Task not found or update failed" });
  }
});

//  Delete Task
app.delete("/task/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(404).json({ message: "Task not found or delete failed" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
