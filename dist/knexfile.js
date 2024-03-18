"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config = {
    development: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        },
        migrations: {
            directory: path_1.default.join(__dirname, 'src/db/migrations'),
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'src/db/seeds'),
        },
    },
};
exports.default = config;
