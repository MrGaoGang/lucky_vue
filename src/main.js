import Vue from "vue";
import App from "./App.vue";
//为了兼容ie浏览器
import "babel-polyfill";
import store from "./store"
import "./plugins/iview.js";

import { currency } from './currency'
Vue.filter('currency', currency)

new Vue({
    el: "#app",
    store,
    render: h => h(App)
})
