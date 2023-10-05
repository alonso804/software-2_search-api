import type { Request, Response } from 'express';
import { logger } from 'src/logger';
import axios from 'axios';

class PokeController {
  static async searchByName(_req: Request, res: Response): Promise<void> {
    const name = _req.query.name;
    logger.info({ microservice: 'search-api', message: `Read from query ${name}` });
    const pokemon = await axios.get(`${process.env.POKE_API_URL}/poke-api/get/${name}`);
    logger.info({ microservice: 'search-api', message: `Data from poke-api ${pokemon}` });
    const images = await axios.get(`${process.env.POKE_IMAGES_URL}/pokemon/images/${pokemon.data.id}`);
    logger.info({ microservice: 'search-api', message: `Data from poke-images ${images.data}` });
    console.log(images.data)
    const stats = await axios.get(`${process.env.POKE_STATS_URL}/poke-stats/get/${pokemon.data.id}`);
    console.log(stats.data)
    logger.info({ microservice: 'search-api', message: `Data from poke-stats ${stats.data}` });
    res.status(200).send({ ...pokemon.data, ...images.data, ...stats.data });
  }
}

export default PokeController;
