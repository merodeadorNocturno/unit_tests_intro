const express = require('express');
const router = express.Router();

let schedules = [
  { id: 1, day: 'Monday', subject: 'Math', time: '9:00 AM' },
  { id: 2, day: 'Tuesday', subject: 'Science', time: '10:00 AM' },
];

// Get all schedules
router.get('/', (_req, res) => {
  res.json(schedules);
});

// Get a single schedule by ID
router.get('/:id', (req, res) => {
  const schedule = schedules.find((s) => s.id === parseInt(req.params.id));
  if (!schedule) return res.status(404).send('Schedule not found');
  res.json(schedule);
});

// Update a schedule
router.put('/:id', (req, res) => {
  const schedule = schedules.find((s) => s.id === parseInt(req.params.id));

  if (!schedule) return res.status(404).send('Schedule not found');
  schedule.day = req.body.day;
  schedule.subject = req.body.subject;
  schedule.time = req.body.time;

  res.status(201).send(schedule);
});

module.exports = router;
