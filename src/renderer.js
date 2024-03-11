// import Vue from 'vue';
import { createApp } from 'vue';
import App from './App.vue';
import {createRouter, createWebHashHistory} from 'vue-router';
import Home from './pages/Home.vue';
import People from './pages/People.vue';
import Form from './pages/Form.vue';
import ShowPeople from './pages/ShowPeople.vue';
import AddInfo from './pages/AddWiadomosci.vue';
import ShowInfo from './pages/ShowInfo.vue';
import AddAudio from './pages/AddAudio.vue';
import ShowAudio from './pages/ShowAudio.vue';



// const routes = [
//   { path: '/', component: Home },
//   { path: '/test', component: Test},
// ]

const router = createRouter( {

   history: createWebHashHistory(),
   routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/ShowPeople', name: 'ShowPeople', component: ShowPeople},
    {path: '/form', name: 'Form', component: Form},
    {path: '/people', name: 'People', component: People},
    {path: '/addInfo', name: 'AddInfo', component: AddInfo},
    {path: '/ShowInfo', name: 'ShowInfo', component: ShowInfo},
    {path: '/AddAudio', name: 'AddAudio', component: AddAudio},
    {path: '/ShowAudio', name: 'ShowAudio', component: ShowAudio},
   ] 
 });

const app = createApp(App);
app.use(router);

app.mount('#app');

