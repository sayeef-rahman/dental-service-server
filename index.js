const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

//App Express
const app = express();
const port = process.env.PORT || 5000;

//Middlewear
app.use(cors());
app.use(express.json());

//MongoDb URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fa6qf.mongodb.net/?retryWrites=true&w=majority`;

//MongoDb Client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db('doctors_portal').collection('services');

    app.get('/services', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    })


  }
  finally {

  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello From Doctor Uncle!')
})

app.listen(port, () => {
  console.log(`Doctors App listening on port ${port}`)
})