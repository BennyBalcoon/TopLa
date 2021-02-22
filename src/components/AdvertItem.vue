<template>
  <div class="column is-one-third">
    <!-- <router-link v-bind:to="'/meetups/' + meetup._id" class="card large"> -->
    <div class="card large">
      <router-link v-bind:to="{ name: 'AdvertDetailPage', params: { advertId: advert.id } }" class="card-meetup-link">
        <div class="card-image">
          <figure class="image is-4by3">
            <img v-bind:src="advert.image" alt="Image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="level m-b-md">
            <div class="media-left">
              <div class="level-item has-text-centered">
                <div>
                  <!-- get here startDate -->
                  <p class="title">{{ advert.createdAt | formatDate("MMM") }}</p>
                  <p class="title">{{ advert.createdAt | formatDate("D") }}</p>
                </div>
              </div>
            </div>
            <div class="media-content">
              <!-- get here meetup title -->
              <p class="title is-4 no-padding is-marginless">{{ advert.title | capitalize }}</p>
              <!-- get here meetup category -->
              <!-- <span class="tag is-success">{{ meetup.category.name }}</span> -->
              <!-- get here meetup location -->
              <p class="title is-7">{{ advert.address }}</p>
            </div>
          </div>
          <div class="content">
            <!-- get here meetup description -->
            {{ advert.description }}
            <div class="background-icon">
              <span class="icon-barcode"></span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    advert: {
      required: true,
      type: Object,
    },
  },
  // created() {
  //   console.log(this.$props);
  // }
};
</script>

<style scoped>
.card-meetup-link {
  color: black;
}
</style>