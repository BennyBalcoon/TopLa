<template>
    <div class="meetup-detail-page">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <aside class="is-medium menu">
              <div class="meetup-side-box">
                <div v-if="hasUserData" class="card-image">
                    <figure class="image is-4by3">
                        <img v-bind:src="advert.user.avatar" alt="Image" />
                    </figure>
                </div>  
                <hr>
                <div v-if="hasUserData" class="meetup-side-box-date m-b-sm">
                  <p><b>{{advert.user.firstName | capitalize}}</b></p>
                  <p>Membre depuis le {{advert.user.createdAt}}</p>
                </div>
              </div>
            </aside>
          </div>
          <div class="column is-7 is-offset-1">
            <div class="card-image">
              <figure class="image is-4by3">
                <img v-bind:src="advert.image" alt="Image" />
              </figure>
            </div> 
            <hr>
            <div class="content is-medium">
              <h3 class="title is-3">{{advert.title}}</h3>
              <p>{{advert.description}}</p>
              <hr>
            </div>
            <!-- Thread List START -->
            <div class="content is-medium">
                <MapContainer v-if="hasCoordinates" :coordinates="coordinates"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MapContainer from '../components/MapContainer'

export default {
  data() {
      return {
        coordinates: {},
        hasCoordinates: false,
        hasUserData: false
      }
    },
    props: {
        advertId: {
        required: false,
        type: String
      }
    },
    components: {
      MapContainer
    },
    computed: {
      ...mapState({
        advert: state => state.adverts.item,
        }),
    },
    created() {
        this.fetchAdvertById(this.$props.advertId)
          .then((item) => {
            this.coordinates = {
              latitude: item.location.coordinates[0],
              longitude: item.location.coordinates[1]
            }
            this.hasCoordinates = true;
            this.hasUserData = true;
          })
    },
    methods: {
        ...mapActions('adverts', ['fetchAdvertById'])
        // adverts references the module in store folder
    }
}
</script>

<style scoped lang="scss">

hr {
    border-top: 3px double #f3628d;
}

</style>