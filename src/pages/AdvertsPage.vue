<template>
  <div>
    <h1>Liste des annonces</h1>
    <h1>Filtres de recherche</h1>
    <div class="row columns is-multiline">
      <AdvertItem v-for="advert in adverts" v-bind:key="advert.id" v-bind:advert="advert" />
    </div>
  </div>
</template>

<script>
import AdvertItem from "../components/AdvertItem";
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    AdvertItem,
  },
  computed: {
    ...mapState({
        adverts: state => state.adverts.items
      })
  },
  created() {
    this.fetchAdverts()
  },
  methods: {
      ...mapActions('adverts', ['fetchAdverts'])
    }
};
</script>

<style scoped></style>
