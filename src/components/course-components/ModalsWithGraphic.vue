<template>
  <div id="modals-with-graphic" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b"> {{content.title}} 

           <span v-if="content.audio">
            <v-audio :audio="content.audio.src"></v-audio>
          </span>
        </h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="columns">

          <div class="column" v-if="content.layout === 'full'">
            <!-- LAYOUT FULL -->
              <div v-html="content.text"></div>
              <p v-html="content.instruction" class="instruction"></p>

               <div v-if="content.graphic" class="bgmodalgraphics"><img :src="require('../../course/images/'+ content.graphic.src)"/></div>
              <div class="columns">

            

                 <div  @click="showModal(item.id)" class="column is-3 is-cursor has-text-centered margin-top" v-for="item in content.items" :key="item.id">
                  <img :src="require('../../course/images/' + item.img.src)" :alt="item.img.alt">
                </div>


              </div>
              <div v-if="content.tooltip" class="has-text-centered">
                <at-tooltip class="tag is-primary is-medium" :content="content.tooltip.text" placement="right">
                  <i class="mdi mdi-information-variant"></i>
                  {{content.tooltip.title}} 
                </at-tooltip>
              </div>
              <at-modal :class="{'modal-full': itemToShow.modal.layout === 'full'}" v-model="modal">
                <div slot="header" class="modal-header" >
                  <h4 class="modal-title">{{itemToShow.modal.title}}</h4>
                </div>
                <div class="columns" v-if="itemToShow.modal.layout === 'full'">
                  <div  class="column">
                    <img v-if="itemToShow.modal.img" :src="require('../../course/images/' + itemToShow.modal.img.src)" :alt="itemToShow.modal.img.alt">
                     <div v-if="itemToShow.modal.text" class="content column" v-html="itemToShow.modal.text"></div>
                  </div>
                </div>
                <div v-else class="columns">
                  <div  class="column is-one-quarter">
                    <img  :src="require('../../course/images/' + itemToShow.modal.img.src)" :alt="itemToShow.modal.img.alt">
                  </div>
                  <div class="content column" v-html="itemToShow.modal.text"></div>
                </div>
                <div slot="footer">
                  <button class="is-success button" @click="modal = !modal">OK</button>
                </div>
              </at-modal>
            <!-- //LAYOUT FULL -->
          </div>
          
          <div class="column" v-else-if="content.layout === 'right'">
            <!-- LAYOUT RIGHT -->
            <div v-html="content.text"></div>
            <p v-html="content.instruction" class="instruction"></p>
            <div class="columns">
              <div class="column ">
                <span :data-layout="content.layout" class="bgmodalgraphics right"><img :src="require('../../course/images/'+ content.graphic.src)"/></span>
              </div>
              <div class="column has-text-centered">

                <span v-if="content.items" @click="showModal(item.id)" class="is-cursor has-text-centered" v-for="item in content.items" :key="item.id">
                  <img :src="require('../../course/images/' + item.img.src)" :alt="item.img.alt">
                </span>
                <div class="">
                 <a v-for="item in links" class="" :href="require('../../course/pdf/' + item.src)" target="_blank">
                     <img :src="require('../../course/images/' + item.img)">
                 </a>
                </div>
              </div>
              
            </div>
            
            <div v-if="content.tooltip" class="has-text-centered">
              <at-tooltip class="tag is-primary is-medium" :content="content.tooltip.text" placement="right">
                <i class="mdi mdi-information-variant"></i>
                {{content.tooltip.title}} 
              </at-tooltip>
            </div>
            <at-modal :class="{'modal-full': itemToShow.modal.layout === 'full'}" v-model="modal">
              <div slot="header" class="modal-header" >
                <h4 class="modal-title">{{itemToShow.modal.title}}</h4>
              </div>
              <div class="columns" v-if="itemToShow.modal.layout === 'full'">
                <div  class="column">
                  <img :src="require('../../course/images/' + itemToShow.modal.img.src)" :alt="itemToShow.modal.img.alt">
                </div>
              </div>
              <div v-else class="columns">
                <div  class="column is-one-quarter">
                  <img :src="require('../../course/images/' + itemToShow.modal.img.src)" :alt="itemToShow.modal.img.alt">
                </div>
                <div class="content column" v-html="itemToShow.modal.text"></div>
              </div>
              <div slot="footer">
                <button class="is-success button" @click="modal = !modal">OK</button>
              </div>
            </at-modal>
            <!-- //LAYOUT RIGHT -->
          </div>

          <div class="column" v-else>
            <!-- LAYOUT LEFT -->
            <div class="columns is-multiline">
              <div class="column is-three-quarters">
                <div v-html="content.text"></div>
                <p v-html="content.instruction" class="instruction"></p>
                <div class="columns">
                 <a v-for="item in links" class="column has-text-centered" :href="require('../../course/pdf/' + item.src)" target="_blank">
                     <img :src="require('../../course/images/' + item.img)">
                 </a>
                </div>
                <div class="columns">
                
                  <span @click="showModal(item.id)" class="column is-cursor has-text-centered" v-for="item in content.items" :key="item.id">
                    <img :src="require('../../course/images/' + item.img.src)" :alt="item.img.alt">
                  </span>
                </div>
                <at-modal :class="{'modal-full': itemToShow.modal.layout === 'full'}" v-model="modal">
                <div slot="header" class="modal-header" >
                  <h4 class="modal-title">{{itemToShow.modal.title}}</h4>
                </div>
                <div class="columns" v-if="itemToShow.modal.layout === 'full'">
                  <div  class="column">
                    <img :src="require('../../course/images/' + itemToShow.modal.img.src)" :alt="itemToShow.modal.img.alt">
                  </div>
                </div>
                <div v-else class="columns">
                  <div v-if="itemToShow.modal.img" class="column is-one-quarter">
                    <img :src="require('../../course/images/' + itemToShow.modal.img.src)" :alt="itemToShow.modal.img.alt">
                  </div>
                  <div class="content column" v-html="itemToShow.modal.text"></div>
                </div>
                <div slot="footer">
                  <button class="is-success button" @click="modal = !modal">OK</button>
                </div>
              </at-modal>
                <div v-if="content.tooltip" class="tags has-text-centered">
                  <at-tooltip class="tag is-primary is-medium" :content="content.tooltip.text" placement="right">
                    <i class="mdi mdi-information-variant"></i>
                    {{content.tooltip.title}} 
                  </at-tooltip>
                </div>
              </div>
              <div class="column">
                <span :data-layout="content.layout" class="bgmodalgraphics left"><img :src="require('../../course/images/'+ content.graphic.src)"/></span>
              </div>
            </div>
            
            
            
            <!-- //LAYOUT LEFT -->
          </div>

        </div>
        
        
          
          
      </div>
    </div>
  </div>
</template>
<script>
import vAudio from "./subcomponents/Audio.vue";
export default {
  props: ["content"],
  data() {
    return {
      modal: false,
      itemToShow: {
        id: 0,
        img: {
          src: "slide60-1.png",
          alt: "Inyectar cuándo no hay diferencia de color"
        },
        modal: {
          title: "Inyectar cuándo no hay diferencia de color",
          text:
            "<h5>Se acostumbra inyectar dicho marcador cuando:</h5><ul><li>No hay diferencia de color entre los baches consecutivos que están unidos.</li><li>La diferencia de sus gravedades API es de 3º o menos.</li></ul><p>Algunos lugares prefieren que se inyecten marcadores aún si hay diferencias de color o de gravedad API entre los baches a separar.</p>",
          img: {
            src: "modalslide60-1.png",
            alt: "Inyectar cuándo no hay diferencia de color"
          }
        }
      }
    };
  },
  computed:{
     links(){
        return this.content.links;
     },
     full(){return this.content.full}
  },
  methods: {
    showModal(id) {
      this.itemToShow = this.content.items[id];
      this.modal = true;
    }
  },
   components: {
    "v-audio": vAudio
  }
};
</script>