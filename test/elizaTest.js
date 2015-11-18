var mocha = require('mocha'),
    chai = require('chai'),
    should = chai.should(),
    io = require('socket.io-client'),
    config = require('../config/conf'),
    app = require('../app.js');

describe("#Eliza",function(){
    var server,
        options ={
            transports: ['websocket'],
            'force new connection': true
        },
        socketUrl = "http://" + config.ip + ":" + config.port;
    //Execute before each test
    beforeEach(function (done){
        //Start server
        app.listen();
        done();
    }),
    afterEach(function (done){
        //Close server after each test
        app.close();
        done();
    })
    //Test open server
    it('Open', function(done){
        //Connect to server
        var client = io.connect(socketUrl, options);
        var i = 0;
        client.on('connection', function(msg){
            i++;
            if (i == 3) done();
        });
    }),
    //Test on chat messages
    it('On chat', function(done){
        var messages = [];
        var client = io.connect(socketUrl, options);
        var i = 0;

        //Send message to server
        client.emit('chat message', 'always nop');
        //Response from server
        client.on('chat message', function(msg){
            messages.push(msg);
            i++;
            if (messages[messages.length - 1] == "Can you think of a specific example?"
                && i == 2) done();
        });
    }),
    //Test close socket
    it('Close socket', function(done){
        var client = io.connect(socketUrl, options);
        client.emit('chat message', 'bye bye');
        client.on('chat message', function(msg){
            if (msg == "Alright then, goodbye!") done();
        });
    })
});
