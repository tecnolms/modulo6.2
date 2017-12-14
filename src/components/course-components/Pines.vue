<template>
  <div id="pines" class="component">
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
        <div id="hotgraphic" class="hotgraphic-container">
          <img id="hotImg" :src="src" :data-width="width" :data-height="height" :alt="alt">
          <span :style="position(pin.id)" @click="showModal(pin.id)" v-for="pin in content.items" :key="pin.id" class="pin" :id="'pin-' + pin.id"><span>{{pin.id}}</span></span>
          <at-modal v-model="modal">
              <div slot="header" class="modal-header modal-header--green" >
              <span class="modal-id">
                {{itemToShow.id}}
              </span>
              <h4 class="modal-title">{{itemToShow.title}}</h4>
            </div>
            <div class="content" v-html="itemToShow.text"></div>
            <div slot="footer">
              <button class="is-success button" @click="confirmModal">OK</button>
            </div>
          </at-modal>
        </div>
        <div v-if="content.fuente | content.note" class="tags">
          <at-tooltip v-if="content.fuente" class="tag is-primary is-medium is-centered mt-3" placement="right" :content="content.fuente">Fuente</at-tooltip>
          <at-tooltip v-else placement="right">
            <span class="tag is-primary is-medium">
              <i class="mdi mdi-information-variant mdi-36"></i> Importante
            </span>
            <template slot="content">
              <p style="color: #fff" v-html="content.note"></p>
            </template>
          </at-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vAudio from './subcomponents/Audio.vue'
export default {
  props: ["content"],
  data() {
    return {
      width: 0,
      height: 0,
      itemToShow: {},
      modal: false
    };
  },
  computed: {
    src() {
      var img = new Image();
      img.src = require("../../course/images/" + this.content.hotgraphic.src);
      this.width = img.width;
      this.height = img.height;
      return img.src;
    },
    alt() {
      return this.content.hotgraphic.alt;
    }
  },
  methods: {
    showModal(id) {
      this.itemToShow = this.content.items[id - 1];
      this.modal = true;
    },
    confirmModal() {
      this.modal = false;
      var element = document.getElementById("pin-" + this.itemToShow.id);
      element.classList.add("seen");
      this.idToShow = 0;
    },
    position(id) {
      var x = this.content.items[id - 1].position.x;
      var y = this.content.items[id - 1].position.y;
      console.log(x + " -- " + y);
      var str = "top: " + x + "%; left: " + y + "%";
      return str;
    }
  },
  components: {
    "v-audio": vAudio
  }
};
</script>
