import express, { Request, Response } from 'express';
import Issue from '../models/Issues'; // Adjust the import path as necessary

const router = express.Router();

// POST: Submit a new issue
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, email, title, description } = req.body;
    const result = await Issue.create(userId, email, title, description);
    res.status(201).json({ message: 'Issue submitted successfully', issueId: result[0] });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve all issues
router.get('/', async (req: Request, res: Response) => {
  try {
    const issues = await Issue.findAll();
    res.json(issues);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update an issue (admin)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await Issue.update(Number(id), title, description);
    res.status(200).json({ message: 'Issue updated successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Approve an issue (admin)
router.post('/:id/approve', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Issue.approve(Number(id));
    res.status(200).json({ message: 'Issue approved successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Deny an issue (admin)
router.post('/:id/deny', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Issue.deny(Number(id));
    res.status(200).json({ message: 'Issue denied successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Soft delete an issue (admin)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Issue.markAsDeleted(Number(id));
    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
