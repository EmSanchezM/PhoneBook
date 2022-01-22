import { Router } from 'express';
import contact from './contact.routes';

const router = Router();

router.use(contact);

export default router;