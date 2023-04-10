
const {MongoClient} = require('mongodb');

const connectionString = process.env.DB_CONNECT;
const dbName = process.env.DB_NAME;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnect;

exports.connectToDB = async(callback) => {
    try {
        const db = await client.connect();
        dbConnect = db.db(dbName);
        console.log("Successfully connected to MongoDB.");
  
    } catch(err) {
    }
  }

exports.getDb = () => dbConnect;
