"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.generateFacultyId = exports.generateStudentId = exports.findLastAdmintId = exports.findLastFacultytId = exports.findLastStudentId = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.default.findOne({
        role: 'student',
    }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id.substring(4) : undefined;
});
exports.findLastStudentId = findLastStudentId;
const findLastFacultytId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFacculty = yield user_model_1.default.findOne({
        role: 'faculty',
    }, { id: 1, _id: 0 }).sort({
        createdAt: -1,
    });
    return (lastFacculty === null || lastFacculty === void 0 ? void 0 : lastFacculty.id) ? lastFacculty.id.substring(2) : undefined;
});
exports.findLastFacultytId = findLastFacultytId;
const findLastAdmintId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield user_model_1.default.findOne({
        role: 'admin',
    }, { id: 1, _id: 0 }).sort({
        createdAt: -1,
    });
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin.id.substring(2) : undefined;
});
exports.findLastAdmintId = findLastAdmintId;
const generateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastStudentId)()) || (0).toString().padStart(5, '0'); //00000
    //increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.year.substring(2)}${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.code}${incrementedId}`;
    return incrementedId;
});
exports.generateStudentId = generateStudentId;
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastFacultytId)()) || (0).toString().padStart(5, '0');
    //increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `F-${incrementedId}`;
    return incrementedId;
});
exports.generateFacultyId = generateFacultyId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastAdmintId)()) || (0).toString().padStart(5, '0');
    //increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `A-${incrementedId}`;
    return incrementedId;
});
exports.generateAdminId = generateAdminId;
