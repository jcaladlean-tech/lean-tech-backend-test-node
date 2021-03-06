import dotenv from 'dotenv';
dotenv.config();
export const config = {
  server: {
    port: process.env.PORT,
    host: process.env.HOST,
    protocol: 'http',
  },
  mongoDataBase: {
    URL: process.env.MONGO_URL,
    options: {
      poolSize: 5,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  },
  postgresqlDataBase: {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    dataBase: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  },
  eia: {
    apiKey: process.env.EIA_API_KEY,
    baseUrl: process.env.EIA_URL,
  },
  auth: {
    token_key: process.env.TOKEN_KEY,
  },
  googleDrive: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: process.env.REDIRECT_URIS,
    refresh_token: process.env.REFRESH_TOKEN,
    folder: process.env.FOLDER,
  },
  sendEmail: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  }
};
