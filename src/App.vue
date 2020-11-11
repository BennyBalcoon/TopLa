<template>
  <div v-if="isAuthResolved" id="app">
    <NavBar />
    <div class="page-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  computed: {
    isAuthResolved() {
      return this.$store.state.auth.isAuthResolved
    }
  },
  created() {
    this.$store.dispatch('auth/getAuthUser')
  }
};
</script>

<style>
  .page-wrapper {
  min-height: 50vh;
}
</style>

