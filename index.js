const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
// require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

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

        // Get Single Info 
        app.get('/infos/:infoID', async (req, res) => {
            const getInfoID = req.params.infoID
            if (getInfoID === 'undefined') {
                res.send({ status: 401 })
            }
            else {
                const query = { _id: ObjectId(getInfoID) }
                const info = await usersCollection.findOne(query);
                res.send(info);
            }
        })

        // Update Single Info
        app.put('/info', async (req, res) => {
            const getSingleInfo = req.body
            console.log('Body ', getSingleInfo.id)
            if (getSingleInfo === 'undefined') {
                res.send({ status: 401 })
            }
            else
            {
                    const filter = { _id: ObjectId(getSingleInfo._id) }
                    const updateDoc = {
                        $set: {
                            name: getSingleInfo.name,
                            age: getSingleInfo.age
                        }
                    }
                    const result = await usersCollection.updateOne(filter, updateDoc)
                    res.send(result)
            }
        })

        // Add Info
        app.post('/infos', async (req, res) => {
            const userInfo = req.body
            const result = await usersCollection.insertOne(userInfo);
            res.send(result);
        })

        // Delete Single Info 
        app.delete('/infos/:infoID', async (req, res) => {
            const getInfoID = req.params.infoID
            const filter = { _id: ObjectId(getInfoID) }
            const result = await usersCollection.deleteOne(filter)
            res.send(result)
        })
	 }

    finally {

            }
}
herocycle().catch(() => console.dir());
app.listen(PORT, () => console.log('Connect Hero Cycle'));