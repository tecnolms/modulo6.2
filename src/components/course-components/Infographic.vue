<template>
  <div id="infographic" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b">{{title}}<span v-if="content.audio">
            <v-audio :audio="content.audio.src"></v-audio>
          </span></h1>
      </div>
    </div>
    <div class="content">
      <div class="container is-paddingless">
        <div class="columns">
          <div class="column">
            <p class="text" v-if="content.text" v-html="text"></p>
            <p class="instruction" v-if="content.instruction" v-html="content.instruction"></p>    
            <div class="has-text-centered">
              <!--<a class="magnifier-thumb-wrapper" :href="require('../../course/images/' + content.infopreview.src)">-->
                <img id="thumb" :src="require('../../course/images/' + content.infopreview.src)" :alt="content.infopreview.alt" :data-zoom="require('../../course/images/' + this.content.infopreview.src2x)">
                <!--p id="preview"></p-->
              <!--</a>-->
             <div>
               <a class="button is-primary is-large" :href="source" target="_blank">
                 <i class="mdi mdi-file-document mdi-24"></i>
                 <span>Descargar infográfico</span>
               </a>
             </div>
            </div>
          </div>
          <div class="column is-one-quarter">
            <img :src="require('../../course/images/' + content.graphic.src)" :alt="content.alt">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Drift from "drift-zoom";
import Audio from './subcomponents/Audio.vue'
export default {
  props: ["content"],
  computed: {
    title() {
      return this.content.title;
    },
    text() {
      return this.content.text;
    },
    btnGraphic() {
      return require("../../course/images/btnInfo.png");
    },
    source() {
      return require("../../course/pdf/" + this.content.pdf.src);
    },
    filename() {
      return this.content.pdf.filename;
    }
  },  
  mounted() {
    let img;
    img = document.getElementById("thumb");
    new Drift(img, {
      paneContainer: document.querySelector("#preview"),
      zoomFactor: 2
    });
  },components: {
            'v-audio': Audio
    }
   };
</script>