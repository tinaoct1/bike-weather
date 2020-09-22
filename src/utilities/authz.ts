import { Request, Response } from 'express';
import { API_TOKEN } from './secrets';

export function authorize(req: Request, res: Response, next: any) {
  if (req.headers['api-token'] === API_TOKEN) {
    return next();
  }

  throw new Error('Forbidden');
}
