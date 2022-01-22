import { Request, Response } from 'express';
import logger from '../utils/logger';

import { 
    CreateContactInput,
    ReadContactInput, 
    UpdateContactInput, 
    DeleteContactInput
} from '../schema/contact.schema';

import {
   createContact,
   getContacts,
   getContactById,
   updateContact,
   deleteContact,
} from '../services/contact.service';

export async function createContactHandler(req: Request<{},{}, CreateContactInput['body']>, res: Response){
    try {
        const contact = await createContact(req.body);
        return res.status(200).json({
            ok:true,
            message: 'Contact created successfully',
            contact,
        });
    } catch (error : any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        });
    }
}

export async function getContactsHandler(req: Request, res: Response){
    try {
        const contacts = await getContacts();
        return res.status(200).json({
            ok: true,
            contacts
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message
        });
    }
}

export async function getContactHandler(req: Request<ReadContactInput['params']>, res: Response){
    try {
        const contactId = req.params.contactId;
        const contact = await getContactById(contactId);

        if(!contact){
            return res.status(404).json({
                ok: false,
                message: 'Contact not found'
            });
        }

        return res.status(200).json({
            ok: true, 
            contact
        });
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        });
    }
}

export async function updateContactHandler(
    req: Request<UpdateContactInput['params']>,
    res: Response
){
    try {
        const contactId = req.params.contactId;
        const contact = await getContactById(contactId);
        
        if(!contact){
            return res.status(404).json({
                ok: false,
                message: 'Contact not found'
            });
        }

        await updateContact(contactId, req.body);

        return res.status(200).json({
            ok: true,
            message: 'Contact updated successfully'
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        }); 
    }
}

export async function deleteContactHandler(
    req: Request<DeleteContactInput['params']>,
    res: Response 
){
    try {
        const contactId = req.params.contactId;
        const contact = await getContactById(contactId);

        if(!contact){
            return res.status(404).json({
                ok: false,
                message: 'Contact not found'
            });
        }

       await deleteContact(contact._id);

        return res.status(200).json({
            ok: true, 
            message: 'Contact deleted successfully',
            contact
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message 
        }); 
    }
}