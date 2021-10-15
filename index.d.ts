import Express from '@types/express'

export default function middlewareFactory(app: Express.Application, threshold: number): (req: Express.Request, res: Express.Response) => void;
