import { Router } from 'express';
import validateResource from '../middleware/validateResource';

import {
    createContactHandler,
    deleteContactHandler,
    getContactHandler,
    getContactsHandler,
    updateContactHandler
} from '../controller/contact.controller';

import { 
    createContactSchema,
    deleteContactSchema,
    getContactSchema,
    updateContactSchema
} from '../schema/contact.schema';

const router = Router();

router.get('/api/contacts', getContactsHandler);
router.get('/api/contacts/:contactId', validateResource(getContactSchema), getContactHandler);
router.post('/api/contacts', validateResource(createContactSchema), createContactHandler);
router.put('/api/contacts/:contactId', validateResource(updateContactSchema), updateContactHandler);
router.delete('/api/contacts/:contactId', validateResource(deleteContactSchema), deleteContactHandler);

export default router;
