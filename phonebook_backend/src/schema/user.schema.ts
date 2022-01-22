import { object, string, date, TypeOf } from "zod";

const payload = {
    body: object({
        
        name: string({
            required_error: 'Name is required'
        }).min(2, { message: 'Must be 2 or more characters long'}),

        lastName: string({
            required_error: 'Last Name is required'
        }).min(2, { message: 'Must be 2 or more characters long'}),

        email: string({
            required_error: 'Email is required'
        }).email('Not a valid email'),

        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password too short should be 6 chars minimum'),

        passwordConfirm: string({
            required_error: 'Password is required'
        }).min(6, 'Password Confirm too short should be 6 chars minimum'),

    }).refine((data) => data.password === data.passwordConfirm, {
        message: 'Password do not match',
        path: ['passwordConfirm']
    })
};

const updatePayload = {
    body: object({
        name: string({
            invalid_type_error: 'Name must be a string'
        })
        .min(2, { message: 'Must be 2 or more characters long'})
        .optional(),

        lastName: string({
            invalid_type_error: 'Last Name must be a string'
        })
        .min(2, { message: 'Must be 2 or more characters long'})
        .optional(),

        email: string({
            invalid_type_error: 'Email must be a string'
        })
        .email('Not a valid email')
        .optional()       
    })
};

const params = {
    params: object({
        userId: string({
            required_error: 'User ID is required'
        }),
    }),
};

export const createUserSchema = object({
    ...payload 
});

export const getUserSchema = object({
    ...params 
});

export const updateUserSchema = object({
    ...updatePayload,
    ...params
});

export const deleteUserSchema = object({
    ...params 
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirm'>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type ReadUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;