<template>
  <div id="trueorfalse" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b">{{content.title}}</h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="columns">
          <div class="column is-three-quarters">
            <p class="text" v-if="content.text" v-html="content.text"></p>
            <p class="instruction" v-if="content.instruction" v-html="content.instruction"></p>
            <p class="question has-text-centered">
              {{content.question}}
            </p>
            <div class="columns is-centered mt-1">
              <div class="column is-4 has-text-centered">
                <a @click="handleOptions" :data-answer="content.options[0].shouldBeSelected" class="button is-large is-rounded is-primary">
                  {{content.options[0].text}}
                </a>
              </div>
              <div class="column is-4 has-text-centered">
                <a @click="handleOptions" :data-answer="content.options[1].shouldBeSelected" class="button is-large is-rounded is-danger">
                  {{content.options[1].text}}
                </a>
              </div>              
            </div>
            <at-modal v-model="showModal" type="succes" class="modal-answer">
              <div v-if="right" class="modal-answer-inner">
                <div class="modal-answer-img">
                  <img :src="require('../../assets/sass/img/rightAns.png')" alt="Correcto">
                </div>
                <div class="modal-answer-text">
                  <h3 class="eco b">¡Correcto!</h3>
                  <p class="content" v-html="content.feedbackTrue">
                  </p>
                </div>
              </div>
              <div v-else class="modal-answer-inner">
                <div class="modal-answer-img">
                  <img :src="require('../../assets/sass/img/wrongAns.png')" alt="Correcto">
                </div>
                <div class="modal-answer-text">
                  <h3 class="eco b has-color-red">¡No es correcto!</h3>
                </div>
              </div>
            </at-modal>
          </div>
          <div class="column has-text-centered">
            <img :src="require('../../course/images/' + content.graphic.src)" :alt="content.graphic.alt">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["content"],
  data() {
    return {
      showModal: false,
      right: false
    };
  },
  methods: {
    handleOptions(evt) {
      if (evt.target.dataset.answer === "true") {
        (this.showModal = true), (this.right = true);
      } else {
        (this.showModal = true), (this.right = false);
      }
      console.log(evt);
    }
  },
  mounted() {}
};
</script>