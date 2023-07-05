import { JwtPayload, Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
const createToken = (
  payload: object,
  secret: Secret,
  expires: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expires,
  }); // expires in
};
const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
export const jwtHelpers = {
  createToken,
  verifyToken,
};
