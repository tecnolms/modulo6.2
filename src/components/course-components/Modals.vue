<template>
  <div id="modals" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b">
          {{title}}
          <span v-if="content.audio">
            <v-audio :audio="content.audio.src"></v-audio>
          </span>
        </h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div v-if="content.text" class="text" v-html="content.text">
        </div>
        <div class="instruction" v-if="content.instruction" v-html="content.instruction"></div>
        <div class="columns">
          <div class="column is-three-quarters">
            <div class="modals-container  animated bounceInLeft">
              
              <div class="tile is-ancestor">
                <div class="tile is-4 is-vertical is-parent" v-for="(arr, value) in arrayOrganized" :key="value">
                  <div class="tile is-child box" v-for="item in arr" :key="item.id" :class="{'relleno': item.esRelleno}">
                    <div v-if="item.content === 'title'" class="modal-tile">
                      <span class="tile-id">
                        {{item.id}}
                      </span>
                      <h4 class="tile-title">{{item.title}}</h4>
                    </div>
                    <div v-else-if="item.content === 'icon'" class="modal-tile">
                      <span class="tile-id">
                        {{item.id}}
                      </span>
                      <h4 class="tile-title">
                        <img :src="require('../../course/images/' + item.icon.src)" :alt="item.icon.alt">
                        <span>{{item.title}}</span>
                      </h4>
                    </div>
                    <div v-else class="modal-tile">
                      <span class="tile-id">
                        {{item.id}}
                      </span>
                      <h4 class="tile-title">{{item.title}}</h4>
                    </div>
                    <span class="tile-to-see" :id="item.id">
                    </span>
                  </div>
                </div>
              </div>
              
            </div>
            <at-modal v-model="modal">
              <div slot="header" class="modal-header" >
                <span class="modal-id">
                  {{itemToShow.id}}
                </span>
                <h4 v-if="itemToShow.title" class="modal-title">{{itemToShow.title}}</h4>
              </div>
              <div class="content" v-html="itemToShow.text"></div>
              <div slot="footer">
                <button class="is-success button" @click="handleConfirm">OK</button>
              </div>
            </at-modal>
          </div>
          <div v-if="graphic" class="column">
            <img class=" animated bounceInRight" :src="graphic" :alt="alt">
          </div>
          <div v-else-if="content._example" class="column">
            <e-button :_items="item" ></e-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import eButton from "./subcomponents/Button.vue";
import vAudio from "./subcomponents/Audio.vue";

export default {
  props: ["content"],
  data() {
    return {
      modal: false,
      itemToShow: []
    };
  },
  computed: {
    title() {
      return this.content.title;
    },
    graphic() {
      try {
        return require("../../course/images/" + this.content.graphic.src);
      } catch (error) {
        console.log("Graphic not found");
        return false;
      }
    },
    alt() {
      return this.content.graphic.alt;
    },
    half() {
      return Math.ceil(this.content.items.length / 3);
    },
    secondhalf() {
      return this.half + this.half;
    },
    width() {
      return this.content._variant === "icons" ? "is-3c" : "is-6";
    },
    item() {
      if (this.content._example) {
        return this.content._example;
      } else {
        return "";
      }
    },
    arrayOrganized() {
      let arr = this.content.items;
      let tempArray = [];

      for (let i = 0; i < arr.length; i += 3) {
        tempArray.push(arr.slice(i, i + 3));
      }

      let last = tempArray[tempArray.length - 1];
      let lengthNormal = tempArray[0];

      if (last.length < lengthNormal.length) {
        let restante = lengthNormal.length - last.length;

        for (let i = 0; i < restante; i++) {
          last.push({
            id: i + 10,
            title: "relleno",
            text: "Relleno",
            esRelleno: true
          });
        }
      }

      tempArray[tempArray.length - 1] = last;

      console.log(tempArray);

      return tempArray;
    }
  },
  methods: {
    showModal(id) {
      this.itemToShow = this.content.items[id - 1];
      this.modal = true;
    },
    handleConfirm() {
      this.modal = false;
      var element = document.getElementById("" + this.itemToShow.id);
      element.classList.add("seen");
      this.idToShow = 0;
    }
  },
  components: {
    "e-button": eButton,
    "v-audio": vAudio
  }
};
</script>


