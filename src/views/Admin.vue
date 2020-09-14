<template>
  <Nav />
<h1>Admin</h1>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Rubrik</th>
        <th>Ändra</th>
      </tr>
    </thead>
    <tr v-for="text in texts" v-bind:key="text.id">
      <td>{{text.id}}</td>
      <td>{{text.heading}}</td>
      <td><a :href="' #/admin/edit/' + text.id" >Redigera</a> | <a :href="' #/admin/delete/' + text.id" >Radera</a></td>
    </tr>
  </table>
  <p><a href="#/admin/create">Skapa ny text</a></p>
</template>
<script>
import Nav from './Nav.vue'
export default {
  data() {
    return {
      texts: ''
    }
  },
  components: {
      Nav,
  },
    mounted() {
    this.getTexts();
  },
  methods: {
    getTexts() {
      let that = this;
      fetch('http://localhost:1337/admin')
     .then(function(response) {
          return response.json();
      })
      .then(function(result) {
          that.texts = result.data.text;
      });
    }
  }
}
</script>


<style>
table {
    margin: 20px 0;
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #fff;
    padding: 10px;
}

th {
    height: 50px;
    color: #000;
}

td {
    text-align: center;
    color: #000;
}

td:first-child {
    color: #000;
}

tr:nth-child(even) {
    background-color: rgb(62, 62, 62);
    background-color: rgba(62, 62, 62, 0.6);
}
</style>
