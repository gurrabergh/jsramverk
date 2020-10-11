<template>
  <Nav />
<h1>Chatt</h1>
  <div class="chatt" >
    <h3>Meddelanden:</h3>
    <div id="all-messages" class="all-messages">
        <p v-for="message in messages" v-bind:key="message.text">{{message.text}}</p>
    </div>

    <p v-if="user !== ''"><strong>Skriv ett meddelande:</strong></p>
    <input v-on:keyup="sendMessage" id="new-message" class="new-message" v-if="user !== ''" v-model="msg"/>
    <button  v-if="user !== ''" @click.prevent="sendEnter">Skicka meddelande</button>
  </div>
  <div v-if="user === ''">
        <p><strong>Välj ett användarnamn:</strong></p>
    <input v-model="username" class="user" />
    <button @click.prevent="submitted">Börja chatta</button>
  </div>
</template>
<script>
import io from 'socket.io-client';

const socket = io('https://me-api.gustavbergh.me');

socket.on('connect', function() { 
    socket.on('chat message', function (message) {
        const allMessages = document.getElementById("all-messages");
        let addedMessage = document.createElement("p");

        addedMessage.textContent = message;

        allMessages.appendChild(addedMessage);
    });
});

import Nav from './Nav.vue'
export default {
  data() {
    return {
        message: "",
        user: "",
        username: "",
        msg: "",
        messages: []
    }
  },
  components: {
      Nav,
  },
  mounted() {
      this.getMessages()
      setTimeout(this.scrollDown, 100);
  },
  methods: {
    submitted() {
        if (this.username !== '') {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            this.user = this.username;
            socket.emit('chat message', time + ' "' + this.user + '" har anslutit till chatten');
            setTimeout(this.scrollDown, 100);
        } 
    },
    sendMessage() {
         if (event.code === "Enter") {
                    socket.emit('chat message', this.user + ": " + event.target.value);
                    event.target.value = "";
                    setTimeout(this.scrollDown, 100);
                }
    },
    sendEnter() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        socket.emit('chat message', time + " " + this.user + ": " + this.msg);
        this.msg = "";
        setTimeout(this.scrollDown, 100);
    },
    scrollDown() {
        var element = document.getElementsByClassName("all-messages")[0];
        element.scrollTop = element.scrollHeight;
    },
    getMessages() {
      fetch('https://me-api.gustavbergh.me/chat')
      .then(response => response.json())
      .then(data => {
          this.messages = data
      });
  }
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.8rem;
    margin: 2rem auto;
    width: 60%;
}

.all-messages {
    width: 100%;
    height: 30vh;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 2rem;
    overflow-y: auto;
}

.all-messages p:nth-child(2n) {
    background-color: #ccc;
}

.new-message {
    width: 100%;
    height: 5vh;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 2rem;
    font-size: 1.8rem;
}
</style>
