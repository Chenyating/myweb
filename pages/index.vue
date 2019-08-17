<template>
<div>
  <ul>
    <li>
      <nuxt-link :to="{path:'mobile'}">mobile</nuxt-link>
    </li>
    <li>
      <nuxt-link :to="{path:'pc'}">pc</nuxt-link>
    </li>
  </ul>
  <input v-model="text" placeholder="edit me">
  <input type="submit" value="提交" @click="postmessage">
</div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      text: '',
      aa:''
    }
  },
  methods: {
    postmessage() {
      console.log(this.text)
      this.$axios.get(`/users`)
        .then(function(response) {
          this.aa=response;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    haha() {
      console.log(this.text)
      this.$axios.get(`/aa`)
        .then(function(response) {
          console.log(response);
          this.aa=response;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.haha();
  }
}
</script>

<style>

</style>

