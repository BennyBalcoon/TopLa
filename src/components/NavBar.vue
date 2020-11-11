<template>
  <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link v-bind:to="'/'" class="navbar-item">
        <h1 class="title is-4">TopLa</h1>
      </router-link>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu is-active">
      <div class="navbar-start">
        <router-link v-bind:to="{ name: 'AdvertsPage' }" class="navbar-item">Find</router-link>

        <!-- <div class="navbar-item">
          <input class="input is-rounded" type="text" placeholder="Je cherche..." />
        </div> -->
        <div class="navbar-item">
          <SearchInput />
        </div>

        <!-- <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">More</a>

          <div class="navbar-dropdown">
            <a class="navbar-item">About</a>
            <a class="navbar-item">Jobs</a>
            <a class="navbar-item">Contact</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Report an issue</a>
          </div>
        </div> -->
      </div>

      <div class="navbar-end">
        <div v-if="user" class="navbar-item">
          Bienvenue {{user.email}}
        </div>
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Account </a>
          <div class="navbar-dropdown">
            <a href="#" class="navbar-item"> Profile </a>
            <hr class="navbar-divider" />
            <a v-on:click.prevent="logout" class="navbar-item"> Logout </a>
          </div>
        </div>
        <div v-else class="navbar-item has-dropdown">
          <div class="buttons">
            <router-link v-bind:to="{ name: 'RegisterPage' }" class="button is-primary">
              <strong>S'inscrire</strong>
            </router-link>
            <router-link v-bind:to="{ name: 'LoginPage' }" class="button is-link">
              <strong>Se connecter</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import SearchInput from "@/components/SearchInput";
import { mapGetters } from 'vuex'
export default {
  components: {
    SearchInput,
  },
  computed: {
    ...mapGetters({
      'user': 'auth/authUser'
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
};
</script>

<style scoped>
/* .is-rounded {
  height: 30px;
} */
</style>
