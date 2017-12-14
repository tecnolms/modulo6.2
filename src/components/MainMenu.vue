<template>
  <aside class="menu" id="mainMenu" @keyup.esc="closeMenu">
    <span class="close" @click="closeMenu">
      <i class="mdi mdi-close is-primary"></i>
    </span>
    <div class="eco-menu-title">
      {{course.title}}
    </div>
    <ul class="menu-list">
      <li class="eco-menu-item" :class="{first: item.id == '/'}" :key="item.id" v-for="item in components">
        <router-link :to="item._route + ''">
          <h4>
            {{item.title}}
            <span class="checked" :class="{'visible': viewed(item._route)}">
              <i class="mdi mdi-check mdi-24"></i>
            </span>
          </h4>
        </router-link>
      </li>
    </ul>
  </aside>
</template>
<script>
const components = require("../course/components");
const course = require("../course/course");
export default {
  computed: {
    components() {
      return components;
    },
    course() {
      return course;
    }
  },
  methods: {
    closeMenu: function() {
      document.getElementById("mainMenu").style.width = "0";
    },
    viewed(id) {
      return this.$store.getters.viewed[id - 1] == id;
    }
  },
  watch: {
    $route (to, from) {
      this.viewed(to.params.id)
    }
  }
};
</script>

