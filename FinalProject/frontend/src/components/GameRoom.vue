<template>

<v-container fluid fill-height aacontaine>
<v-layout column>
  <v-flex>
    <v-row>
      <v-app-bar app dark dense>
      <v-col cols="3">
        <h2>{{roomName}}술모임 </h2>
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
        <v-col cols="2" v-for="(mem,index) in members" :key="index">
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
    <v-expansion-panels dense v-if="selectMode" justify="center" dark light focusable accordion><!--selectMode-->
      <v-expansion-panel v-for="(game,index) in gameIntro" :key="index">
        <v-expansion-panel-header>{{game.title}}</v-expansion-panel-header>
        <v-expansion-panel-content >
          <v-row>
          <v-col align-self="center" cols="10">
            <div><p>{{game.intro}}</p></div>
          </v-col>
          <v-col align-self="center" cols="2">
            <!--<router-link :to="{ path:'game'+i }" append> >game start</router-link>-->
            <v-btn v-on:click="startGame(index)">start</v-btn>
          </v-col>
        </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels> 
  </v-flex>
  <v-flex>
    <div>
    <v-layout row>
      
    <v-flex xs8><router-view 
                v-bind:gameData="gameData[selectedGame]" 
                v-bind:members="members"
                v-on:changeGames="ChangeGames"></router-view></v-flex><!-- game window-->
      
    <v-flex xs4>
       <v-layout column wrap>
            <v-flex>
                <v-card  class="mx-auto" min-height="440">
                채팅창
                {{ allMsg }}
                </v-card>
            </v-flex>
            <v-flex>
                <!-- <v-card class="mx-auto" min-height="100"></v-card> -->
                <v-btn block v-on:click="send" dense height="40" color="#F39C12" dark>message send</v-btn>
                <v-textarea type="text" v-model="myMsg" @keyup.enter.exact="send" outlined rows="2" min-height="80" row-height = "60"></v-textarea>  
            </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    </div>
  </v-flex>
  <v-flex></v-flex>
</v-layout>
</v-container>

</template>

<script>
import axios from 'axios'

export default {
  name: "Gameroom",
    data(){
        return{
            room:null,
            roomName:'',
            selectMode : false,
            myMsg : "",
            allMsg:"",
            gameIntro:[
              {title:"랜덤카드뽑기", intro:"셔플된 카드를 뽑습니다. 샷 카드가 나오면 원샷 당첨입니다."},
              //{title:"끝말 잇기", intro : "다 같이 끝말 잇기를 합니다. 진 사람이 원샷 당첨입니다."},
              //{title:"백종원 게임", intro: "음식 레시피를 말 해 보세요. 백종원 레시피에 포함된다면 원샷 당첨입니다."},
              //{title:"훈민정음 게임", intro : "test"}
            ],
            isGameOn:false,
            selectedGame:0,
        }
    },
     props: {
            id : {
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
        startGame(index){
          this.selectMode = false
          this.isGameOn = true,
          this.selectedGame=index
          console.log(this.members)
          this.$router.push({name:"game"+index})
        },
        chatMode(){
          this.selectMode = false;
          this.isGameOn = false;
          this.$router.push({name:"chat"});
        },
        exitRoom(){ 
            const memNum = this.room.mem.length
            const id = this.room._id
            const name = localStorage.getItem("nickname")
            if(memNum===1){
              alert("술모임방의 마지막 멤버입니다. 술모임방이 사라집니다.")
              axios.put('http://localhost:3000/api/rooms/deleteRoom',{
                id:id
              })
              .then(r=>{
                console.log("delete room") 
                localStorage.removeItem("nickname")
                this.$router.replace({path:"/"});
              })
              .catch(e=>{
                console.log("delete fail")
              })

            }
            else{
              alert("술모임에서 나갑니다.");
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
            }
        },
        send(){
          const msg = this.myMsg.trim()
        },
        ChangeGames:function(payload){
          this.$store.commit("ChangeGames",payload)
        }
    },
    mounted(){
      axios.get('http://localhost:3000/api/rooms/login/'+ this.$route.params.id )
      .then((r) => {
        this.room = r.data.room
        this.roomName = r.data.room.name
        this.$store.commit('ChangeMembers',r.data.room.mem)
        console.log(localStorage.getItem("nickname"))
      })
      .catch((e) => {
        console.error(e.message)
      })
      //sessionStorage.setItem("wlanName", this.$route.params.wlanName)
      // axios -> update 멤버 숫자 늘림, socket등록
    },
    computed : {
      members(){
        return this.$store.getters.getMembers;
      },
      gameData(){
        return this.$store.getters.getGames;
      }
      
    }
    
}

</script>
