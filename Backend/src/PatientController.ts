import express from 'express';

const router = express.Router();

interface Patient {
  id: number;
  name: string;
  age: number;
  // Add more fields as needed
}

let patients: Patient[] = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(patients);
});

router.post('/', (req, res) => {
  const patient: Patient = { id: nextId++, ...req.body };
  patients.push(patient);
  res.json(patient);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = patients.findIndex(p => p.id === id);
  if (index !== -1) {
    patients[index] = { ...patients[index], ...req.body };
    res.json(patients[index]);
  } else {
    res.status(404).send('Patient not found');
  }
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = patients.findIndex(p => p.id === id);
  if (index !== -1) {
    patients.splice(index, 1);
    res.send('Patient deleted');
  } else {
    res.status(404).send('Patient not found');
  }
});

export default router;