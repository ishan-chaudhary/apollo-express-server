import jwt from 'jsonwebtoken';

export const generateToken = async (user: any) => jwt.sign({ user }, 'ishan');

export const verifyToken = async (token: any) => jwt.verify(token, 'ishan');
