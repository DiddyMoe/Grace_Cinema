// Setting the port number
const PORT = 8080;

// Importing the server instance and database object
const server = require("./index");
const { db } = require("./db");

// Syncing the database and starting the server
db.sync().then(() => {
 server.listen(PORT, () => {
 console.log(`Listening on port ${PORT}\nhttp://localhost:${PORT}/`);
 });
});