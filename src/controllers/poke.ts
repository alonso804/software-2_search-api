/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import type { Request, Response } from 'express';
import { logger } from 'src/logger';

class PokeController {
  static async searchByName(req: Request, res: Response): Promise<void> {
    const name = req.query.name;
    logger.info({ microservice: 'search-api', message: `Read from query ${name}` });

    const { data: pokemon } = (await axios.get(
      `${process.env.POKE_API_URL}/poke-api/get/${name}`,
    )) as { data: { id: number } };
    logger.info({
      microservice: 'search-api',
      message: `Data from poke-api ${JSON.stringify(pokemon)}`,
    });

    const { data: images } = await axios.get(
      `${process.env.POKE_IMAGES_URL}/pokemon/images/${pokemon.id}`,
    );
    logger.info({
      microservice: 'search-api',
      message: `Data from poke-images ${JSON.stringify(images)}`,
    });

    const { data: stats } = await axios.get(
      `${process.env.POKE_STATS_URL}/poke-stats/get/${pokemon.id as number}`,
    );
    logger.info({
      microservice: 'search-api',
      message: `Data from poke-stats ${JSON.stringify(stats)}`,
    });

    res.status(200).send({ ...pokemon, ...images, ...stats });
  }
}

export default PokeController;
