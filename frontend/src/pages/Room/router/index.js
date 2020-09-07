import Vue from "vue";
import VueRouter from "vue-router";
import RoomMenu from "../../../components/RoomMenu.vue"
import Game0 from "../../../components/GameComponents/Game0.vue"
import Game1 from "../../../components/GameComponents/Game1.vue"
import RoomChat from "../../../components/RoomChat.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "//:id?",
    name: "Room",
    props:true,
    components:{
      RoomMenu : RoomMenu,
      RoomChat : RoomChat,
      Game0 : Game0,
      Game1 : Game1
  }
}
];


const router = new VueRouter({
  //mode: "history", 
  base: process.env.BASE_URL,
  routes
});

export default router;
