<template>
  <div>
    <h1 class="title is-5 m-b-sm">Saisissez une adresse</h1>
    <div class="m-b-lg">
      <span class="subtitle">Paris, France</span>
      <a>(change location)</a>
      <input v-on:input="emitFormData"
             v-on:blur="$v.form.location.$touch()" 
             v-model="form.location" 
             type="text" 
             class="input">
      <div v-if="$v.form.location.$error">
        <span v-if="!$v.form.location.required" class="help is-danger">Une adresse est requise</span>
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
           location: null
        }
      }
    },
    validations: {
      form: {
        location: { required }
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