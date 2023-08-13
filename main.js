//inclure le module HTTP
const http = require('http');
const User = require('./models/user');
const app = require('./server');
const hostname = "127.0.0.1";
const port = 3000;


// Creation dun serveur HTTP
const server = http.createServer(function (req, res) {
  //Definir lentete de reponse HTTP , le statut HTTP et le type de contenu 
  res.writeHead(200, { "Content-Type": "text/plain" });
}); 


  // Lancement du serveur
server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
