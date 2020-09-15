<template>
<v-app>
  <v-main>
<v-container fluid>
<v-layout column>
  <v-flex>
  <v-app-bar app dark dense>
    <v-row>
      <v-col>
        <v-img
          alt="Home Logo"
          class="shrink mr-2"
          contain
          src="../assets/gambling.png"
          transition="scale-transition"
          width="40"
        /> 
      </v-col>
      <v-col>
        <h2> {{this.$route.params.id}} 술모임 </h2>
      </v-col>
    </v-row>
<v-spacer></v-spacer>
      <v-row justify="center">
      <v-col>
      <v-btn v-on:click="chatMode" >
        <span class="mr-1">채팅모드</span>
        <v-icon large >chat</v-icon>
      </v-btn>
        </v-col>
         <v-col>
      <v-btn v-on:click="gameList" >
        <span class="mr-1">게임모드</span>
        <v-icon large >casino</v-icon>
      </v-btn>
        </v-col>
        <v-col>
      <v-btn v-on:click="exitRoom" >
        <span class="mr-1">방 나가기</span>
        <v-icon large >exit_to_app</v-icon>
      </v-btn>
        </v-col>
      </v-row>    
</v-app-bar>
  </v-flex>
  <v-flex>
    <v-expansion-panels dense v-show="selectMode" justify="center" dark light focusable accordion>
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header>Item</v-expansion-panel-header>
        <v-expansion-panel-content >
          <v-row>
          <v-col align-self="center" cols="10">
            <div><p>게임 설명</p></div>
          </v-col>
          <v-col align-self="center" cols="2">
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
      
    <v-flex xs8><router-view></router-view></v-flex>
      
    <v-flex xs4>
       <v-layout column>
            <v-flex>
                <v-card  class="mx-auto" min-height="600">
                채팅창
                {{ myMsg }}
                </v-card>
            </v-flex>
            <v-flex>
                <v-card class="mx-auto" min-height="100">
                <v-btn block v-on:click="send" dense height="40" color="#F39C12" dark>message send</v-btn>
                <v-textarea type="text" v-model="myMsg" outlined rows="2" min-height="60" row-height = "60"></v-textarea>
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
  </v-main>
  </v-app>
</template>

<script>
export default {
  name: "GameRoom",
    data(){
        return{
            roomName:"가제",
            selectMode : false,
            myMsg : ""
        }
    },

    methods:{

        gameList(){
            this.selectMode = !this.selectMode;
        },
        exitRoom(){
            alert("술모임에서 나갑니다.");
        },
        send(){
            this.myMsg = "send click";
        }
    }
};
</script>

</template>