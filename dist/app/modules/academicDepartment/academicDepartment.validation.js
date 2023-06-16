"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title is required',
        })
            .nonempty('Title is required'),
        academicFaculty: zod_1.z
            .string({
            required_error: 'Academic faculty is required',
        })
            .nonempty('Academic faculty is required'),
    }),
});
const updateAcademicDepartmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title is required',
        })
            .optional(),
        academicFaculty: zod_1.z
            .string({
            required_error: 'Academic faculty is required',
        })
            .optional(),
    }),
});
exports.AcademicDepartmentValidation = {
    createAcademicDepartmentSchema,
    updateAcademicDepartmentSchema,
};
