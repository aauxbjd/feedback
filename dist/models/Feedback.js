"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class Feedback {
    // Example method to find all feedbacks
    static findAll() {
        return (0, db_1.default)('feedbacks').select('*');
    }
}
exports.default = Feedback;
