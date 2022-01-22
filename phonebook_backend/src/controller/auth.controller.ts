import { Request, Response } from 'express';
import logger from '../utils/logger';
import { signJWT } from '../utils/jwt';
import config from 'config';

import { CreateUserInput } from '../schema/user.schema';

import {
    createUser,
    validatePassword
} from '../services/user.service';

export async function registerUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.status(201).json({
            ok: true,
            message: 'User registered successfully',
            user
        });
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json({
            ok: false,
            message: error.message
        });
    }
}

export async function loginHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).json({
            ok: false,
            message: 'Invalid credentials!'
        });
    }

    const accessToken = signJWT(
        user,
        'accessTokenPrivateKey',
        { expiresIn: config.get('accessToken') }
    );

    const refreshToken = signJWT(
        user,
        "refreshTokenPrivateKey",
        { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
    );

    return res.status(200).json({
        ok: true,
        user,
        accessToken,
        refreshToken
    });
}

