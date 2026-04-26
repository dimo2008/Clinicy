import express from 'express';
import { PatientService } from '../services/PatientService.js';
import { jwtAuth } from '../middleware/jwtAuth.js';
const router = express.Router();
router.get('/', jwtAuth, async (req, res) => {
    /**
     * @swagger
     * /patients:
     *   get:
     *     summary: Get all patients
     *     tags: [Patients]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of patients
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Patient'
     *       401:
     *         description: Unauthorized
     */
    const patients = await PatientService.getAllPatients();
    res.json(patients);
});
router.post('/', async (req, res) => {
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
    const patient = await PatientService.createPatient(req.body);
    res.json(patient);
});
router.put('/:id', async (req, res) => {
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
    const patient = await PatientService.updatePatient(id, req.body);
    if (patient) {
        res.json(patient);
    }
    else {
        res.status(404).send('Patient not found');
    }
});
router.delete('/:id', async (req, res) => {
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
    const deleted = await PatientService.deletePatient(id);
    if (deleted) {
        res.send('Patient deleted');
    }
    else {
        res.status(404).send('Patient not found');
    }
});
export default router;
//# sourceMappingURL=PatientController.js.map