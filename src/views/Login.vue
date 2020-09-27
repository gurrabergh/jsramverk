<template>
  <Nav />
<h1>Logga in</h1>
  <div class="login">
    <form id=login>
      <label for="user">Användarnamn</label>
      <input type="email" v-model="usr" required>
      <label for="psw">Lösenord</label>
      <input type="password" name="psw" id="psw" v-model="psw" required>
      <button @click.prevent="submitted">Logga in</button>
    </form>
    <p><a href="#/register">Registrera ny användare här</a></p>
  </div>
</template>
<script>
import auth from '../components/token.js'
import Nav from './Nav.vue'
export default {
  data() {
    return {
      usr: "",
      psw: ""
    }
  },
  components: {
      Nav,
  },
  methods: {
    submitted() {
      let data = {
        usr: this.usr,
        psw: this.psw
      }
      fetch('https://me-api.gustavbergh.me/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if (data.data.token) {
          auth.token = data.data.token
            this.$router.push('/admin')
        }
      })
    }
  }
}
</script>
