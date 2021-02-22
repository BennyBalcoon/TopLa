<template>
  <div>
    <h1 class="title is-5 m-b-sm">Où se situe votre bien ?</h1>
    <div class="m-b-lg">
      <span class="help">Ex: 66 boulevard de rochechouart 75018 Paris</span>
      <input v-on:input="emitFormData"
             v-on:blur="$v.form.address.$touch()" 
             v-model="form.address" 
             type="text" 
             class="input">
             <span class="help is-danger">Complétez votre adresse et les personnes trouveront plus facilement votre annonce. Si vous ne souhaitez pas renseigner votre adresse exacte, indiquez votre rue sans donner le numéro. Cette information ne sera conservée que le temps de la publication de votre annonce et ne sera pas mentionnée dans celle-ci.</span>
      <div v-if="$v.form.address.$error">
        <span v-if="!$v.form.address.required" class="help is-danger">Une adresse est requise</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
         form: {
           address: null
        }
      }
    },
    validations: {
      form: {
        address: { required }
      }
    },
    methods: {
      emitFormData() {
        this.$emit('stepUpdated', {data: this.form, isValid: !this.$v.$invalid})
      }
    }
  }
</script>

<style scoped>