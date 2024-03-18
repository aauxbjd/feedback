import express, { Request, Response } from 'express';
import Vote from '../models/Vote'; // Adjust the import path as necessary

const router = express.Router();

// POST: Cast a vote for an issue or feedback
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, requestId, requestType } = req.body;
    // Validate requestType
    if (requestType !== 'issue' && requestType !== 'feedback') {
      return res.status(400).json({ message: 'Invalid request type. Must be either "issue" or "feedback".' });
    }

    // Attempt to cast a vote
    const result = await Vote.create(userId, requestId, requestType);
    res.status(201).json({ message: 'Vote cast successfully', voteId: result[0]});
  } catch (error: any) {
    if (error.message === 'User has already voted for this request.') {
      res.status(409).json({ message: error.message }); // Conflict - already voted
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;
