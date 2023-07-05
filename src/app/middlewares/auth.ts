import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import { http } from 'winston';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helper/jwtHelper';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let verifiedUser = null;
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      //verify token

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      //role verify
      req.user = verifiedUser; // role  , userid

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
export default auth;
