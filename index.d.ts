import Express from 'express'

export default function middlewareFactory(app: Express.Application, threshold?: number, replenishTimeMs?: number, backoffThreshold?: number, waitTime?: number): (req: Express.Request, res: Express.Response) => void;
