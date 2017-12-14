<template>
  <div id="insoshot" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b">{{content.title}} <span v-if="content.audio">
            <v-audio :audio="content.audio.src"></v-audio>
          </span></h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <p v-html="content.text"></p> 
        <div class="instruction" v-html="content.instruction"></div>
        <div class="columns">
          <div class="column is-three-quarters">
            <div class="columns">
              <div class="column">
                <div :id="iconId" class="icon-to-show" v-if="iconShow" @click="showContent" :src="iconToShow" :alt="altIconToShow"></div>
              </div>
              <div class="column">
                <img :id="contentId" class="content-to-show" v-if="contentShow" :src="contentToShow" :alt="altContentToShow">
              </div>
            </div>
          </div>
          <div class="column is-hidden-touch">
            <img :src="src" :alt="content.graphic.alt">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Audio from './subcomponents/Audio.vue'
export default {
  props: ['content'],
  data () {
    return {
      iconId: 0,
      contentId: 0,
      contentShow: false,
      isFirstClick: false,
      iconShow: true
    }
  },
  computed: {
    src () {
      return require('../../course/images/' + this.content.graphic.src)
    },
    iconToShow () {
      return require('../../course/images/' + this.content.items[this.iconId].icon.src)
    },
    altIconToShow () {
      return this.content.items[this.iconId].icon.alt
    },
    contentToShow () {
      return require('../../course/images/' + this.content.items[this.contentId].content.src)
    },
    altContentToShow () {
      return this.content.items[this.contentId].content.alt
    }
  },
  
  methods: {
    showContent () {
      if(!this.contentShow) 
      {
        this.contentShow = true
        this.doTransition()
        this.iconId++
        this.isFirstClick = true
      } 
      else if(this.isFirstClick) 
      {
        this.contentId++
        this.doTransition()
        this.iconId++
        this.isFirstClick = false
      } 
      else if (this.content.items.length == (this.iconId + 1))
      {
        this.iconShow = false
        this.doTransition()
        this.contentId++
        this.$Notify.success("Bien hecho!")
      }
      else
      {
        this.doTransition()
        this.iconId++
        this.contentId++
      }
    },
    doTransition () {
      var icon = document.getElementById(this.iconId)
      var iconId = (this.iconId + 1) < this.content.items.length ? this.iconId + 1 : this.iconId - 1
      var path = require('../../course/images/' + this.content.items[iconId].icon.src)
      var path2 = path.substring(0, (path.length))
      icon.style.backgroundImage = "url('"+ path2 +"')"
      icon.style.transition = "background-image 0.5s cubic-beiser(1,0,.6,.49)"
    }
  },
  components: {
      'v-audio': Audio
    }
}
</script>
