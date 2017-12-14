<template>
  <div id="flipper" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b">
          {{ title }}
          <span class="subtitle"> {{content.subtitle}} </span>
          <span v-if="content.audio">
            <v-audio :audio="content.audio.src"></v-audio>
          </span>
        </h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="text" v-html="text"></div>
        <p class="instruction" v-html="instruction"></p>
        <div class="flippers" style="column-count: 2;">
          <flipper-content v-for="item in items" :key="item.id" :item="item">
            
          </flipper-content>
        </div>
        <div class="text" v-html="subtext"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import FlipperContent from './FlipperContent.vue'
  import Audio from './subcomponents/Audio.vue'

  export default {
    props: [
      'content'
    ],
    computed: {
      title () {
        return this.content.title
      },
      text () {
        return this.content.text
      },
      instruction () {
        return this.content.instruction
      },
      subtext () {
        return this.content.subtext
      },
      items () {
        return this.content.items
      }
    },
    components: {
      'flipper-content': FlipperContent,
      'v-audio': Audio
    }
  }  
</script>