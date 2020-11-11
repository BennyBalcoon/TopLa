<template>
  <div>
    <AppBanner />
    <section v-if="pageLoader_isDataLoaded" class="section">
      <div>
        <h1 class="title">Categories</h1>
        <div class="columns cover is-multiline is-mobile">
          <CategoryItem v-for="category in categories" v-bind:key="category.id" v-bind:category="category"/>
        </div>
      </div>
    </section>
    <div v-else class="container">
      <AppSpinner />
    </div>
  </div>
</template>
<script>
import CategoryItem from '@/components/CategoryItem'
// improvement: no need to use $store, dispatch etc... with mapActions
import { mapActions, mapState } from 'vuex'
import pageLoader from '@/mixins/pageLoader'
export default {
    components: {
        CategoryItem
    },
    mixins: [pageLoader],
    computed: {
      ...mapState({
        categories: state => state.categories.items
      })
    },
    created() {
      // this.$store.dispatch('fetchCategories')
      this.fetchCategories()
        .then(() => {
          this.pageLoader_resolveData()
        })
        .catch((err) => {
          console.log(err);
          this.pageLoader_resolveData()
        })
    },
    methods: {
      ...mapActions('categories', ['fetchCategories'])
      // categories references the name of the module in store
    }
};
</script>

<style scoped>

</style>
