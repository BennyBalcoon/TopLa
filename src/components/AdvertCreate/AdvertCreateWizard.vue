<template>
  <div class="advert-create-form">
    <div class="current-step is-pulled-right">{{ currentStep }} of {{ allStepsCount }}</div>
    <!-- Form Steps -->
    <keep-alive>
      <component v-bind:is="currentComponent"
                 v-on:stepUpdated="mergeStepData" 
                 ref="currentComponent" />
    </keep-alive>

    <progress class="progress is-primary" :value="currentProgress" max="100">{{ currentProgress }}</progress>
    <div class="controll-btns m-b-md">
      <button v-if="currentStep !== 1" v-on:click="moveToPreviousStep" class="button is-primary m-r-sm">Précédent</button>
      <button v-if="currentStep !== allStepsCount" 
              v-on:click="moveToNextStep"
              v-bind:disabled="!canProceed"
              class="button is-primary">Suivant</button>
      <button v-else
              v-on:click="emitAdvertConfirm"
              v-bind:disabled="!canProceed"
              class="button is-primary">Confirmer</button>
    </div>
    <!-- Just To See Data in the Form -->
    <!-- <pre><code>{{form}}</code></pre> -->
  </div>
</template>

<script>
import AdvertDetail from "./AdvertDetail";
import AdvertDescription from "./AdvertDescription";
import AdvertLocation from "./AdvertLocation";
export default {
  components: {
    AdvertDetail,
    AdvertDescription,
    AdvertLocation,
  },
  data() {
    return {
      currentStep: 1,
      canProceed: false,
      formSteps: ['AdvertDetail', 'AdvertDescription', 'AdvertLocation'],
      form: {
        kind: null,
        category: null,
        title: null,
        description: null,
        image: null,
        condition: null,
        location: null,
      },
    };
  },
  computed: {
    allStepsCount() {
      return this.formSteps.length
    },
    currentProgress() {
      return (100 / this.allStepsCount) * this.currentStep;
    },
    currentComponent() {
      return this.formSteps[this.currentStep - 1]
    }
  },
  methods: {
    mergeStepData(step) {
      this.form = { ...this.form, ...step.data };
      this.canProceed = step.isValid
    },
    moveToNextStep() {
      this.currentStep++;

      this.$nextTick(() => {
        this.canProceed = !this.$refs['currentComponent'].$v.$invalid
      })
    },
    moveToPreviousStep() {
      this.currentStep--;
      this.canProceed = true
    },
    emitAdvertConfirm() {
      this.$emit('advertConfirmed', this.form)
    }
  },
};
</script>

<style scoped>
.advert-create-form {
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 840px;
  padding: 24px 16px 8px;
  width: 100%;
}

.button {
  margin-right: 1rem;
}

.progress {
  margin-top: 1rem;
}
</style>
