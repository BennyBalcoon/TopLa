<template>
  <div class="container">
    <ErrorView
      v-bind:title="'Ooooops, vous devez vous authentifier pour visiter cette page, merci de vous connecter.'"
      v-bind:status="'401'"
      v-bind:navigateToPage="'LoginPage'"
      v-bind:navigateToText="'Retourner à la page de connection'"
    />
  </div>
</template>

<script>
import ErrorView from "@/components/ErrorView";

export default {
  components: {
    ErrorView,
  },
};
</script>

<style scoped></style>