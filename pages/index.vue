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
import SERVER from '~/assets/server/api.js'//引入接口地址
export default {
  data() {
    return {
      text: "",
      aa: ""
    };
  },
  methods: {
    postmessage(url, params) {
      var params = {
        firstName: "Fred",
        lastName: "Flintstone"
      };
      JSON.stringify(params);
      return new Promise((scuessful, fail) => {
        this.$axios.get(url, params)
          .then(function(response) {
            scuessful(response);
            console.log(params, "!!!")
          })
          .catch(function(error) {
            console.log(params, "!!!")
            fail(error);
          });
      });
    },
    haha() {
      console.log(this.text);
      this.$axios
        .get(`/users`, {
          params: {
            id: 10
          }
        })
        .then(function(response) {
          console.log(response);
          this.aa = response;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    SERVER.getAticleList().then((data) => {
      console.log("???")
    }).catch(() =>
      console.log("!!!")
    )
  }
};
</script>

<style>

</style>

