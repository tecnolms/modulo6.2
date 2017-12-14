<template>
  <transition enter-active-class="animated slideInDown" leave-to-class="amimated fadeOut">
    <div class="eco-content">
      <transition enter-active-class="animated slideInDown" leave-to-class="amimated fadeOut">
        <component :is="view" :content="content"></component>
      </transition>
    </div>
  </transition>
</template>

<script>
import courseComponents from "./course-components";
var components = require("../course/components");
import finish from "./Finish.vue";

export default {
  props: ["id"],
  computed: {
    view() {
      var index = components.findIndex(function(el) {
        return el._route == this.id;
      }, this);

      return components[index].type;
    },
    content() {
      var index = components.findIndex(function(el) {
        return el._route == this.id;
      }, this);

      return components[index];
    }
  },
  components: {
    graphic: courseComponents.graphic,
    collapse: courseComponents.collapse,
    slider: courseComponents.slider,
    flipper: courseComponents.flipper,
    media: courseComponents.media,
    infographic: courseComponents.infographic,
    matching: courseComponents.matching,
    modals: courseComponents.modals,
    "so-in-shot": courseComponents.insoshot,
    "modals-with-graphic": courseComponents.modalsWithGraphic,
    canasta: courseComponents.canasta,
    pines: courseComponents.pines,
    etapas: courseComponents.etapas,
    resumen: courseComponents.resumen,
    "module-content": courseComponents.moduleContent,
    finish,
    mcq: courseComponents.mcq,
    "true-or-false": courseComponents.trueorfalse
  }
};
</script>
