import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const users: { email: string; password: string }[] = [];

export const register = (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    users.push({ email, password });
    return res.status(201).json({ message: 'User registered successfully' });
};

export const login = (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.status(200).json({ token });
};