import request from 'supertest';
import app from '../server';

describe('Tasks API', () => {
    let task;

    it('should add a new task', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({
                title: 'Test task',
                description: 'Test description'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title');
        expect(res.body.title).toEqual('Test task');
        task = res.body;
    });

    it('should fetch all tasks', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    });

    it('should update a task', async () => {
        const res = await request(app)
            .put(`/tasks/${task.id}`)
            .send({
                title: 'Updated task'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('Updated task');
    });

    it('should delete a task', async () => {
        const res = await request(app).delete(`/tasks/${task.id}`);
        expect(res.statusCode).toEqual(204);
    });
});
