import express from 'express';
import morgan from 'morgan'

const app = express();
const PORT = 1000;

app.use(express.json());

app.use(morgan('combined'));

const tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = {
        id: new Date().toISOString(),
        title,
        description
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex].title = title || tasks[taskIndex].title;
    tasks[taskIndex].description = description || tasks[taskIndex].description;

    res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;
