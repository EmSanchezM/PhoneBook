import express from 'express';
import config from 'config';
import cors from 'cors';
import connect from './utils/database';
import logger from './utils/logger';
import router from './routes';

const port = config.get('port');

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, async() => {
    logger.info('APP is running in port ' + port);
    await connect();
});
