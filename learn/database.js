const { MongoClient } = require('mongodb');

let dbConnection;
const uri = "mongodb+srv://hackedversion:e7WG7xBbtuwvCxVi@cluster0.ribtrjl.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0";

/* connecting locally */

// module.exports = {
//     connectToDo: (cb) => {
//         MongoClient.connect('mongodb://localhost:27017/bookstore')
//             .then((client) => {
//                 dbConnection = client.db();
//                 console.log("Connected to MongoDB");
//                 cb(null); // Pass null for the error parameter to indicate successful connection
//             })
//             .catch(err => {
//                 console.error("Error connecting to MongoDB:", err);
//                 cb(err); // Pass the error to the callback function
//             });
//     },
//     getDb: () => dbConnection
// };

/* connecting remotely */
module.exports = {
    connectToDo: (cb) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db();
                console.log("Connected to MongoDB online");
                cb(null); // Pass null for the error parameter to indicate successful connection
            })
            .catch(err => {
                console.error("Error connecting to MongoDB:", err);
                cb(err); // Pass the error to the callback function
            });
    },
    getDb: () => dbConnection
};

/* connecting remotely trying */

//
// const {MongoClient, ServerApiVersion} = require('mongodb');
// const uri = "mongodb+srv://hackedversion:e7WG7xBbtuwvCxVi@cluster0.ribtrjl.mongodb.net/Bookstore?retryWrites=true&w=majority&appName=Cluster0";
// let dbConnection;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });
//
//
// module.exports = {
//     connectToDo:(cb)=>{
//         async function run() {
//             try {
//                 // Connect the client to the server	(optional starting in v4.7)
//                 await client.connect();
//                 // Send a ping to confirm a successful connection
//                 await client.db("admin").command({ ping: 1 });
//                 console.log("Pinged your deployment. You successfully connected to MongoDB!");
//             } finally {
//                 // Ensures that the client will close when you finish/error
//                 await client.close();
//             }
//         }
//         run().catch(console.dir);
//
//     },
//     getDb: () => dbConnection
// }