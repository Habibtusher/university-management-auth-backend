"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/create-student', (0, validateRequest_1.default)(user_validation_1.UserValidation.createStudentUserZodSchema), user_controllers_1.UserController.createStudent);
router.post('/create-faculty', (0, validateRequest_1.default)(user_validation_1.UserValidation.createFacultyUserZodSchema), user_controllers_1.UserController.createFaculty);
router.post('/create-admin', (0, validateRequest_1.default)(user_validation_1.UserValidation.createAdminUserZodSchema), user_controllers_1.UserController.createAdmin);
router.get('/', user_controllers_1.UserController.getUsers);
exports.UserRoutes = router;
