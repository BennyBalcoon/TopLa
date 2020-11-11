<template>
  <div class="container">
    <ErrorView
      v-bind:title="'Ooooops, cette page n\'existe pas'"
      v-bind:status="'404'"
      v-bind:navigateToPage="'HomePage'"
      v-bind:navigateToText="'Retourner à la page d\'accueil'"
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
