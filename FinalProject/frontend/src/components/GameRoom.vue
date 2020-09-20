<template>
<v-app>
<v-container fluid>
<v-layout column>
  <v-flex>
    <v-row>
      <v-app-bar app dark dense>
      <v-col cols="3">
        <h2>{{room.name}}술모임 </h2>
      </v-col>
      <v-col cols="2" >
      <v-btn @click="chatMode" >
      <v-img
          alt="Home Logo"
          class="shrink mr-2"
          contain
          src="../assets/chat.png"
          transition="scale-transition"
          width="30"
        /> 
        <span class="mr-1">채팅모드</span>
      </v-btn>
        </v-col>
         <v-col cols="2">
      <v-btn @click="gameList" >
          <v-img
          alt="Home Logo"
          class="shrink mr-2"
          contain
          src="../assets/gambling.png"
          transition="scale-transition"
          width="30"
        /> 
        <span class="mr-1">게임모드</span>
      </v-btn>
         </v-col>
        <v-col cols="2">
      <v-btn @click="exitRoom" >
                  <v-img
          alt="Home Logo"
          class="shrink mr-2"
          contain
          src="../assets/exit.png"
          transition="scale-transition"
          width="30"
        /> 
        <span class="mr-1">나가기</span>
      </v-btn>
      </v-col>
      <v-col cols="3">
        <v-row >
        <v-col cols="2" v-for="mem in members" :key="mem">
        <br/>
        <v-img alt="Home Logo" class="shrink mr-2" contain src="../assets/p1.png" transition="scale-transition" width="40"/> 
        <p :style="{'font-size':'15px'}">{{mem}}</p> 
        </v-col>
        </v-row>
      </v-col>
      </v-app-bar>
    </v-row>  
  </v-flex>
  <v-flex>
    <v-expansion-panels dense v-if="selectMode" justify="center" dark light focusable accordion>
      <v-expansion-panel v-for="(item,i) in 5" :key="i">
        <v-expansion-panel-header>Item</v-expansion-panel-header>
        <v-expansion-panel-content >
          <v-row>
          <v-col align-self="center" cols="10">
            <div><p>게임 설명</p></div>
          </v-col>
          <v-col align-self="center" cols="2">
            <!--<router-link :to="{ path:'game'+i }" append> >game start</router-link>-->
            <v-btn v-on:click="startGame(i)">start</v-btn>
          </v-col>
        </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels> 
  </v-flex>
  <v-flex>
    <div>
    <v-layout row>
      
    <v-flex xs8><router-view v-bind="members"></router-view></v-flex><!-- game window-->
      
    <v-flex xs4>
       <v-layout column>
            <v-flex>
                <v-card  class="mx-auto" min-height="600">
                채팅창
                {{ allMsg }}
                </v-card>
            </v-flex>
            <v-flex>
                <v-card class="mx-auto" min-height="100">
                <v-btn block v-on:click="send" dense height="40" color="#F39C12" dark>message send</v-btn>
                <v-textarea type="text" v-model="myMsg" @keyup.enter.exact="send" outlined rows="2" min-height="60" row-height = "60"></v-textarea>
                </v-card>
            </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    </div>
  </v-flex>
  <v-flex></v-flex>
</v-layout>
</v-container>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: "GameRoom",
    data(){
        return{
            room:undefined,
            selectMode : false,
            myMsg : "",
            allMsg:"",
            members :[],
            isChatOn:true,
            isGameOn:false,
            //name:"",
            //id:""
        }
    },
     props: {
              id: {
                type: String,
                default : ''
            },
            nickname :{
              type: String,
              default :''
            }
     },
    methods:{

        gameList(){
            this.selectMode = !this.selectMode;
        },
        startGame(i){
          this.selectMode = false;
          this.isChatOn = false;
          this.isGameOn = true;
          this.$router.push({name:"game"+i});
        },
        chatMode(){
          if(this.isGameOn){
            this.isGameOn=false;
            this.isChatOn=true;
            this.$router.go(-1);
          }
        },
        exitRoom(){
            alert("술모임에서 나갑니다.");
            const id = this.room._id
            const name = localStorage.getItem("nickname")
            axios.put('http://localhost:3000/api/rooms/deleteOne',{
              id : id, nickname : name
             })
             .then(r=>{
               console.log(r)
               localStorage.removeItem("nickname")
               this.$router.replace({path:"/"});

               })
              .catch(e=>{
               console.log(e)
                })
        },
        send(){
            this.allMsg += "\n"+this.myMsg ;
            this.myMsg = "";
        }
    },

    mounted(){
      axios.get('http://localhost:3000/api/rooms/login/'+ this.$route.params.id )
      .then((r) => {
        this.room = r.data.room
        this.members = r.data.room.mem
      })
      .catch((e) => {
        console.error(e.message)
      })
      //sessionStorage.setItem("wlanName", this.$route.params.wlanName)
      // axios -> update 멤버 숫자 늘림, socket등록
    }
    
}

</script>
