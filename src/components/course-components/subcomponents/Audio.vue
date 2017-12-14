<template>

  <span class="title-audio" v-if="audiosrc">
    <audio id="audio" :src="audiosrc" :autoplay="autoplay">
    </audio>
    <a @click="play" class="button is-primary is-small">
      <i class="mdi mdi-volume-high mdi-18">
      </i>
    </a>
  </span>

</template>

<script>
export default {
  props: ["audio"],
  data() {
    return {
      autoplay: true
    };
  },
  computed: {
    audiosrc() {
      try {
        return require("../../../course/audio/" + this.audio);
      } catch (error) {
        console.log("Audio not found: " + this.audio);
      }
      return "";
    }
  },
  methods: {
    play() {
      var element = document.getElementById("audio");
      element.paused ? element.play() : element.pause();
    }
  }
};
</script>
<style>
.title-audio {
  margin-left: 1rem;
  position: absolute;
  bottom: 0;
  margin-bottom: -5px;
  margin-top: -10px;
}

.title-audio .button {
  border-radius: 50%;
  padding: 1rem 0.5rem;
}
</style>


