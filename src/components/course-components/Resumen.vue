<template>
  <div id="resumen" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b">{{content.title}}</h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <p class="text" v-html="content.text"></p>
        <div class="instruction" v-if="content.instruction" v-html="content.instruction">
        </div>
        <div class="columns">
          <div class="column is-three-quarters">
            <div class="resumen-container">
              <div class="resumen-container-inner">
                <div class="resumen" v-for="item in content.items" :key="item.id">
                  <span>
                    <span class="id">
                      <i class="mdi mdi-check mdi-36"></i>
                    </span>
                  </span>
                  <p v-html="item.text"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <img :src="require('../../course/images/' + content.graphic.src)" :alt="content.graphic.alt">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["content"]
};
</script>
