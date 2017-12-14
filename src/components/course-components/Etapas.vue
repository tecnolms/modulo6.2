<template>
  <div id="etapas" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b">{{content.title}}</h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <p class="text" v-html="content.text"></p>
        <div class="instruction" v-html="content.instruction"></div>
        <div :data-length="getLength" class="stages-container">
          <span :id="etapa.id" class="stage animated slideInLeft" :class="{'current': etapa.current}" :data-position="etapa.id" v-for="etapa in content.etapas" :key="etapa.id" >
            <img 
              :src="require('../../course/images/' + etapa.img.src)" 
              :alt="etapa.img.alt"
              
              @click="goToNext(etapa.id)" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["content"],
  data() {
    return {
      length: 0
    };
  },
  computed: {
    getLength() {
      this.length = this.content.etapas.length;
      return this.length;
    }
  },
  methods: {
    goToNext(id) {
      var next;
      if (id < this.length - 1) {
        next = document.getElementById(id + 1);
        next.classList.add("current");
      } else if (id == this.length - 1) {
        this.$Notify.success("Bien hecho!");
        next = document.getElementById(id + 1);
        next.classList.add("current");
      }
      document.getElementById(id).classList.add("not-cursor")
    }
  }
};
</script>

