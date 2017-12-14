<template>
  <div id="canasta" class="component" v-if="show">
    <div class="title">
      <div class="container">
        <h1 class="eco b">
          {{content.title}}
          <span v-if="content.audio">
            <v-audio :audio="content.audio.src"></v-audio>
          </span>
        </h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <p class="text" v-html="content.text"></p>
        <div class="instruction" v-html="content.instruction"></div>
        <div class="columns">
          <div class="column drag-list" v-dragula="content.listOptions" service="canasta" drake="first">
            <div class="drag-header">
              <h3>{{content.listLabel}}</h3>
            </div>
            <div class="drag-item" :data-is-answer="item._isCorrect" v-for="item in content.listOptions" :key="item.id">{{item.label}}</div>
          </div>
          <div class="column drag-list" v-dragula="content.listAnswers" service="canasta" drake="first">
            <div class="drag-header">
              <img class="drag-header-img" :src="require('../../course/images/' + content.listImgToDrag)" alt="Canasta Para Arrastrar">
            </div>
            <div class="drag-item" v-for="item in content.listAnswers" :key="item.id">{{item.label}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vAudio from "./subcomponents/Audio.vue"

export default {
  props: ["content"],
  data() {
    return {
      answers: 0,
      show: true
    };
  },
  created() {
    console.log("GLOBAL SERVICE: created");

    this.$dragula.$service.options("first", {
      move: true,
      accepts: el => {
        return el.dataset.isAnswer == "true";
      }
    });

    this.$dragula.$service.eventBus.$on(
      "drop",
      ({ el, target, source, sibling }) => {
        el.classList.add("correct");
        this.answers++;
        this.answers == this.content.correctAnswers
          ? this.$Modal.success({
              title: "¡Buen trabajo!",
              content: "Has puesto todas las opciones correctamente"
            })
          : console.log("Opción incorrecta");
      }
    );
    console.log("GLOBAL SERVICE: ready");
  },
  components: 
  {
    "v-audio": vAudio
  }
};
</script>
