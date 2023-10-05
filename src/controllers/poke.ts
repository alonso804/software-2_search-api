import type { Request, Response } from 'express';
import { logger } from 'src/logger';
import axios from 'axios';

class PokeController {
  static async searchByName(_req: Request, res: Response): Promise<void> {
    const name = _req.query.name;
    logger.info({ microservice: 'search-api', message: `Read from query ${name}` });
    const { data } = await axios.get(`${process.env.POKE_API_URL}/poke-api/get/${name}`);
    logger.info({ microservice: 'search-api', message: `Data from poke-api ${data}` });
    res.status(200).send({ ...data });
  }
}

export default PokeController;
