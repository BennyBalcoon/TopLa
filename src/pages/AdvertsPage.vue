<template>
  <div>
    <SmallBanner />
    <SearchFilters />
    <div class="row columns is-multiline">
      <AdvertItem v-for="advert in adverts" v-bind:key="advert.id" v-bind:advert="advert" />
    </div>
  </div>
</template>

<script>
import AdvertItem from "../components/AdvertItem";
import SearchFilters from "../components/SearchFilters"
import SmallBanner from "../components/SmallBanner"
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      advertsByCategories: []
      }
  },
  props: {
    category: {
      required: false,
      type: String
    },
    categoryId: {
      required: false,
      type: Number
    },
    query: {
      required: false,
      type: String
    }
  },
  watch: {
    $route() {
      this.refreshAdverts()
    }
  }, 
  components: {
    AdvertItem,
    SearchFilters,
    SmallBanner
  },
  computed: {
    ...mapState({
      adverts: state => state.adverts.items
      }),
  },
  created() {
    this.refreshAdverts();
    },
  methods: {
    ...mapActions('adverts', ['fetchAdverts', 'fetchAdvertsByCategoryId', 'fetchAdvertsByTitle']),
    refreshAdverts() {
      if (this.$props.categoryId) {
        this.fetchAdvertsByCategoryId(this.$props.categoryId)
      } else if (this.$props.query) {
        console.log(this.$props.query);
        this.fetchAdvertsByTitle(this.$props.query)
      }
      else  {
        this.fetchAdverts()
      }
    }
    }
};
</script>

<style scoped></style>
