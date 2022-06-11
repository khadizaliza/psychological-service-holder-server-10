const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//midleware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://dbuser:lX0URCuUTkmdun8j@cluster0.k2nsb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try{
    await client.connect();
    console.log('db connect')
    const serviceCollection = client.db('psychological-service-holder').collection('services');
    app.get('/service', async(req, res) => {
      const query = {};
    const cursor = serviceCollection.find(query);
    const services = await cursor.toArray();
    res.send(services);
    });

    app.get('/service/:id', async(req, res) =>{
      const id = req.params.id;
      const query={_id: ObjectId(id)};
      const service = await serviceCollection.findOne(query);
      res.send(service);
    })

  }
  finally{

  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Running psychological Server');
});
app.listen(port, () =>{
    console.log('Listening to port', port);
})

