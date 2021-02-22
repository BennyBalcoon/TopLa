<template>
  <div class="advert-create-page">
    <AppBanner />
    <section class="section">
      <div class="container">
        <AdvertCreateWizard v-on:advertConfirmed="createAdvert"/>
      </div>
    </section>
  </div>
</template>

<script>
  import AdvertCreateWizard from '@/components/AdvertCreate/AdvertCreateWizard'
  export default {
    components: {
      AdvertCreateWizard
    },
    computed: {
      categories() {
        return this.$store.state.categories.items
      }
    },
    created () {
      if (this.categories.length === 0) {
        this.$store.dispatch('categories/fetchCategories')
      }
    },
    methods: {
      createAdvert(advertToCreate) {
        this.$store.dispatch('adverts/createAdvert', advertToCreate)
          .then(() => {
            this.$toasted.success('Votre nouvelle annonce a bien été créée, vous pouvez la voir ou la modifier dans votre profil', {
              duration: 5000,
              theme: 'bubble'
            })
            this.$router.push('/')
          })
          .catch((err) => {
            const error = err.response.data.errors.message
            this.$toasted.error(error, {duration: 5000})
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .advert-create-page {
    min-height: 100vh;
  }
</style>