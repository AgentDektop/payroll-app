const express = require(`express`);
const cassandra = require(`cassandra-driver`);
const dotenv = require(`dotenv`)

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Casandra client configuration
const client = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_HOST || `127.0.0.1`],
    localDataCenter: process.env.CASSANDRA_DATACENTER || `datacenter1`,
    keyspace: process.env.CASSANDRA_KEYSPACE || `payroll_system`
});

console.log('Attempting to connect to Cassandra...');
client.connect()
    .then(() => {
        console.log(`Successfully connected to Cassandra`);
    })
    .catch((error) => {
        console.error(`Failed to connect to Cassandra`, error);
    });

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
})