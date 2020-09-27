<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Me</router-link> |
      <router-link to="/reports/week/1">Report 1</router-link> |
      <router-link to="/reports/week/2">Report 2</router-link> |
      <router-link to="/reports/week/3">Report 3</router-link> |
      <router-link to="/reports/week/4">Report 4</router-link> |
      <router-link to="/login" v-if="isLogged === false">Logga in</router-link>
      <router-link to="/admin" v-if="isLogged === true">Admin </router-link> |
      <router-link to="/logout" v-if="isLogged === true"> Logga Ut </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import auth from '../components/token.js'
export default {
  data() {
    return {
      isLogged: this.checkIfLogged()
    }
  },
  methods: {
    checkIfLogged() {
      if (auth.token) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-active {
  color: #42b983;
}
</style>
