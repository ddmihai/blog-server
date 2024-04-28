import http from 'http';
import app from './app';
import { createDatabaseConneciton } from './database/connection';


/* 
    SERVER SETTINGS 
*/
const port = process.env.PORT || 3000;
const server = http.createServer(app)








const startServer = async () => {
    server.listen(port);
    server.on('listening', () => console.log(`Server listening on port ${port}`));

    // Start server
    createDatabaseConneciton();
}



startServer();