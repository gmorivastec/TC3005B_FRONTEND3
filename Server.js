
// este está escrito con puro javascript
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {

    console.log('Request de: ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(8081, function() {
    console.log("ESCUCHANDO EN 8081");
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

// declara una función para validar origen 
function originIsAllowed(origin) {
    // aquí checar origen vs 
    // - expresión regular
    // - una lista de orígenes válidos
    // - una lista de expresiones regulares :D
    return true;
}

wsServer.on('request', function(request) {
    
    // si es que tenemos implementado el origin is allowed
    // verificar validez de origen
    if(!originIsAllowed(request.origin)){
        request.reject();
        return;
    }

    var connection = request.accept('echo-protocol', request.origin);

    connection.on('message', function(message){

        // utf8 - codificación unicode 
        if(message.type === 'utf8'){

            console.log("RECIBIDO: " + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }

    });

    connection.on('close', function(reasonCode, description){

        console.log("conexión cerrada");
    });
});