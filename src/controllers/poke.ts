import axios, { AxiosError } from 'axios';
import type { Request, Response } from 'express';
import { performance } from 'perf_hooks';
import { logger } from 'src/logger';

class PokeController {
  static async searchByName(req: Request, res: Response): Promise<void> {
    const start = performance.now();

    const name = req.query.name;
    logger.info({ microservice: 'search-api', message: `Read from query ${name}` });

    let pokemon: Record<string, unknown>;

    try {
      const response = await axios.get(`${process.env.POKE_API_URL}/poke-api/get/${name}`);

      pokemon = response.data as Record<string, unknown>;

      logger.info({
        microservice: 'search-api',
        message: `Data from poke-api ${JSON.stringify(pokemon)}`,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          const end = performance.now();

          logger.warn({
            microservice: 'search-api',
            from: 'poke-api',
            message: 'Pokemon not found',
            time: end - start,
          });

          res.status(404).send({ message: 'Pokemon not found' });
          return;
        }
      }

      throw error;
    }

    let images: unknown[];

    try {
      const response = await axios.get(
        `${process.env.POKE_IMAGES_URL}/pokemon/images/${pokemon.id}`,
      );

      logger.info({
        microservice: 'search-api',
        message: `Data from poke-images ${pokemon.name}`,
      });

      images = response.data as unknown[];
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          const end = performance.now();

          logger.warn({
            microservice: 'search-api',
            from: 'poke-images',
            message: 'Pokemon not found',
            time: end - start,
          });

          res.status(404).send({ message: 'Pokemon not found' });
          return;
        }
      }

      throw error;
    }

    let stats: unknown[];

    try {
      const response = await axios.get(
        `${process.env.POKE_STATS_URL}/poke-stats/get/${pokemon.id as number}`,
      );

      logger.info({
        microservice: 'search-api',
        message: `Data from poke-stats ${pokemon.name}`,
      });

      stats = response.data as unknown[];
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          const end = performance.now();

          logger.warn({
            microservice: 'search-api',
            from: 'poke-stats',
            message: 'Pokemon not found',
            time: end - start,
          });

          res.status(404).send({ message: 'Pokemon not found' });
          return;
        }
      }

      throw error;
    }

    const end = performance.now();

    logger.info({
      microservice: 'search-api',
      message: `Pokemon ${pokemon.name}`,
      time: end - start,
    });

    res.status(200).send({ ...pokemon, ...images, ...stats });
  }
}

export default PokeController;
