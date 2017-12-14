<template>
  <div class="tile is-parent" :key="item.id">
    <div :id="item.id" class="tile is-child">
        <img @click="icon = !icon" :src="src" :alt="item.icon.alt">
    </div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      icon: true
    };
  },
  computed: {
    src() {
      return this.icon
        ? require("../../course/images/" + this.item.icon.src)
        : require("../../course/images/" + this.item.content.src);
    }
  }
};
</script>