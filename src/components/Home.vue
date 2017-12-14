<template>
  <transition enter-active-class="animated fadeIn">
    <div class="eco-content">
      <section class="hero mt-2 mb-2 is-primary is-small">
        <div class="hero-body">
          <div class="eco-logo-hero">
            <img :src="graphic" :alt="title">
          </div>
        </div>
      </section>
      <section class="hero is-small">
        <div class="hero-body">
          <div class="container">
            <h3 class="course-type"> <span></span> {{ type }} {{numberModulo}} </h3>
            <h1 class="eco is-x-large">{{ title }}</h1>
          </div>
        </div>
      </section>
      <section class="hero is-small is-welcome">
        <div class="hero-body">
          <div class="container">
            <h1>
              ¡Bienvenido!
              <span v-if="audio">
                <v-audio :audio="audio"></v-audio>
              </span>
            </h1>
          </div>
          <img class="img-float-right is-hidden-touch" :src="require('../course/images/welcome.png')" alt="Bienvenido">
        </div>
      </section>
    </div>
  </transition>
</template>

<script>
const course = require("../course/course");
var trans = require("../course/translations");
import vAudio from "./course-components/subcomponents/Audio.vue";

export default {
  computed: {
    title() {
      return course.title;
    },
    type() {
      return course.type == "module"
        ? trans.courseType.module
        : trans.courseType.other;
    },
    graphic() {
      return require("../course/images/" + course.graphic);
    },
    audio() {
      return course.audio.src;
    },
    numberModulo() {
      return course.id.slice(2);
    }
  },
  components: {
    "v-audio": vAudio
  },
  mounted() {
    this.$store.commit("updateState", 0);
  }
};
</script>