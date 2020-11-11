<template>
    <div>
        <h1>Détails de l'annonce</h1>
        <div class="card-image">
          <figure class="image is-4by3">
            <img v-bind:src="advert.image1" alt="Image" />
          </figure>
        </div>
        <p>{{advert.description}}</p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            advert: state => state.adverts.item
        })
    },
    created() {
        const advertId = this.$route.params.id
        this.fetchAdvertById(advertId)
    },
    methods: {
        ...mapActions('adverts', ['fetchAdvertById'])
        // adverts references the module in store folder
    }
}
</script>

<style scoped>

</style>