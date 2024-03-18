// User.ts
import db from '../db';

class User {
    static tableName = 'Users';

    // Ensure column names match those in your database
    static async createOrUpdate(userId: string, email: string) {
        const exists = await db(User.tableName).where({ userId }).first(); // Ensure 'userId' matches your column name
        if (!exists) {
            await db(User.tableName).insert({ userId, email });
        } else if (exists.email !== email) {
            await db(User.tableName).where({ userId }).update({ email });
        }
    }
}

export default User;
