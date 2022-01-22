import { object, string, TypeOf } from "zod";

const payload = {
    body: object({
        
        name: string({
            required_error: 'Name is required'
        }).min(2, { message: 'Must be 2 or more characters long'}),

        lastName: string({
            required_error: 'Last Name is required'
        }).min(2, { message: 'Must be 2 or more characters long'}),

        phoneNumber: string({
            required_error: 'Phone Number is required'
        }).min(8, { message: 'Must be 8 or more characters long'}),
    })
};

const updatePayload = {
    body: object({

        name: string({
            invalid_type_error: 'Name must be a string'
        }),

        lastName: string({
            invalid_type_error: 'Last Name  must be a string'
        }),

        phoneNumber: string({
            invalid_type_error: 'Phone number must be a string'
        })
        .min(8, { message: 'Must be 9 or more characters long'})
        .optional() 
    })
};

const params = {
    params: object({
        contactId: string({
            required_error: 'Contact ID is required'
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