"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const academicSemester_controllers_1 = require("./academicSemester.controllers");
const router = express_1.default.Router();
router.post('/create-semester', (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.createAcademicSemesterZodSchema), academicSemester_controllers_1.AcademicSemesterControllers.createAcademicSemister);
router.get('/', academicSemester_controllers_1.AcademicSemesterControllers.getAcademicSemester);
router.get('/:id', academicSemester_controllers_1.AcademicSemesterControllers.getSingleSemister);
router.delete('/delete-semester/:id', academicSemester_controllers_1.AcademicSemesterControllers.deleteSemester);
router.patch('/update-semester/:id', (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.updateAcademicSemesterZodSchema), academicSemester_controllers_1.AcademicSemesterControllers.updateSemester);
exports.AcademicSemesterRoutes = router;
