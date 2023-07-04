import { Secret } from 'jsonwebtoken';
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

export const jwtHelpers = {
  createToken,
};
