<template>
  <form v-on:input="emitFormData"> 
    <div class="field">
      <h1 class="title is-5 m-b-sm">Type d'annonce</h1>
      <div class="control" v-on:change="emitFormData">
          <input v-model="form.kind"
                 v-on:blur="$v.form.kind.$touch()"
                 type="radio"
                 id="Don"
                 value="Don" 
                 name="answer" />
          <label for="Don" class="radio">Don</label>
          <input v-model="form.kind"
                 v-on:blur="$v.form.kind.$touch()"
                 type="radio"
                 id="Demande"
                 value="Demande" 
                 name="answer" />
          <label for="Demande" class="radio">Demande</label>
      </div>
    </div>
    <div class="field">
      <h1 class="title is-5 m-b-sm">Choisissez une catégorie</h1>
      <div class="m-b-lg">
        <div class="select">
          <select v-model="form.category"
                  v-on:blur="$v.form.category.$touch()"
                  v-on:change="emitFormData">
            <option v-for="category in categories"
                    :value="category.id"
                    :key="category.id">{{category.name}}</option>
          </select>
        </div>
        <div v-if="$v.form.category.$error">
          <span v-if="!$v.form.category.required" class="help is-danger">Category is required</span>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      form: {
        kind: null,
        category: null,
      },
    };
  },
  validations: {
    form: {
      kind: { required },
      category: { required },
    },
  },
  computed: {
    categories() {
      return this.$store.state.categories.items
    }
  },
  methods: {
      emitFormData() {
        this.$emit('stepUpdated', {data: this.form, isValid: !this.$v.$invalid})
      }
    }
};
</script>

<style scoped>
.time-picker {
  display: block;
}

label {
  margin-right: 1rem;
  padding-left: 0.5rem;
}

</style>
