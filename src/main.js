import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router"
import SearchBar from './components/searchBar.vue';
import GotProblems from './components/gotProblems.vue';
import RepoDets from './components/repoDets.vue';
import VueApexCharts from 'vue3-apexcharts';

var routes = [
    { path: '/', component: SearchBar },
    { path: '/repository/:owner/:name', component: RepoDets },
    { path: '/repository/:owner/:name/issues', component: GotProblems }
]
var router = new createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);
//eslint-disable-next-line
app.component('apex-chart', VueApexCharts);
app.use(router).mount('#app');