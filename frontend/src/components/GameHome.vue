<template>
<v-container dark fluid grlid-list-md>
    <v-app-bar app dense dark>
      <div class="d-flex align-center">
        <v-img
          alt="Home Logo"
          class="shrink mr-2"
          contain
          src="../assets/beer.png"
          transition="scale-transition"
          width="40"
          
        />
        <h3>{{ HomeTitle }}</h3>
      </div>
      <v-spacer></v-spacer>
      <h4>환영합니다. 술모임방에서 채팅과 게임을 즐겨보세요.</h4>
      <v-spacer></v-spacer>
      <!--<h5>{{ date }}</h5>-->
    </v-app-bar>

<v-layout column>
  <v-flex xs12 sm6 md4>
       <v-img 
        :src="require('../assets/cheers.jpg')"
          alt='랜선 술모임'
          rounded
          dark 
          position="center"
          min-width="800"
          height="240"
          /> 
  </v-flex>
  <v-flex xs12 sm6 md4>
  <v-banner class = "text-center">
    <br/>
    <p>직접 술모임 방을 만들 수 있습니다.</p>
    <v-btn v-on:click="makeRoom" rounded dark width="200">{{makeTitle}}</v-btn>
 <v-row v-if="make">
          <v-col>
            <br/>
          <p>술모임방 이름을 입력해 주세요</p>
          <v-textarea type="text" v-model="Name" outlined rows="1" row-height = "10" label="한 줄 입력"></v-textarea>
          </v-col>
          <v-col>
            <br/>
          <p>어떤 술모임방인지 소개해 주세요</p>
          <v-textarea type="text" v-model="Desc" outlined rows="3" row-height = "30" label="세 줄 입력"></v-textarea>
          </v-col>
          <v-col>
            <br/>
          <p>완료를 누르면 바로 방으로 입장합니다.</p>
          <br/>
          <v-btn v-on:click="makeFinish" rounded color="dark" dark width="100">입력 완료</v-btn>
          </v-col>
  </v-row>
   <v-alert :value="alert" dense type="success" color="dark" dark>
        {{ Name }} 방이 만들어졌습니다. 잠시 후 방으로 입장합니다.  
  </v-alert>
  </v-banner>
  </v-flex>
<v-flex>
  <br/>
  <v-toolbar rounded dense height="40" color="#F39C12" dark>
  <v-toolbar-title >오늘의 술모임방</v-toolbar-title>
  </v-toolbar>
  <br/>
</v-flex>
<v-flex>
<v-layout row>
  <v-flex xs12 sm6 md4 v-for="Room in RoomList" :key="Room.RoomTitle" >
      <br/>
    <v-card  class="mx-auto" width="300" height ="300" >
      <v-img
        class="white--text align-end"
        height="120px"
        src="../assets/cardBeer.jpg">
        <v-card-title>{{Room.RoomTitle}}</v-card-title>
      </v-img> 
      <v-card-subtitle height="20px" class="pb-1">
        모임중인 멤버 : 
        <v-avatar v-for="n in Room.Now" :key="n" size="20"><v-img src="../assets/full.png" /></v-avatar>
        <v-avatar v-for="n in (Room.Limit-Room.Now)" :key="n" size="20"><v-img src="../assets/empty.png" /></v-avatar>
      </v-card-subtitle>
      <v-card-text class="text--primary">
        <div>{{Room.RoomDesc}}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn position="center" color="orange" @click="OpenRoom(Room.RoomTitle, Room.Lock, Room.Limit-Room.Now)" >
        들어가기 
        <v-img contain transition="scale-transition" width="20px" height="20px" v-if='Room.Lock==="lock"' src="../assets/lock.png"/></v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <br/>
  </v-flex>
</v-layout>
</v-flex>
</v-layout>
</v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data(){
    return{
    HomeTitle:"HOME",
    //date : new Date().getUTCDate(),
    makeTitle : "술모임방 만들기",
    make : false,
    alert : false,
    Name:'',
    Desc:'',
    RoomTitle :'술모임 방의 이름',
    RoomDesc:'술모임 방의 소개가 들어갑니다.',
    RoomCnt : 10,
    RoomList :[
      {RoomTitle : "aroom", RoomDesc:"adesc", Lock:"unlock", Password:"", Limit:6, Now :2},
      {RoomTitle : "broom", RoomDesc:"술마시는 방", Lock:"lock", Password:"123", Limit:6, Now :5},
      {RoomTitle : "croom", RoomDesc:"adesc", Lock:"lock", Password:"ewr", Limit:5, Now :2},
      {RoomTitle : "droom", RoomDesc:"adesc", Lock:"unlock",Password:"", Limit:4, Now :2},
      {RoomTitle : "eroom", RoomDesc:"adesc",Lock:"unlock", Password:"", Limit:1, Now :1},
    ]
    }
  },
  methods:{

    makeRoom(){
      this.make = !this.make;
      this.makeTitle = this.makeTitle ==="접기"? "술모임방 만들기" : "접기";
    },
    makeFinish(){
      if(this.Name.trim() !== " " && this.Desc.trim() !== " "){
        this.alert = !this.alert;
        setTimeout(this.OpenRoom,3000)
      }},
    OpenRoom(id, lock, cnt){
      if(cnt===0){
        alert("술모임방이 꽉 찼습니다. 다른 방을 둘러보세요")
      }else if(lock==="unlock"){
        alert("술 모임방으로 들어가시겠습니까?")
      }else{
        alert("비밀 술모임방입니다. 비밀먼호를 입력해주세요.")
      }
        
    },
    enterRoom(){

    }
  },

}


</script>
