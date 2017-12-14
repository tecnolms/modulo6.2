<template>
  <div id="pagination">
    <nav class="eco-pagination" role="navigation">
      <span class="current">
        {{ current }}
      </span>
      <span class="total">
        {{ total }}
      </span>
    </nav>
  </div>
</template>
<script>
export default {
  computed: {
    current() {
      return this.$store.getters.count;
    },
    total() {
      return this.$store.getters.total;
    }
  }
};
</script>
<style lang="sass">
  .eco-pagination
    text-align: center
    
    .current, .total
      color: #fff
      font-size: 1rem
      font-weight: 700
      font-family: "Ecopetrol"

    .current:after
      content: " / "
        
</style>

