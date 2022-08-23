import  { Manager, Socket } from 'socket.io-client'
export const connectToServer = (token: string) => {
   //
   const manager = new Manager('http://localhost:3000/socket.io/socket.io.js ',
    {
        extraHeaders: {
            authentication: token,
        }
    });
   const socket = manager.socket('/');
   addListeners(socket);
}

const addListeners = (socket: Socket) => {
    const statusLabel = document.querySelector('#status')!;
    const clientsUl = document.querySelector('#clients-ul')!;
    const form = document.querySelector('#form')!;
    const message = document.querySelector<HTMLInputElement>('#message')!;
    const messages = document.querySelector('#messages-ul')!;

    socket.on('connect',()=>{
        statusLabel.textContent = "online";
    })

    socket.on('disconnect',()=>{
        statusLabel.textContent = "disconnect";
    })

    socket.on('clients-updated',(clients: string[])=>{
        let clientsHtml = '';
        clients.forEach(clientId =>{
              clientsHtml += `
              <li>${clientId}</li>
              ` 
        });
        clientsUl.innerHTML = clientsHtml;
    })
    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        if(message.value.trim().length <=0 ){
            return;
        }
        socket.emit('text',{message: message.value});
        message.value = '';
    });
    socket.on('messages',(payload: {fullName: string, message: string})=>{
        const newMessage = `
        <strong>${payload.fullName}</strong>
        <span>${payload.message}</span>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messages.append(li);
    });

}