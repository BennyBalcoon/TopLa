<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">S'inscrire</h3>
          <p class="subtitle has-text-grey">C'est ici que je crée mon compte !</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://placehold.it/128x128" />
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input
                    v-model="form.lastname"
                    v-on:blur="$v.form.lastname.$touch()"
                    class="input is-large"
                    type="text"
                    placeholder="Mon nom"
                  />
                  <div v-if="$v.form.lastname.$error" class="form-error">
                    <span v-if="!$v.form.lastname.required" class="help is-danger"
                      >Veuillez fournir votre nom de famille</span
                    >
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="form.firstname"
                    v-on:blur="$v.form.firstname.$touch()"
                    class="input is-large"
                    type="text"
                    placeholder="Mon prénom"
                  />
                  <div v-if="$v.form.firstname.$error" class="form-error">
                    <span v-if="!$v.form.firstname.required" class="help is-danger">Veuillez fournir votre prénom</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="form.email"
                    v-on:blur="$v.form.email.$touch()"
                    class="input is-large"
                    type="email"
                    placeholder="Mon adresse mail"
                  />
                  <div v-if="$v.form.email.$error" class="form-error">
                    <span v-if="!$v.form.email.required" class="help is-danger">Une addresse mail est requise</span>
                    <span v-if="!$v.form.email.email" class="help is-danger">Cette addresse mail n'est pas valide</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="form.birthdate"
                    v-on:blur="$v.form.birthdate.$touch()"
                    class="input is-large"
                    type="date"
                    placeholder="Ma date de naissance"
                    autocomplete=""
                  />
                  <div v-if="$v.form.birthdate.$error" class="form-error">
                    <span v-if="!$v.form.birthdate.required" class="help is-danger"
                      >Votre date de naissance est requise</span
                    >
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="form.password"
                    v-on:blur="$v.form.password.$touch()"
                    class="input is-large"
                    type="password"
                    placeholder="Mon mot de passe"
                    autocomplete="new-password"
                  />
                  <div v-if="$v.form.password.$error" class="form-error">
                    <span v-if="!$v.form.password.required" class="help is-danger">Un mot de passe est requis</span>
                    <span v-if="!$v.form.password.minLength" class="help is-danger">Votre mot de passe doit comporter au moins 6 caractères</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="form.passwordConfirmation"
                    v-on:blur="$v.form.passwordConfirmation.$touch()"
                    class="input is-large"
                    type="password"
                    placeholder="Confirmation du mot de passe"
                    autocomplete="off"
                  />
                  <div v-if="$v.form.passwordConfirmation.$error" class="form-error">
                    <span v-if="!$v.form.passwordConfirmation.required" class="help is-danger"
                      >Un mot de passe est requis</span
                    >
                    <span v-if="!$v.form.passwordConfirmation.sameAsPassword" class="help is-danger"
                      >La confirmation doit être identique à votre mot de passe</span
                    >
                  </div>
                </div>
              </div>
              <button
                v-on:click.prevent="register"
                v-bind:disabled="isFormInvalid"
                type="submit"
                class="button is-block is-primary is-large is-fullwidth"
              >
                Je crée mon compte
              </button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link v-bind:to="{ name: 'LoginPage' }">J'ai déjà un compte ? Je me connecte ici !</router-link>
          </p>
          <p class="has-text-grey">
            <a>Sign Up With Google</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      form: {
        lastname: null,
        firstname: null,
        email: null,
        birthdate: null,
        password: null,
        passwordConfirmation: null,
      },
    };
  },
  validations: {
    form: {
      lastname: { required },
      firstname: { required },
      email: { required, email },
      birthdate: { required },
      password: { 
          required, 
          minLength: minLength(6)
          },
      passwordConfirmation: { 
          required,
          sameAsPassword: sameAs('password')
          },
    },
  },
    computed: {
    isFormInvalid() {
      return this.$v.form.$invalid
    }
  },
  methods: {
    register() {
      this.$v.form.$touch();
      this.$store.dispatch('auth/registerUser', this.form)
        .then(() => {
          this.$toasted.success('Merci, vous venez de créer votre compte et pouvez dès maintenant vous connecter', {
              duration: 5000,
              theme: 'bubble'
            })
          this.$router.push('/login')
        })
        .catch((err) => {
          const error = err.response.data.errors.message
          this.$toasted.error(error, {duration: 5000})
        })
    },
  },
};
</script>

<style scoped>
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>
