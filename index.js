// require('dotenv').config();
const express = require ("express");
const cors = require ("cors");
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

const {MongoClient, ServerApiVersion}=require ('mongodb');
const ObjectId = require('mongodb').ObjectId;
//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cu6sghd.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://practicezishan:PracticeZishan@cluster0.cu6sghd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const herocycle = async () => 
{
    try {
        await client.connect();
        const usersCollection = client.db('practicedb').collection('info');

        // Check Server is Ok or Not
        app.get("/",(req,res)=>res.send("Server is running"));

        // Get All Infos
        app.get('/infos', async (req, res) => {
            const infos = await usersCollection.find({}).toArray();
            res.send(infos);
        })
	 }

    finally {

            }
}
herocycle().catch(() => console.dir());
app.listen(PORT, () => console.log('Connect Hero Cycle'));