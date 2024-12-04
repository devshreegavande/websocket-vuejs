<template>
  <div>
    <button @click="connect">Connect</button>
    <button @click="disconnect">Disconnect</button>
    <button @click="sendMove">Send Move</button>
  </div>
</template>
  
<script>
import WebSocketService from '../services/WebSocketService';

export default {
  name: 'AboutView',
  methods: {
    connect() {
      WebSocketService.connect();
    },
    disconnect() {
      WebSocketService.disconnect();
    },
    sendMove() {
      WebSocketService.sendMove('helloWorld');
    }
  },
};
</script>
