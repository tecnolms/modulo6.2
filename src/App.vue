<template>
  <div id="app">
    <nav class="navbar eco-navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item eco-logo">
          </router-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <div id="course-progress">
                <progress-bar></progress-bar>
              </div>
              <div class="navbar-burger burger align-self-center is-flex-fullhd" v-on:click="showMenu" data-target="menuCurso">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <main-menu></main-menu>
            </div>            
          </div>
          
        </div>
      </div>
    </nav>
    <router-view ></router-view>
    <footer class="footer is-primary">
      <div class="columns is-mobile">
        <div class="column has-text-centered">
          <a @click="prevSlide" :disabled="isFirst" class="button is-primary is-inverted is-outlined is-small">
            <i class="mdi mdi-chevron-up mdi-36"></i>
          </a>
        </div>
        <div class="column has-text-centered">
          <pagination></pagination>
        </div>
        <div class="column has-text-centered">
          <a @click="nextSlide" :disabled="isLast" class="button is-primary is-inverted is-outlined is-small">
            <i class="mdi mdi-chevron-down mdi-36"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import ProgressBar from "./components/ProgressBar.vue";
import MainMenu from "./components/MainMenu.vue";
import Pagination from "./components/Pagination.vue";
import content from "./course/course.json";
import pipwerks from "./scorm";

let scorm = pipwerks.SCORM;

export default {
  name: "app",
  components: {
    "progress-bar": ProgressBar,
    "main-menu": MainMenu,
    pagination: Pagination
  },
  metaInfo: {
    titleTemplate() {
      return content.title + " | Ecopetrol";
    },
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }
    ],
    htmlAttrs: {
      lang: "es-CO"
    },
    link: [
      {
        rel: "shortcut icon",
        href: require("./assets/sass/img/favicon.ico"),
        type: "image/x-icon"
      }
    ]
  },
  methods: {
    showMenu: function() {
      document.getElementById("mainMenu").style.width = "350px";
    },
    nextSlide() {
      this.$router.push({ path: this.$store.getters.nextSlide });
      this.$store.dispatch("increment");
      this.$store.dispatch("updateViewed", this.$store.getters.count);
      this.updateScorm();
    },
    prevSlide() {
      this.$router.push({ path: this.$store.getters.prevSlide });
      this.$store.dispatch("decrement");
    },
    updateScorm() {
      try {
        scorm.set("cmi.core.lesson_location", "" + this.$store.getters.count);
        scorm.set("cmi.core.status", "incomplete");
        scorm.set("cmi.core.score", "" + this.$store.getters.progress);
        scorm.save();
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    isFirst() {
      return this.$store.getters.count == 0;
    },
    isLast() {
      return this.$store.getters.count == this.$store.getters.total;
    }
  },
  mounted() {
    var slide = this.$route.params.id;
    if (slide) {
      this.$store.commit("updateState", slide);
      this.$store.commit("updateViewed", slide);
    }
  },
  watch: {
    $route(to, from) {
      to.params.id == 0
        ? this.$store.commit("updateState", 0)
        : this.$store.dispatch("updateState", to.params.id);
      this.updateScorm();
      this.$store.commit("updateViewed", this.$store.getters.count);
    }
  },
  created() {
    try {
      // Inicializo el SCORM y Verifico que si haya conexión
      if (scorm.init()) {
        // Si está completado o no
        status = scorm.get("cmi.core.lesson_status");
        consle.log("Estatus del curso: " + status);

        // Averigua la ubicación del usuario
        var route = "" + scorm.get("cmi.core.lesson_location");
        consle.log("Redirigiendo a: " + route);

        this.$router.push({ path: route });
      } else {
        log("No estás conectado a un LMS");
      }

      window.onbeforeunload = unloadHandler();
      window.onunload = unloadHandler();
    } catch (error) {
      log(error);
    }
  }
};

function unloadHandler() {
  scorm.save(); //save all data that has already been sent
  scorm.set("cmi.core.exit", "suspend");
  scorm.quit();
}

function log(log) {
  console.log(log);
}
</script>