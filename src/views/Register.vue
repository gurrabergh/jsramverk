<template>
  <Nav />
  <h1>Registrera en ny användare</h1>
  <div class="login">
    <form id=login>
      <label for="user">Användarnamn</label>
      <input type="email" v-model="usr" required>
      <label for="psw">Lösenord</label>
      <input type="password" name="psw" id="psw" v-model="psw" required>
      <button @click.prevent="submitted">Registrera</button>
    </form>
  </div>
</template>
<script>
import Nav from './Nav.vue'
export default {
  data() {
    return {
      usr: "",
      psw: ""
    }
  },
  methods: {
    submitted() {
      let data = {
        usr: this.usr,
        psw: this.psw
      }
      fetch('https://me-api.gustavbergh.me/register', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  .then(response => response.json())
  .then(data => {
    if (data.data.msg == 'success') {
          this.$router.push('/login')
    }
  })
  }
  },
  components: {
      Nav,
  }
}
</script>
