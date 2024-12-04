import { Client } from '@stomp/stompjs';

class WebSocketService {
    constructor() {
        this.client = new Client({
            brokerURL: 'ws://localhost:8080/main',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.client.onConnect = () => {
            console.log('Connected to WebSocket');
            this.subscribe();
        };

        this.client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
    }

    connect() {
        this.client.activate();
    }

    disconnect() {
        this.client.deactivate();
    }

    subscribe() {
        this.client.subscribe('/topic/game', (message) => {
            console.log('Received game update:', message.body);
        });

        this.client.subscribe('/topic/messages', (message) => {
            console.log('Received broadcast:', message.body);
        });
    }

    sendMove(move) {
        this.client.publish({
            destination: '/app/move',
            body: move,
        });
    }
}

export default new WebSocketService();