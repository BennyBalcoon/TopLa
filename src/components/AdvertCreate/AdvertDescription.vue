<template>
  <form v-on:input="emitFormData" class="m-b-md">
    <div class="field">
      <label class="title is-5 m-b-sm">Titre de votre annonce</label>
      <input
        v-model="form.title"
        v-on:blur="$v.form.title.$touch()"
        class="input"
        type="text"
        placeholder="Table en bois"
      />
      <div v-if="$v.form.title.$error">
        <span v-if="!$v.form.title.required" class="help is-danger">Un titre est requis</span>
      </div>
    </div>
    <div class="field">
      <label class="title is-5">Description de votre annonce</label>
      <textarea
        v-model="form.description"
        v-on:blur="$v.form.description.$touch()"
        class="textarea"
        placeholder="Table en bois, 60 cm de large, à récupérer entre 12h et 16h"
        rows="10"
      ></textarea>
      <div v-if="$v.form.description.$error">
        <span v-if="!$v.form.description.required" class="help is-danger">Une description est requise</span>
      </div>
    </div>
    <!-- <div class="field">
      <label class="title is-5">Image</label>
      <input v-model="form.image" class="input" type="text" placeholder="Image URL" />
      <div v-if="$v.form.image.$error">
        <span v-if="!$v.form.image.required" class="help is-danger">Veuillez fournir au moins une photo</span>
      </div>
    </div> -->
    <div class="file has-name is-boxed">
      <label class="file-label">
        <input class="file-input" type="file" name="resume" />
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            Choose a file…
          </span>
        </span>
        <span class="file-name">
          Screen Shot 2017-07-29 at 15.54.25.png
        </span>
      </label>
    </div>
    <div>
      <h1 class="title is-5 m-b-sm">Dans quel état est votre objet ?</h1>
      <div class="control" v-on:change="emitFormData">
        <label class="radio" for="as_new">
          <input
            v-model="form.condition"
            v-on:blur="$v.form.condition.$touch()"
            type="radio"
            name="answer"
            id="as_new"
            value="comme neuf"
          />
          Comme neuf
        </label>
        <label class="radio" for="good">
          <input
            v-model="form.condition"
            v-on:blur="$v.form.condition.$touch()"
            type="radio"
            name="answer"
            id="good"
            value="bon état"
          />
          Bon état
        </label>
        <label class="radio" for="poor">
          <input
            v-model="form.condition"
            v-on:blur="$v.form.condition.$touch()"
            type="radio"
            name="answer"
            id="poor"
            value="état moyen"
          />
          Etat moyen
        </label>
        <label class="radio" for="to_fix_up">
          <input
            v-model="form.condition"
            v-on:blur="$v.form.condition.$touch()"
            type="radio"
            name="answer"
            id="to_fix_up"
            value="à retaper"
          />
          A retaper
        </label>
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
        title: null,
        description: null,
        image: null,
        condition: null,
      },
    };
  },
  validations: {
    form: {
      title: {
        required,
      },
      description: {
        required,
      },
      image: {
        required,
      },
      condition: {
        required,
      },
    },
  },
  computed: {
    states() {
      return this.$store.state.states.items;
    },
  },
  methods: {
    emitFormData() {
      this.$emit("stepUpdated", { data: this.form, isValid: !this.$v.$invalid });
    },
  },
};
</script>

<style scoped>
.control {
  display: flex;
  flex-direction: column;
}

.radio {
  margin-left: 0.5em;
}
</style>
