const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const cors = require("cors");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://simple-crud-database:18hE1GwSILfh4v9k@cluster0.hpke9vz.mongodb.net/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("crud server is running!");
});

async function run() {
  try {
    (await client.connect()).db("admin").command({ ping: 1 });
    const usersDb = client.db("users");
    const usersCollection = usersDb.collection("users-collection");

    // get all users from database
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // insert user in database
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    // update user info 
    app.patch('/users/:id',async(req,res)=>{
      const user = req.body
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const update = {
        $set:{
          name:user.name,
          email: user.email
        }
      }
      const option = {}
      const result = await usersCollection.updateOne(query,update,option)
      res.send(result)
    })



    // find one user by id 
    app.get('/users/:id',async (req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await usersCollection.findOne(query)
      res.send(result)
    })

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });
    console.log("database connect to server successfully");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("crud server is running on port ", port);
});
