const { MongoClient } = require('mongodb');

let dbConnection;
const uri = "mongodb+srv://USERNAME:PASSWORD@cluster0.ribtrjl.mongodb.net/CLUSTER_NAME?retryWrites=true&w=majority&appName=Cluster0";

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
