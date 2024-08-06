// tests/schedule.test.js
const request = require('supertest');
const express = require('express');
const scheduleRoutes = require('../routes/schedule');

const app = express();
app.use(express.json());
app.use('/schedule', scheduleRoutes);

describe('Schedule API', () => {
  let schedules;

  beforeEach(() => {
    schedules = [
      { id: 1, day: 'Monday', subject: 'Math', time: '9:00 AM' },
      { id: 2, day: 'Tuesday', subject: 'Science', time: '10:00 AM' },
    ];
  });

  test('GET /schedule should return all schedules', async () => {
    const res = await request(app).get('/schedule');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(schedules);
  });

  test('GET /schedule/:id should return a single schedule by ID', async () => {
    const res = await request(app).get('/schedule/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(schedules[0]);
  });

  test('GET /schedule/:id should return 404 if schedule not found', async () => {
    const res = await request(app).get('/schedule/999');
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('Schedule not found');
  });

  test('PUT /schedule/:id should update a schedule', async () => {
    const updatedSchedule = {
      day: 'Wednesday',
      subject: 'History',
      time: '11:00 AM',
    };
    const res = await request(app).put('/schedule/1').send(updatedSchedule);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, ...updatedSchedule });
  });

  test('PUT /schedule/:id should return 404 if schedule not found', async () => {
    const updatedSchedule = {
      day: 'Wednesday',
      subject: 'History',
      time: '11:00 AM',
    };
    const res = await request(app).put('/schedule/999').send(updatedSchedule);
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('Schedule not found');
  });
});
