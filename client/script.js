const socket = io();

const input = document.getElementById('socketInput')
const button = document.getElementById('submit')
const elementsList = document.getElementById('elementsList')



socket.on('notification', (data) => {
    console.log(`New notification: ${data}`);
    if(elementsList){
        const node = document.createElement("li");
        const formattedData = JSON.parse(data)
        const textnode = document.createTextNode(`Message: ${formattedData.message}, Sender: ${formattedData.sender}`);
        node.appendChild(textnode);
        elementsList.appendChild(node);
    }
})
if (button) {
    button.onclick = () => {

        let socketValue = {
            name: String(input.value),
            age: 2
        }

        socket.emit('message', JSON.stringify(socketValue));
    }
}


// input.val
