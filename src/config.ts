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
  eia:{
    apiKey: process.env.EIA_API_KEY,
    baseUrl: process.env.EIA_URL
  },
  auth: {
    token_key: process.env.TOKEN_KEY
  }
};
