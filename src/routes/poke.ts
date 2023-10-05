import { Router } from 'express';

import PokeController from '../controllers/poke';

const router = Router();

router.get('/search', PokeController.searchByName);

export default router;
