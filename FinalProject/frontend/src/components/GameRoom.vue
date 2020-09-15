<template>
<v-app>
<v-container fluid>
<v-layout column>
  <v-flex>
    <v-row>
      <v-app-bar app dark dense>
      <v-col cols="3">
        <h2> {{name}} 술모임 </h2>
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
        <v-col cols="4">
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
        <v-col cols="1" >
        <v-row>
        <v-img v-for="mem in members" :key="mem"
          alt="Home Logo"
          class="shrink mr-2"
          contain
          src="../assets/p1.png"
          transition="scale-transition"
          width="20"
        /> 
        </v-row>
      </v-col>
      </v-app-bar>
    </v-row>  
  </v-flex>
  <v-flex>
    <v-expansion-panels dense v-show="selectMode" justify="center" dark light focusable accordion>
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
      
    <v-flex xs8><router-view></router-view></v-flex><!-- game window-->
      
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
            selectMode : false,
            myMsg : "",
            allMsg:"",
            members :["toto","lolo"],
            isChatOn:true,
            isGameOn:false,
            //name:"",
            //id:""
        }
    },
     props: {
            name: {
                type: String,
                default : ''
            },
              id: {
                type: String,
                default : ''
            },
     },
    methods:{

        gameList(){
            this.selectMode = !this.selectMode;
        },
        startGame(i){
          this.$router.push({name:"game"+i, params:{mem:this.mem}});
          this.selectMode = !this.selectMode;
          this.isChatOn = false;
          this.isGameOn = true;
        },
        chatMode(){
          if(this.isGameOn){
            this.$router.go(-1);
            this.isGameOn = false;
            this.isChatOn = true;
          }
        },
        exitRoom(){
            alert("술모임에서 나갑니다.");
            this.$router.push({path:"/"});
        },
        send(){
            this.allMsg += "\n"+this.myMsg ;
            this.myMsg = "";
        }
    },

    /* mounted(){
      axios.get('http://localhost:3000/api/rooms'+ this.$route.params.id )
      .then((r) => {
        this.members = r.data.members
        console.log(r)
      })
      .catch((e) => {
        console.error(e.message)
      })
      //sessionStorage.setItem("wlanName", this.$route.params.wlanName)
      // axios -> update 멤버 숫자 늘림, socket등록
    } */
    
}

</script>
