<template>
  <section id="moduleContent" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b">
          {{ title }}
          <span v-if="content.audio">
            <v-audio :audio="content.audio.src"></v-audio>
          </span>
        </h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="text" v-html="text"></div>
        <div class="columns">
          <div class="column">
            <div class="blocks-container">
              <div class="block-line" v-for="(line, index) in content.items" :key="index">
                <span class="block animated bounceInLeft" :class="'animate-' + block.id" v-for="block in line" :key="block.id">
                  <img :src="require('../../course/images/' +  block.img.src)" :alt="block.img.alt">
                </span>
              </div>
              <div class="start animated bounceInLeft animate-6">
                <img :src="require('../../course/images/' + content.startButton.src)" :alt="content.startButton.alt">
              </div>
            </div>
          </div>
          <div class="column is-one-quarter-desktop has-text-centered">
            <img :src="img" :alt="alt">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import vAudio from "./subcomponents/Audio.vue";

export default {
  props: ["content"],
  computed: {
    title() {
      return this.content.title;
    },
    text() {
      return this.content.text;
    },
    img() {
      return require("../../course/images/" + this.content.img.src);
    },
    alt() {
      return this.content.img.alt;
    }
  },
  components: {
    "v-audio": vAudio
  }
};
</script>
