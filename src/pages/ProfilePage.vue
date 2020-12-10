<template>
  <div class="columns">
    <div class="container profile">
      <div class="section profile-heading">
        <div class="columns is-mobile is-multiline">
          <div class="column is-2">
            <figure class="image header-icon user-profile-image">
              <img class="is-rounded" src="http://www.japoyo.com/2015/wp-content/uploads/2015/02/2015-02-24_11-23-24-650x650.jpg"/>
            </figure>
          </div>
          <div class="column is-4-tablet is-10-mobile name">
            <p class="title is-bold">
              {{user.firstName | capitalize }}
            </p>
            <p class="tagline">
              Membre depuis le {{user.createdAt}}
            </p>
            <br>
              <UserUpdateModal v-bind:authUser="user" v-on:userSubmitted="updateUser" />
          </div>
          <div class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">
              {{ adverts.length }}
              </p>
            <p class="stat-key">Mes annonces</p>
          </div>
          <div class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">0</p>
            <p class="stat-key">Mes dons</p>
          </div>
          <div class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">0</p>
            <p class="stat-key">Mes récups</p>
          </div>
        </div>
      </div>
      <!-- TODO: Display this div when activeTab === 'adverts' -->
      <div class="columns is-mobile is-multiline">
        <!-- TODO: Iterate over meetups -->
        <div v-for="advert in adverts" v-bind:key="advert.id" class="column is-3-tablet is-6-mobile">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img v-bind:src="advert.image"/>
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">
                    {{ advert.title }}
                    </p>
                  <p class="subtitle is-6"><span class="tag is-dark subtitle">{{advert.category.name}}</span></p>
                </div>
              </div>
              <div class="content">
                <p>
                  {{ advert.description }}
                </p>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Modifier</a>
              <a v-on:click.prevent="($event) => warningAndDelete($event, advert.id)"  class="card-footer-item">Supprimer</a>
            </footer>
          </div>
          <br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserUpdateModal from '../components/UserUpdateModal'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
    components: {
      UserUpdateModal
    },
    computed: {
      ...mapGetters({
        'user': 'auth/authUser'
      }),
      ...mapState({
        adverts: state => state.adverts.items,
        // rows: state => state.stats.stats.rows
      })
    },
    created() {
        // this.$store.dispatch('adverts/fetchAdvertsByUser')
        //     .then((adverts) => {
        //         console.log(adverts);
        //     })
        this.fetchAdvertsByUser()
          .then((adverts) => {
            console.log(adverts);
          })
    },
    methods: {
      updateUser({user, done}) {
        this.$store.dispatch('auth/updateUser', user)
          .then(() => {
            this.$toasted.success('Votre profil a bien été modifié', {duration: 5000, theme: 'bubble'})
            done()
          })
          .catch((err) => {
            console.log(err);
            done()
          })
      },
      warningAndDelete(event, advertId) {
        event.stopPropagation()
        const isConfirmed = confirm('Voulez-vous supprimer cette annonce ?')

        if(isConfirmed) {
          this.deleteAdvert(advertId)
            .then(() => {
              this.fetchAdvertsByUser();
            })
            .catch((err) => {
              console.log(err);
            })
        }
      },
      ...mapActions('adverts', ['fetchAdvertsByUser', 'deleteAdvert'])
    }
}
</script>


<!-- Styles -->
<style scoped>
  body {
    background: #F5F7FA
  }
  .stats-tab {
    border-bottom: 2px solid transparent;
    transition: 0.5s;
  }
  .stats-tab:hover {
    cursor: pointer;
    border-bottom: 2px solid black;
  }
  .stats-tab.isActive {
    border-bottom: 2px solid black;
  }
  .stat-val {
    font-size: 3em;
    padding-top: 20px;
    font-weight: bold;
  }
  .stat-key {
    font-size: 1.4em;
    font-weight: 200
  }
  .section.profile-heading .column.is-2-tablet.has-text-centered + .has-text-centered {
    border-left: 1px dotted rgba(0, 0, 0, .2);
  }
  .container.profile {
    margin-top: 1%;
  }
  .control.is-pulled-left span.select {
    margin-right: 5px;
    border-radius: 2px;
  }
  .modal-card .content h1 {
    padding: 40px 10px 10px;
    border-bottom: 1px solid #dadada
  }
  .container.profile .profile-options .tabs ul li.link a {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #F1F1F1;
  }
  
</style>