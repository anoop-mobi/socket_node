const express = require('express');
var cors = require('cors')
const socketio = require('socket.io');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
const server = app.listen(1337, '0.0.0.0', () => {
    console.log('Server running!')
})

const io = socketio(server)

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`)

    socket.on('message', (data) => {
        console.log(`New message from ${socket.id}: ${data}`);
        io.emit("notification", data);
    })

})

const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.use(express.static(path.resolve(__dirname, 'client')));

app.post('/api/send-notification', (req, res) => {
    const data = req.body; // Assuming the data is in the request body
    console.log('Received data:', data);
    io.emit('notification', JSON.stringify(data)); // Emit the notification event
    res.status(200).send('Notification sent successfully');
});