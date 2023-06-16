"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constant_1.academicsemesterTitles], {
            required_error: 'title is required',
        }),
        year: zod_1.z.string({
            required_error: 'year is required',
        }),
        code: zod_1.z.enum([...academicSemester_constant_1.academicsemesterCodes], {
            required_error: 'code is required',
        }),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.academicsemesterMonths], {
            required_error: 'start month is required',
        }),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.academicsemesterMonths], {
            required_error: 'end month is required',
        }),
    }),
});
const updateAcademicSemesterZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...academicSemester_constant_1.academicsemesterTitles], {
            required_error: 'title is required',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'year is required',
        })
            .optional(),
        code: zod_1.z
            .enum([...academicSemester_constant_1.academicsemesterCodes], {
            required_error: 'code is required',
        })
            .optional(),
        startMonth: zod_1.z
            .enum([...academicSemester_constant_1.academicsemesterMonths], {
            required_error: 'start month is required',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...academicSemester_constant_1.academicsemesterMonths], {
            required_error: 'end month is required',
        })
            .optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either title and code should provided or nither',
});
exports.AcademicSemesterValidation = {
    createAcademicSemesterZodSchema,
    updateAcademicSemesterZodSchema,
};
