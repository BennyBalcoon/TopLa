<template>
  <div class="container">
    <div class="address">
      <p class="is-5 m-b-sm" for="address">Saisir une adresse</p>
      <input type="text" name="address" id="address" />
    </div>
    <hr>
    <div class="field">
      <p class="is-5 m-b-sm">Catégories</p>
      <div class="m-b-lg">
        <div class="select">
          <select>
            <option v-for="category in categories"
                    :value="category.id"
                    :key="category.id">{{category.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <hr>
    <div>
      <p class="is-5 m-b-sm">Etat de l'objet</p>
      <div class="control">
        <label class="radio" for="as_new">
          <input type="radio" name="answer" id="as_new" value="comme neuf" />
          Comme neuf
        </label>
        <label class="radio" for="good">
          <input type="radio" name="answer" id="good" value="bon état" />
          Bon état
        </label>
        <label class="radio" for="poor">
          <input type="radio" name="answer" id="poor" value="état moyen" />
          Etat moyen
        </label>
        <label class="radio" for="to_fix_up">
          <input type="radio" name="answer" id="to_fix_up" value="à retaper" />
          A retaper
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    computed: {
    categories() {
      return this.$store.state.categories.items
    }
  }
};
</script>

<style scoped>
hr {
    border-top: 3px double #f3628d;
}

.container {
    padding: 30px 16px 100px;
    margin: 0;
    border: 0;
    vertical-align: baseline;
    float: left;
}

.address {
    display: flex;
    flex-direction: column;
    padding-bottom: 4px;
    /* padding: 0; */
    border: 0;
}

.control {
    display: flex;
    flex-direction: column
}

.radio {
    margin: 0 10px;
    padding: 0 5px;
}

#address {
    width: 150px;
}

input[type="radio"] {
    margin-right: 5px;
}

p {
    margin-bottom: 0.5rem
}


</style>
