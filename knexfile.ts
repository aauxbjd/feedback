// knexfile.ts
import { Knex } from 'knex';

// Ensure your configuration matches your database setup
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection:{
      host : '127.0.0.1',
      port : 5432,
      user : 'root',
      password : 'root',
      database : 'test_db'

    },
    migrations: {
      directory: './db/migrations',
      extension: 'ts' // Specify to use TypeScript files
      
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  // Add other environments as needed
};

export default config;
