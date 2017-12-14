import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Meta from "vue-meta";
import Content from "./components/Content.vue";
import Home from "./components/Home.vue";
import Finish from "./components/Finish.vue";
import store from "./store";
import AtUi from "at-ui";
import { Vue2Dragula } from "vue2-dragula";

Vue.use(AtUi);
Vue.use(Meta);
Vue.use(VueRouter);

Vue.use(Vue2Dragula);

const routes = [
  { path: "/", component: Home, alias: "/0" },
  { path: "/:id", component: Content, props: true }
];

var router = new VueRouter({
  routes
});

const app = new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount("#app");
