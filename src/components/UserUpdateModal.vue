<template>
  <div>
    <button v-on:click="isOpen = !isOpen" class="button is-primary is-outlined m-t-sm">Mettre à jour</button>
    <div :class="['modal', {'is-active': isOpen}]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Mes informations</p>
          <button v-on:click='isOpen = false' class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="title">Nom</label>
              <input v-model="user.lastName" class="input">
            </div>
            <div class="field">
              <label class="title">Prénom</label>
              <input v-model="user.firstName" class="input">
            </div>
            <div class="field">
              <label class="title">Avatar</label>
              <input class="input">
            </div>
            <div class="field">
              <label class="title">Date de naissance</label>
              <input v-model="user.birthdate" class="input" type="date">
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button v-on:click="emitUser" class="button is-success">Je valide</button>
          <button v-on:click='isOpen = false' class="button">Annuler</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        authUser: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            isOpen: false,
            user: {...this.authUser}
        }
    },
    methods: {
        emitUser() {
            this.$emit('userSubmitted', {user: this.user, done: () => {
                this.isOpen = false
            }})
        }
    }  
}
</script>

<style scoped>

</style>