//eliza.js
var eliza = require('../util/eliza.js')

module.exports = function(io){
    io.on('connection', function(socket){
        //Messages on connect
        socket.emit('connection', "The doctor is in.");
        socket.emit('connection', "What's on your mind");
        socket.emit('connection', "---");

        //Messages on conversations
        socket.on('chat message', function(msg){
            //Test if the message has bye
            if (msg.search("bye") != -1){
                socket.emit('chat message', "Alright then, goodbye!");
                socket.disconnect();
            }
            else{
                socket.emit('chat message', "---");
                socket.emit('chat message',eliza.respond(msg));
            }
        });
    })
}
