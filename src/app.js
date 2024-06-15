import bodyParser from "body-parser";
import express from "express";
import { corsConfig, serverConfig, cloudConfigure } from './config';

const app = express();
const { port } = serverConfig;

app
  .use(express.json())
  .use(express.json({ limit: '25mb' }))
  .use(express.urlencoded({ limit: '25mb', extended: true }))
  .use(express.urlencoded({ extended: false }))
  .use(credentials)
  .use(cors(corsConfig))
  .use(logger('dev'))
  .use(cookieParser())
  //.use('/', api)
 
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});