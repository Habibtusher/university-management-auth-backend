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
exports.UserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const academicSemester_model_1 = __importDefault(require("../academicSemester/academicSemester.model"));
const user_model_1 = __importDefault(require("./user.model"));
const user_utils_1 = require("./user.utils");
const student_model_1 = require("../student/student.model");
const http_status_1 = __importDefault(require("http-status"));
const faculty_model_1 = require("../faculty/faculty.model");
const admin_model_1 = require("../admin/admin.model");
const createStudentToDb = (student, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = '###AAAaaa';
    }
    user.role = 'student';
    const academicSemester = yield academicSemester_model_1.default.findById(student.academicSemester);
    let newUserData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, user_utils_1.generateStudentId)(academicSemester);
        user.id = id;
        student.id = id;
        const newStudent = yield student_model_1.Student.create([student], { session });
        if (!newStudent.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Faield to create student');
        }
        user.student = newStudent[0]._id;
        const newUser = yield user_model_1.default.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(400, 'Faield to create user');
        }
        newUserData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    if (newUserData) {
        newUserData = yield user_model_1.default.findOne({ id: newUserData.id }).populate({
            path: 'student',
            populate: [
                {
                    path: 'academicSemester',
                },
                {
                    path: 'academicDepartment',
                },
                {
                    path: 'academicFaculty',
                },
            ],
        });
    }
    return newUserData;
});
const createFacultyToDb = (faculty, user) => __awaiter(void 0, void 0, void 0, function* () {
    let newUserData = null;
    if (!user.password) {
        user.password = '###AAAaaa';
    }
    user.role = 'faculty';
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, user_utils_1.generateFacultyId)();
        user.id = id;
        faculty.id = id;
        const newFaculty = yield faculty_model_1.Faculty.create([faculty], { session });
        if (!newFaculty.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Faield to create faculty');
        }
        user.faculty = newFaculty[0]._id;
        const newUser = yield user_model_1.default.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Faield to create faculty');
        }
        newUserData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    if (newUserData) {
        newUserData = yield user_model_1.default.findOne({ id: newUserData.id }).populate({
            path: 'faculty',
            populate: [
                {
                    path: 'department',
                },
                {
                    path: 'faculty',
                },
            ],
        });
    }
    return newUserData;
});
const createAdminDb = (admin, user) => __awaiter(void 0, void 0, void 0, function* () {
    let newUserData = null;
    if (!user.password) {
        user.password = '###AAAaaa';
    }
    user.role = 'admin';
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, user_utils_1.generateAdminId)();
        user.id = id;
        admin.id = id;
        const newAdmin = yield admin_model_1.Admin.create([admin], { session });
        if (!newAdmin) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Faield to create admin!');
        }
        user.admin = newAdmin[0]._id;
        const newUser = yield user_model_1.default.create([user], { session });
        if (!newUser) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Faield to create user!');
        }
        newUserData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    if (newUserData) {
        newUserData = yield user_model_1.default.findOne({ id: newUserData.id }).populate({
            path: 'admin',
            populate: [
                {
                    path: 'managementDepartment',
                },
            ],
        });
    }
    return newUserData;
});
const getUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
exports.UserService = {
    createStudentToDb,
    getUsersFromDb,
    createFacultyToDb,
    createAdminDb,
};
