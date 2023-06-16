"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const academicSemester_routes_1 = require("../modules/academicSemester/academicSemester.routes");
const academicFaculty_routes_1 = require("../modules/academicFaculty/academicFaculty.routes");
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const student_routes_1 = require("../modules/student/student.routes");
const faculty_routes_1 = require("../modules/faculty/faculty.routes");
const managementDepartment_routes_1 = require("../modules/managementDepartment/managementDepartment.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/academic-semester',
        route: academicSemester_routes_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_routes_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-department',
        route: academicDepartment_routes_1.AcademicDepartmentRouter,
    },
    {
        path: '/students',
        route: student_routes_1.StudentRoute,
    },
    {
        path: '/faculties',
        route: faculty_routes_1.FacultyRoutes,
    },
    {
        path: '/management-departments',
        route: managementDepartment_routes_1.ManagementDepartmentRoutes,
    },
    {
        path: '/admins',
        route: admin_routes_1.AdminRoutes,
    },
];
moduleRoutes.map(route => {
    router.use(route.path, route.route);
});
exports.default = router;
