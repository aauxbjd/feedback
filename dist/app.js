"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedbackRoutes_1 = __importDefault(require("./routes/feedbackRoutes"));
// import issueRoutes from './routes/issueRoutes';
// import voteRoutes from './routes/voteRoutes';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/feedbacks', feedbackRoutes_1.default);
// app.use('/api/issues', issueRoutes);
// app.use('/api/votes', voteRoutes);
exports.default = app;
