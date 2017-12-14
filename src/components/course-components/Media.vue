<template>
  <div id="media" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b">{{title}}</h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        
        <video-player v-if="video" :options="playerOptions">

        </video-player>
        <at-alert v-else message="Video no encotrado" :description="'El video ' + content.video.sources[0].src + ' no se ha encotrado. Por favor verifica el nombre o la dirección del vído'" type="error" show-icon>

        </at-alert>
        <div v-if="content.fuente" class="tags">
          <at-tooltip placement="right">
            <span class="tag is-primary is-medium">
              Fuente
            </span>
            <template slot="content">
              <p style="color: #fff" v-html="content.fuente"></p>
            </template>
          </at-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";

export default {
  props: ["content"],
  computed: {
    title() {
      return this.content.title;
    },
    text() {
      return this.content.text;
    },
    video() {
      try {
        var arr = [
          {
            src: require("../../course/video/" +
              this.content.video.sources[0].src),
            type: this.content.video.sources[0].type
          }
        ];
        return arr;
      } catch (e) {
        console.log("Video not found: " + this.content.video.sources[0].src );
      }
      return "";
    },
    playerOptions() {
      return {
        muted: false,
        sources: [
          {
            type: this.video[0].type,
            src: this.video[0].src
          }
        ],
        poster: require("../../course/video/" +
          this.content.video.options.poster),
        controlBar: {
          currentTimeDisplay: true,
          durationDisplay: true
        },
        playbackRates: [1.0, 1.5, 2.0],
        autoplay: true
      };
    }
  },
  components: {
    "video-player": videoPlayer
  }
};
</script>
<style>
@import "~video.js/dist/video-js.css";
</style>
