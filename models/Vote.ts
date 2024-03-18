import db from '../db';

class Vote {
    static tableName = 'Votes';

    static async create(userId: string, requestId: number, requestType: 'feedback' | 'issue'): Promise<number> {
        // Check for existing vote
        const exists = await db(Vote.tableName)
            .where({ userId, requestId, requestType })
            .first();

        if (exists) {
            throw new Error('User has already voted for this request.');
        }

        // Insert the vote and return the vote ID
        const result = await db(Vote.tableName)
            .insert({ userId, requestId, requestType })
            .returning('vote_id'); // Assuming the primary key is named 'id'

        // Increment the votes count
        const targetTable = requestType === 'feedback' ? 'Feedback' : 'Issues';
        await db(targetTable)
            .where('id', requestId)
            .increment('votes', 1);

        // Return the ID of the newly inserted vote (for PostgreSQL)
        return result[0]; // Adjust according to your DB if not PostgreSQL
    }
}

export default Vote;
