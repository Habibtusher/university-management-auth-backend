'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const user_model_1 = __importDefault(require('../user/user.model'));
const config_1 = __importDefault(require('../../../config'));
const jwtHelper_1 = require('../../../helper/jwtHelper');
const bcrypt_1 = __importDefault(require('bcrypt'));
const loginUserDb = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    // const user = new User();
    const isUserExist = yield user_model_1.default.isUserExist(id);
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    if (
      isUserExist.password &&
      !user_model_1.default.isPasswordMatched(
        password,
        isUserExist === null || isUserExist === void 0
          ? void 0
          : isUserExist.password
      )
    ) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password is incorect'
      );
    }
    const { id: userId, role, needsPasswordChange } = isUserExist;
    const accessToken = jwtHelper_1.jwtHelpers.createToken(
      { userId, role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    const refreshToken = jwtHelper_1.jwtHelpers.createToken(
      { userId, role },
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expires_in
    );
    return {
      accessToken,
      refreshToken,
      needsPasswordChange,
    };
  });
const refreshTokenDb = token =>
  __awaiter(void 0, void 0, void 0, function* () {
    let varifiedToken = null;
    try {
      varifiedToken = jwtHelper_1.jwtHelpers.verifyToken(
        token,
        config_1.default.jwt.refresh_secret
      );
    } catch (error) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Invalid refresh token'
      );
    }
    const { userId, role } = varifiedToken;
    // const user = new User();
    const isUserExist = yield user_model_1.default.isUserExist(userId);
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User dose not exist'
      );
    }
    const newAccessToken = jwtHelper_1.jwtHelpers.createToken(
      { userId, role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    return {
      accessToken: newAccessToken,
    };
  });
const changePasswordDb = (user, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield user_model_1.default.isUserExist(
      user === null || user === void 0 ? void 0 : user.userId
    );
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User not found'
      );
    }
    const isPasswordMatched = yield user_model_1.default.isPasswordMatched(
      oldPassword,
      isUserExist.password
    );
    if (!isPasswordMatched) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Old password is incorrect'
      );
    }
    const newHashPassword = yield bcrypt_1.default.hash(
      newPassword,
      Number(config_1.default.bcrypt_salt_rounds)
    );
    yield user_model_1.default.findOneAndUpdate(
      { id: user.userId },
      {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
      }
    );
  });
exports.AuthService = {
  loginUserDb,
  refreshTokenDb,
  changePasswordDb,
};
