import express from 'express';
import property from '../controllers/property';

// properties toutes
const router = express.Router();

router.get('/', property.search);
router.post('/', property.create);
router.get('/:id', property.findOne);
router.patch('/:id', property.update);
router.delete('/:id', property.delete);
router.patch('/:id/sold', property.sold);

export default router;
