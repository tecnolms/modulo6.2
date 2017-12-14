<template>
  <progress class="progress is-primary is-small" :value="progressCount" max="100">{{ progressCount }}%</progress>
</template>
<script>
export default {
  name: 'course-progress',
  computed: {
    progressCount () {
      return this.$store.getters.progress
    }
  }
}
</script>

