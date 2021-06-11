import jwt from 'jsonwebtoken';

export const generateToken = async (user: any) => jwt.sign({ user }, 'ishan');
