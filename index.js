const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId


// use middleware
app.use(cors())
app.use(express.json())
// -----------------------


// usernme: neyaz
// pass:8oty2v2x2ZA3KZ7Z


const uri = "mongodb+srv://neyaz:8oty2v2x2ZA3KZ7Z@cluster0.l30j2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");

        // create a document to insert
        // const user = { name: 'Devid Dan', email: 'david@gmail.com' }

        // const result = await userCollection.insertOne(user);
        // console.log(`User inserted with _id: ${result.insertedId}`);

        // get users
        app.get('/user', async (req, res) => {
            const query = {}
            const cursor = userCollection.find(query)
            const users = await cursor.toArray()
            res.send(users)
        })

        // POST User : add a new user
        app.post('/user', async (req, res) => {
            const newUser = req.body
            console.log('adding new user', newUser)
            const result = await userCollection.insertOne(newUser)
            res.send(result)
        })

        // delete a user
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }

            const result = await userCollection.deleteOne(query)
            res.send(result)
        })

    }
    finally {
        //   await client.close();
    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Running my node CRUD Server')
})

app.listen(port, () => {
    console.log('CRUD Server is running');
})