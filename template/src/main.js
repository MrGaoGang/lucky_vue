import Vue from "vue";
import App from "./App.vue";
//为了兼容ie浏览器
import "babel-polyfill";
import store from "./store"
import "./plugins/iview.js";
import router from "./router/index";

import {
    currency
} from './currency'
Vue.filter('currency', currency);

new Vue({
    el: "#app",
    store,
    router,
    render: h => h(App)
});
