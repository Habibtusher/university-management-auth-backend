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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = exports.updateAdminDb = exports.deleteAdminDb = exports.getSingleAdminDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const admin_model_1 = require("./admin.model");
const admin_constant_1 = require("./admin.constant");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../user/user.model"));
const getAllAdminDb = (filters, paginationOpt) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOpt);
    const sortOpts = {};
    if (sortBy && sortOrder) {
        sortOpts[sortBy] = sortOrder;
    }
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: admin_constant_1.adminSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([fields, value]) => ({
                [fields]: value,
            })),
        });
    }
    const whereCondition = andCondition.length > 0
        ? {
            $and: andCondition,
        }
        : {};
    const result = yield admin_model_1.Admin.find(whereCondition)
        .populate('managementDepartment')
        .sort(sortOpts)
        .skip(skip)
        .limit(limit);
    return {
        meta: {
            total: yield admin_model_1.Admin.countDocuments(),
            page: page,
            limit: limit,
        },
        data: result,
    };
});
const getSingleAdminDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findOne({ id });
    return result;
});
exports.getSingleAdminDb = getSingleAdminDb;
const deleteAdminDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.Admin.findOne({ id });
    if (!admin) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'No admin found with this id');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deleteAdmin = yield admin_model_1.Admin.findOneAndDelete({ id }, { session }).populate('managementDepartment');
        if (!deleteAdmin) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Faield to delete admin');
        }
        const deleteUser = yield user_model_1.default.findOneAndDelete({ id }, { session });
        if (!deleteUser) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Faield to delete user');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deleteAdmin;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
});
exports.deleteAdminDb = deleteAdminDb;
const updateAdminDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield admin_model_1.Admin.findOne({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Student not found!');
    }
    const { name } = payload, studentData = __rest(payload, ["name"]);
    const updatedStudentData = Object.assign({}, studentData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedStudentData[nameKey] = name[key];
        });
    }
    const result = yield admin_model_1.Admin.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    }).populate('managementDepartment');
    return result;
});
exports.updateAdminDb = updateAdminDb;
exports.AdminService = {
    getAllAdminDb,
    getSingleAdminDb: exports.getSingleAdminDb,
    deleteAdminDb: exports.deleteAdminDb,
    updateAdminDb: exports.updateAdminDb,
};
