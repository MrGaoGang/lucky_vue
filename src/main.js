import Vue from "vue";
import App from "./App.vue";
import "./plugins/iview.js";
//为了兼容ie浏览器
import "babel-polyfill";
new Vue({
    el: "#app",
    render: h => h(App)
})
