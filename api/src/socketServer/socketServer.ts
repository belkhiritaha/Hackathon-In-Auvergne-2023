import { Server, Socket } from 'socket.io';


export function initializeSocket(io: Server) {
    io.on('connection', (socket: Socket) => {
        console.log('New WebSocket connection');
        const clientId = socket.id;

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
        
        socket.on('connect', () => {
            console.log('Client connected');
        });
    
    });
}

