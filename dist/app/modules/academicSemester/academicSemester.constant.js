"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterFilterableFields = exports.academicSemesterSearchFields = exports.academicsemesterTitleCodeMapper = exports.academicsemesterTitles = exports.academicsemesterCodes = exports.academicsemesterMonths = void 0;
exports.academicsemesterMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
exports.academicsemesterCodes = [
    '01',
    '02',
    '03',
];
exports.academicsemesterTitles = [
    'Autum',
    'Summer',
    'Fall',
];
exports.academicsemesterTitleCodeMapper = {
    Autum: '01',
    Summer: '02',
    Fall: '03',
};
exports.academicSemesterSearchFields = ['title', 'code', 'year'];
exports.academicSemesterFilterableFields = [
    'searchTerm',
    'title',
    'year',
    'code',
];
