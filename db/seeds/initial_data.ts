import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries in reverse order due to foreign key constraints
    await knex('Votes').del();
    await knex('Feedback').del();
    await knex('Issues').del();
    await knex('Users').del();

    // Inserts seed entries for Users
    await knex('Users').insert([
        { userId: 'user1', email: 'user1@example.com' },
        { userId: 'user2', email: 'user2@example.com' },
    ]);

    // Since `userId` in `Feedback` and `Issues` is a foreign key referencing `Users`, it must be a string.
    await knex('Feedback').insert([
        { userId: 'user1', title: 'Feedback Title 1', description: 'This is a feedback description by user1', category: 'General', createdOn: knex.fn.now(), status: 'pending', deleted: false },
        { userId: 'user2', title: 'Feedback Title 2', description: 'This is a feedback description by user2', category: 'Bug', createdOn: knex.fn.now(), status: 'pending', deleted: false },
    ]);

    await knex('Issues').insert([
        { userId: 'user1', title: 'Issue Title 1', description: 'This is an issue description by user1', createdOn: knex.fn.now(), status: 'pending', deleted: false },
        { userId: 'user2', title: 'Issue Title 2', description: 'This is an issue description by user2', createdOn: knex.fn.now(), status: 'pending', deleted: false },
    ]);

    // For `Votes`, ensure the `requestId` corresponds to valid `Feedback` or `Issue` entries.
    // This simple example assumes IDs of 1 and 2 exist for Feedback and Issues respectively.
    // You might need to adjust `requestId` and `requestType` based on your actual records.
    await knex('Votes').insert([
        { userId: 'user1', requestId: 1, requestType: 'feedback' },
        { userId: 'user2', requestId: 1, requestType: 'issue' },
    ]);
}
