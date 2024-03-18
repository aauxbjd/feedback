"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/feedbackRoutes.ts
const express_1 = __importDefault(require("express"));
const Feedback_1 = __importDefault(require("../models/Feedback"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback_1.default.findAll();
        res.json(feedbacks);
    }
    catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
