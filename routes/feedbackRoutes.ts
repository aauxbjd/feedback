import express, { Request, Response } from 'express';
import Feedback from '../models/Feedback'; // Adjust path as necessary

const router = express.Router();

// POST: Submit new feedback
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, email, title, description, category } = req.body;
    const result = await Feedback.create(userId, email, title, description, category);
    res.status(201).json({ message: 'Feedback submitted successfully', feedbackId: result[0] });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve all feedbacks
// router.get('/', async (req: Request, res: Response) => {
//   try {
//     const feedbacks = await Feedback.findAll();
//     res.json(feedbacks);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.get('/', async (req: Request, res: Response) => {
  try {
    // Assuming userId is passed as a query parameter for simplicity
    const userId = req.query.userId;
    const isAdmin = userId === 'admin'; // Replace 'admin' with the actual admin userId or check against a list of admin userIds

    let feedbacks;

    if (isAdmin) {
      // If admin, fetch all feedbacks
      feedbacks = await Feedback.findAll();
    } else {
      // For regular users, fetch only approved feedbacks
      feedbacks = await Feedback.findAllApproved();
    }

    res.json(feedbacks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});


// PUT: Update feedback (admin)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    await Feedback.update(Number(id), title, description, category);
    res.status(200).json({ message: 'Feedback updated successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Approve feedback (admin)
router.post('/:id/approve', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Feedback.approve(Number(id));
    res.status(200).json({ message: 'Feedback approved successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Deny feedback (admin)
router.post('/:id/deny', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Feedback.deny(Number(id));
    res.status(200).json({ message: 'Feedback denied successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Soft delete feedback (admin)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Feedback.markAsDeleted(Number(id));
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
