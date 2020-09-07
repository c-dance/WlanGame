<template>
    <v-container fluid>
        <v-app-bar app dark dense>
      <div class="d-flex align-center">
        <v-img
          alt="Home Logo"
          class="shrink mr-2"
          contain
          src="../assets/gambling.png"
          transition="scale-transition"
          width="40"
        />
        <div>
        <h2> {{ roomName }} 술모임 </h2>
        </div>
      </div>
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
      <h5>{{ date }}</h5>      
</v-app-bar>
<div v-show="selectMode" >
  <v-row justify="center">
    <v-expansion-panels dark light focusable accordion>
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
  </v-row>
</div>
    </v-container>
</template>
<script>
export default {
    name:"RoomMenu",
    data(){
        return{
            roomName:"가제",
            date : new Date(),
            selectMode : false
        }
    },
    methods:{
        chatMode(){

        },
        gameList(){
            this.selectMode = !this.selectMode;
        },
        exitRoom(){
            alert("술모임에서 나갑니다.");
        }
    }
}
</script>