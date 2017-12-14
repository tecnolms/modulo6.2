<template>
  <div id="slider" class="component" :class="content.class">
    <div class="title">
      <div class="container">
        <h1 class="eco b"> {{ title }} <span v-if="content.audio">
            <v-audio :audio="content.audio.src"></v-audio>
          </span></h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <p v-if="content.text" class="text" v-html="content.text"></p>
        <div class="instruction mb-2" :class="content.class" v-if="content.instruction" v-html="content.instruction"></div>
        <carousel 
          :per-page="1" 
          :navigation-enabled="true"
          :navigation-next-label="'<i class=\'mdi mdi-chevron-right mdi-48\'></i>'"
          :navigation-prev-label="'<i class=\'mdi mdi-48 mdi-chevron-left\'></i>'"
          >
          <slide v-for="item in items" :key="item.id">
            
            <div  v-if = "item.layout != 'full'" class="columns">
              <div class="column">
                <figure class="image is-16by9">
                  <img :src="require('../../course/images/' + item.graphic.src)" :alt="item.graphic.alt">
                  
                </figure>
                <div v-if="item.source" class="tags">
                  <at-tooltip class="tag is-primary is-medium" placement="right">
                    Fuente
                    <template  slot="content">
                      <span v-html="item.graphic.source"></span>
                    </template>
                  </at-tooltip>
                </div>
              </div>
              <div class="column">
                <div class="content">
                  <h4> {{item.title}} </h4>
                  <p v-html="item.text">
                  </p>
                  <eco-button v-if="item._subtype == 'button'" :_items="item._items"></eco-button>
                </div>
              </div> 
            </div>
            <div v-else class= "columns">
              <div class="column">
                <figure class="full">
                  <img :src="require('../../course/images/' + item.graphic.src)" :alt="item.graphic.alt">
                  
                </figure>
                <div class="tags" v-if="item.graphic.source">
                  <at-tooltip class="tag is-primary is-medium" :content="item.graphic.source" placement="right">
                    Fuente
                  </at-tooltip>
                </div>
              </div>
            </div>

          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
import subcomponents from "./subcomponents";
import Audio from './subcomponents/Audio.vue';

export default {
  props: ["content"],
  computed: {
    title() {
      return this.content.title;
    },
    items() {
      return this.content.items;
    }
  },
  components: {
    Carousel,
    Slide,
    "eco-button": subcomponents.button,
    'v-audio': Audio
  }
};
</script>