// Feedback.ts
import db from '../db';
import User from './User';

class Feedback {
    static tableName = 'Feedback';

    // Inserts a new feedback record into the database. It automatically creates or updates the user.
    static async create(userId: string, email: string, title: string, description: string, category: string) {
      console.log("U:",userId,"E:",email,"T:",title,"D:",description,"C:",category)
        await User.createOrUpdate(userId, email);
        return db(Feedback.tableName).insert({
            userId,
            title,
            description,
            category,
            status: 'pending', // Feedback starts as pending
            deleted: false, // Not deleted initially
            createdOn: new Date()
        });
    }

    // Retrieves all feedback records that haven't been marked as deleted.
    static async findAll() {
        return db(Feedback.tableName)
            .where('deleted', false)
            .select('*');
    }

    static async findAllApproved() {
        // Fetch only approved feedback
        return db(Feedback.tableName).where('status', 'approved').select('*');
      }

    // Updates a feedback record based on its ID. Intended for admin use.
    static async update(id: number, title: string, description: string, category: string) {
        return db(Feedback.tableName)
            .where({ id })
            .update({ title, description, category });
    }

    // Marks a feedback record as deleted (soft delete) based on its ID.
    static async markAsDeleted(id: number) {
        return db(Feedback.tableName)
            .where({ id })
            .update({ deleted: true });
    }

    // Approves a feedback record based on its ID. Intended for admin use.
    static async approve(id: number) {
        return db(Feedback.tableName)
            .where({ id })
            .update({ status: 'approved' });
    }

    // Denies a feedback record based on its ID. Intended for admin use.
    static async deny(id: number) {
        return db(Feedback.tableName)
            .where({ id })
            .update({ status: 'denied' });
    }
}

export default Feedback;
