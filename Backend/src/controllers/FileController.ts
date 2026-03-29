import express from 'express';
import { FileService } from '../services/FileService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  /**
   * @swagger
   * /appendfile:
   *   get:
   *     summary: Append to a file
   *     tags: [Files]
   *     parameters:
   *       - in: query
   *         name: name
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: File operation successful
   *       400:
   *         description: Bad request
   */
  try {
    res.json({ 
      message: 'File operation successful',
      filename: req.query.name,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(400).json({ error: 'File operation failed' });
  }
});

export default router;