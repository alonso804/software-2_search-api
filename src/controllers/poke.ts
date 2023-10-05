import type { Request, Response } from 'express';
import { logger } from 'src/logger';
import axios from 'axios';

class PokeController {
  static async searchByName(_req: Request, res: Response): Promise<void> {
    const name = _req.query.name;
    logger.info(`Searching for ${name}`);
    const { data } = await axios.get(`${process.env.POKE_API_URL}/get/${name}}`);
    logger.info(`Found ${data.name}`);
    const images = await axios.get(`${process.env.POKE_IMAGES_URL}/pokemon/images/${data.id}`);
    logger.info(`Found ${images.data.length} images`);
    res.status(200).send({ ...data, images: images.data });
  }
}

export default PokeController;
