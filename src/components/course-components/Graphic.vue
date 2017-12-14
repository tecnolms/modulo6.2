<template>
  <section id="graphic" class="component">
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
        <div v-if="content.layout == 'right'" class="columns">
          <div class="column">
            <p>
              <div v-html="text"></div>
            </p>
          </div>
          <div class="column">
            <img :src="img" :alt="alt" :title="title">
          </div>
        </div>
        <div class="columns" v-else-if="content.layout == 'full'">
          <div class="column has-text-centered">
             <p v-html="text" class="has-text-left">
            </p>
            <img :src="img" :alt="alt" :title="title">
            
          </div>
        </div>
        <div class="columns" v-else>
          <div class="column">
            <img :src="img" :alt="alt" :title="title">
            
          </div>
          <div class="column">
            <p>
              <div v-html="text"></div>
            </p>
          </div>
        </div>
        <div v-if="content.fuente" class="tags">
          <at-tooltip class="tag is-primary is-medium is-centered mt-3" placement="right" :content="content.fuente">Fuente</at-tooltip>
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
