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
  /**
   * @swagger
   * /patients:
   *   get:
   *     summary: Get all patients
   *     tags: [Patients]
   *     responses:
   *       200:
   *         description: List of patients
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Patient'
   */
  res.json(patients);
});

router.post('/', (req, res) => {
  /**
   * @swagger
   * /patients:
   *   post:
   *     summary: Create a new patient
   *     tags: [Patients]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Patient'
   *     responses:
   *       200:
   *         description: Patient created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Patient'
   */
  const patient: Patient = { id: nextId++, ...req.body };
  patients.push(patient);
  res.json(patient);
});

router.put('/:id', (req, res) => {
  /**
   * @swagger
   * /patients/{id}:
   *   put:
   *     summary: Update a patient
   *     tags: [Patients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Patient'
   *     responses:
   *       200:
   *         description: Patient updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Patient'
   *       404:
   *         description: Patient not found
   */
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
  /**
   * @swagger
   * /patients/{id}:
   *   delete:
   *     summary: Delete a patient
   *     tags: [Patients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Patient deleted
   *       404:
   *         description: Patient not found
   */
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