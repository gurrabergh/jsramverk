<template>
  <Nav />
  <div class="about">
  <span v-html="head"></span>
  <p><span v-html="text"></span></p>
  </div>
</template>
<script>
import auth from '../components/token.js'
import Nav from './Nav.vue'
export default {
  name: 'Logout',
  props: { },
  components: {
      Nav,
  },
  data() {
    return {
        text: "",
        head: ""
    }
  },
  mounted() {
    this.logOut();
  },
  methods: {
    logOut() {
      auth.token = null
      this.$router.push('/login')
    }
  }
}
</script>