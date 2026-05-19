import z from 'zod';
import { validPasswordRegex } from './regex.js';
export const zRequired = () => z.string().trim().min(1);
export const zValidEmail = () => z.email().max(128);
export const zValidPassword = () => z.string().regex(validPasswordRegex).trim();
