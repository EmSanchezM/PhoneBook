import { object, string, TypeOf } from "zod";

const payload = {
    body: object({
        
        name: string({
            required_error: 'Nombre es requerido'
        }).min(2, { message: 'Debe tener 2 o más caracteres'}),

        lastName: string({
            required_error: 'Apellido es requerido'
        }).min(2, { message: 'Debe tener 2 o más caracteres'}),

        phoneNumber: string({
            required_error: 'Número de telefono es requerido'
        }).min(8, { message: 'Debe tener 8 o más caracteres'}),
    })
};

const updatePayload = {
    body: object({

        name: string({
            invalid_type_error: 'El nombre debe de ser un string'
        }),

        lastName: string({
            invalid_type_error: 'El apellido debe de ser un string'
        }),

        phoneNumber: string({
            invalid_type_error: 'El número de telefono debe de ser un string'
        })
        .min(8, { message: 'Debe tener 8 o más caracteres'})
        .optional() 
    })
};

const params = {
    params: object({
        contactId: string({
            required_error: 'Contact ID es requerido'
        }),
    }),
};

export const createContactSchema = object({
    ...payload 
});

export const getContactSchema = object({
    ...params 
});

export const updateContactSchema = object({
    ...updatePayload,
    ...params
});

export const deleteContactSchema = object({
    ...params 
});

export type CreateContactInput = TypeOf<typeof createContactSchema>;
export type UpdateContactInput = TypeOf<typeof updateContactSchema>;
export type ReadContactInput   = TypeOf<typeof getContactSchema>;
export type DeleteContactInput = TypeOf<typeof deleteContactSchema>;