import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router"
import SearchBar from './components/searchBar.vue';
import GotProblems from './components/gotProblems.vue';
import RepoDets from './components/repoDets.vue';

var routes = [
    { path: '/', component: SearchBar },
    { path: '/repository/:owner/:name', component: RepoDets },
    { path: '/repository/:owner/:name/issues', component: GotProblems },
]
var router = new createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);
app.use(router).mount('#app');