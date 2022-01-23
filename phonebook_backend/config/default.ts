import dotenv from 'dotenv';

dotenv.config();

export default {
    port: 4200 | process.env.PORT,
    dbUri: process.env.DATABASE_URI,
    saltWorkFactor: 10,
    accessToken: "30m",
    refreshToken: "1y",
    accessTokenPrivateKey: ``,
    accessTokenPublicKey: ``,
    refreshTokenPrivateKey: ``,
    refreshTokenPublicKey: ``,
}