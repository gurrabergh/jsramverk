<template>
  <Nav />
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <span v-html="head"></span>
    <p><span v-html="text"></span></p>
  </div>
</template>
<script>
import Nav from './Nav.vue'
export default {
  name: 'Home',
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
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      fetch("http://localhost:1337/")
      .then(function(response) {
          return response.json();
      })
      .then(function(result) {
          that.text = result.data.text.content;
          that.head = result.data.text.heading;
      });
    }
  }
}
</script>