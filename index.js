const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

// use middleware
app.use(cors())
app.use(express.json())
// -----------------------

// mongodb database setup
// username : dbuser1
// password: MTzzgQK6gxZPT4QU

const uri = "mongodb+srv://dbuser1:MTzzgQK6gxZPT4QU@cluster0.uhi0o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("foodExpress").collection("users");
    console.log('db connected');
    // perform actions on the collection object
    client.close();
});


app.get('/', (req, res) => {
    res.send('Running my node CRUD Server')
})

app.listen(port, () => {
    console.log('CRUD Server is running');
})