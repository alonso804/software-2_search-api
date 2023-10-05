import type { Request, Response } from 'express';
import axios from 'axios';

class PokeController {
  static async searchByName(_req: Request, res: Response): Promise<void> {
    const name = _req.query.name;
    const { data } = await axios.get(`${process.env.POKE_API_URL}/get/${name}}`);
    const images = await axios.get(`${process.env.POKE_IMAGES_URL}/pokemon/images/${data.id}`);
    res.status(200).send({ ...data, images: images.data });
  }
}

export default PokeController;
