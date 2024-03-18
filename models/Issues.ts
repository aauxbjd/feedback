// Issues.ts
import db from '../db';
import User from './User';

class Issue {
    static tableName = 'Issues';

    // Create a new issue with the given details. Automatically handles user creation or updates.
    static async create(userId: string, email: string, title: string, description: string) {
        await User.createOrUpdate(userId, email);
        return db(Issue.tableName).insert({
            userId,
            title,
            description,
            status: 'pending', // Issues start as pending
            deleted: false, // Not deleted initially
            createdOn: new Date()
        });
    }

    // Retrieve all issues that haven't been marked as deleted.
    static async findAll() {
        return db(Issue.tableName)
            .where('deleted', false)
            .select('*');
    }

    // Update an issue record. Mainly intended for admin before approval/denial.
    static async update(id: number, title: string, description: string) {
        return db(Issue.tableName)
            .where({ id })
            .update({ title, description });
    }

    // Soft delete an issue by marking it as deleted.
    static async markAsDeleted(id: number) {
        return db(Issue.tableName)
            .where({ id })
            .update({ deleted: true });
    }

    // Approve an issue, changing its status to approved.
    static async approve(id: number) {
        return db(Issue.tableName)
            .where({ id })
            .update({ status: 'approved' });
    }

    // Deny an issue, changing its status to denied.
    static async deny(id: number) {
        return db(Issue.tableName)
            .where({ id })
            .update({ status: 'denied' });
    }
}

export default Issue;
