<template>
  <div id="collapse" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b"> {{ title }} </h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="text" v-html="text"></div>
        <p class="instruction" v-html="instruction"></p>
        <at-collapse accordion :value="-1" @on-change="changeState" class="mb-footer">
          <at-collapse-item v-for="item in items" :key="item.id" >
            <div slot="title">
              <h4>
                {{ item.title }}
              </h4>
            </div>
            <p>
              {{ item.text }}
            </p>
          </at-collapse-item>
        </at-collapse>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['content'],
  data () {
    return {
      checked: false
    }
  },
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
    items () {
      return this.content.items
    },
    checkit: {
      get () {
        return this.checked
      },
      set (value) {
        this.checked = value
      }
    }

  },
  methods: {
    changeState (el) {
      this.checkit = true
    }
  }
  
}
</script>
