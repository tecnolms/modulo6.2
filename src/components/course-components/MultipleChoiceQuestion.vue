<template>
  <div id="mcq" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b">{{content.title}} <span v-if="content.audio">
            <v-audio :audio="content.audio.src"></v-audio>
          </span></h1>
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
            <div class="opt-container has-text-centered">
              <ul class="list">
                <li class="list__item" v-for="item in content.options" :key="item.id">
                  <input @click="enableButton" :data-answer="item.shouldBeSelected" type="radio" name="choice" :id="'opt-' + item.id" class="radio-btn">
                  <label :for="'opt-'+ item.id" class="label">{{ item.text }}</label>
                  <div class="check"></div>
                </li>
              </ul>
              <button @click="handleConfirm" disabled class="button is-primary is-large is-rounded" type="submit">{{content.txtButton}}</button>
              <at-modal v-model="showModal" type="succes" class="modal-answer">
                <div v-if="right" class="modal-answer-inner">
                  <div class="modal-answer-img">
                    <img :src="require('../../assets/sass/img/rightAns.png')" alt="Correcto">
                  </div>
                  <div class="modal-answer-text">
                    <h3 class="eco b">¡Correcto!</h3>
                    <p class="content">
                      {{content.feedbackTrue}}
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
import Audio from './subcomponents/Audio.vue'
export default {
  props: ["content"],
  data() {
    return {
      showModal: false,
      right: false
    };
  },
  methods: {
    handleConfirm(evt) {
      let answers = document.querySelectorAll("input[type='radio']");
      answers.forEach(element => {
        if (element.checked)
          if (element.dataset.answer === "true") {
            this.right = true;
            this.showModal = true;
          } else {
            this.right = false;
            this.showModal = true;
          }
      });

      console.log(answers);
    },
    enableButton() {
      let btn = document.querySelector("button[type='submit']");
      btn.disabled = false;
    }
  },
   components: {
      
      'v-audio': Audio
    }
};
</script>

