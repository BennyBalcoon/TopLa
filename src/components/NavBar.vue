<template>
  <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link v-bind:to="'/'" class="navbar-item">
        <h1 class="title is-4 is-rounded">TopLa</h1>
      </router-link>
    </div>

    <div id="navbarBasicExample" class="navbar-menu is-active">
      <div class="navbar-start">
        <router-link v-bind:to="{ name: 'AdvertsPage' }" class="navbar-item">Voir les annonces</router-link>

        <div class="navbar-item">
          <SearchInput />
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-bind:to="{ name: 'AdvertCreatePage' }" class="button is-primary">
            <strong>Créer une annonce</strong>
          </router-link>
        </div>
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">{{ user.firstName | capitalize }} {{ user.lastName | capitalize }} </a>
          <div class="navbar-dropdown">
            <router-link v-bind:to="{ name: 'ProfilePage' }" class="navbar-item"> Mon profil </router-link>
            <hr class="navbar-divider" />
            <!-- <a href="#" class="navbar-item"> Mes annonces </a>
            <hr class="navbar-divider" /> -->
            <a v-on:click.prevent="logout" class="navbar-item"> Se déconnecter </a>
          </div>
        </div>
        <div v-else class="navbar-item">
          <div class="buttons">
            <router-link v-bind:to="{ name: 'RegisterPage' }" class="button is-link navbar-item">
              <strong>S'inscrire</strong>
            </router-link>
            <router-link v-bind:to="{ name: 'LoginPage' }" class="button is-link navbar-item">
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
import { mapGetters } from "vuex";
export default {
  components: {
    SearchInput,
  },
  computed: {
    ...mapGetters({
      user: "auth/authUser",
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped>
.is-rounded {
  height: 30px;
}

.title {
  color: #f3628d;
}</style
>>
