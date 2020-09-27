<template>
  <Nav />
  <div class="about">
  <span v-html="head"></span>
  <p><span v-html="text"></span></p>
  </div>
</template>
<script>
import Nav from './Nav.vue'
export default {
  name: 'About',
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
    this.getData(this.$route.params.week);
  },
  watch: {
    '$route': function() {
      this.getData(this.$route.params.week);
    }
  },
  methods: {
    getData(week) {
      this.text = "";
      this.heading = "";
      let that = this;
      fetch("https://me-api.gustavbergh.me/reports/week/" + week)
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