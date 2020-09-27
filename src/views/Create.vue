<template>
  <Nav />
<h1>Skapa text</h1>
  <div class="create">
    <form id=create>
      <label for="user">Rubrik</label>
      <textarea v-model="heading" ></textarea>
      <label for="psw">Innehåll</label>
      <textarea v-model="content" required ></textarea>
      <button @click.prevent="submitted">Spara</button>
    </form>
  </div>
</template>
<script>
import auth from '../components/token.js'
import Nav from './Nav.vue'
export default {
  data() {
    return {
      heading: "",
      content: ""
    }
  },
  components: {
      Nav,
  },
  methods: {
    submitted() {
      let data = {
        heading: this.heading,
        content: this.content
      }
      fetch('https://me-api.gustavbergh.me/reports', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      "x-access-token": auth.token
      },
      body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.data.msg == 'success') {
          this.$router.push('/admin')
        }
      })
    }
  }
}
</script>

<style>
legend {
    font-size: 24px;
}

input[type=text] {
    width: 100%;
    margin: 8px auto;
    box-sizing: border-box;
    padding: 12px 20px;
}

input[type=submit] {
    width: 200px;
    font-size: 16px;
    padding: 10px 0;
}

select {
    width: 30%;
    margin: 8px 0;
    padding: 3px 4px;
    display: block;
}

textarea {
    display: block;
    margin: 12px auto;
    width: 30%;
    height: 150px;
}
</style>
