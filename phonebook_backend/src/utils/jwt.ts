import jwt from 'jsonwebtoken';
import config from 'config';

export function signJWT(
    object: Object,
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jwt.SignOptions | undefined
){
    const singinKey = Buffer.from(
        config.get<string>(keyName),
        'base64'
    ).toString('ascii');

    return jwt.sign(object, singinKey, {
        ...(options && options),
        algorithm: 'RS256'
    });
}

export function verifyJwt(
    token: string,
    keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
  ) {
    const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
      "ascii"
    );
  
    try {
      const decoded = jwt.verify(token, publicKey);
      return {
        valid: true,
        expired: false,
        decoded,
      };
    } catch (e: any) {
      console.error(e);
      return {
        valid: false,
        expired: e.message === "jwt expired",
        decoded: null,
      };
    }
  }
