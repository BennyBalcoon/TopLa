<template>
  <div class="column is-one-quarter" :style="{ 'min-height': '160px' }">
    <router-link v-bind:to="{name: 'AdvertsByCategoryPage', params: {category: category.name, categoryId: category.id}}">
      <span class="is-primary is-top is-medium tooltip">
        <figure class="image is-4by3 imageFade">
          <img class="is-rounded" v-bind:src="category.image" alt />
        </figure>
        <div class="subtitle m-t-xs bold is-size-7-mobile has-text-justified-mobile">{{ category.name | capitalize }}</div>
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
    props: {
        category: {
            required: true,
            type: Object
        }
    }
};
</script>

<style scoped>
.is-rounded {
  border-radius: 10px !important;
}
</style>
