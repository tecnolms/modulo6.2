<template>
  <div id="subButton">
    <span class="eco-button" v-for="item in _items" :key="item._id" v-if="item._type == 'popup'">
      <span @click="modalShow(item)" class="button is-medium">
        <span class="icon is-medium">
          <i class="mdi mdi-information"></i>
        </span>
        <span>
          {{item._title}}
        </span>
      </span>
    </span>
    <span v-else class="eco-button">
      <a :href="require('../../../course/pdf/' + item.resource.src)" target="_blank" class="button is-medium">
        <span class="icon is-medium"><i class="mdi mdi-file-pdf"></i></span>
        <span>
          {{item._title}}
        </span>
      </a>
    </span>
  </div>
</template>
<script>
export default {
  props: ["_items"],
  methods: {
    modalShow(item) {
      this.$Modal.info({
        title: item._title,
        content: item._text
      });
    }
  }
};
</script>
<style scoped>
.eco-button:last-of-type {
  margin-right: 0;
}
.eco-button {
  margin: 3rem 1rem 1rem 0;
}

.eco-button .button {
  background-color: #1aa38f;
  color: white;
  border-color: #1aa38f;
}
</style>

