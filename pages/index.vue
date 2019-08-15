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
</div>
</template>

<script>
// import axios from "axios";
export default {
  mounted() {
      this.$axios.get('users')
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style>

</style>

