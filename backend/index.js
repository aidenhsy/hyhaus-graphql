const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv');

const schema = require('./graphql/schema/schema');
const connectDB = require('./config/db');

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`Listening on ${PORT} in ${process.env.NODE_ENV} mode`);
});
