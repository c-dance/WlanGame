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
        <h3>Home</h3>
      </div>
      <v-spacer></v-spacer>
      <h4>환영합니다. 술모임방에서 채팅과 게임을 즐겨보세요.</h4>
      <v-spacer></v-spacer>
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
    <v-btn v-on:click="createRoom" rounded dark width="200">{{openText}}</v-btn>
  <v-row v-if="open">
    <v-col>
      <br/>
        <p fontSize="10">술모임방 이름을 입력해 주세요</p>
        <v-text-field v-model="name" :counter="10" :rules="nameRules" required></v-text-field>
      <br/>
        <p>어떤 술모임방인지 소개해 주세요</p>
        <v-textarea type="text" v-model="desc" :counter="40" :rules="descRules"  rows="2" row-height = "10"></v-textarea>
    </v-col>
    <v-col>
      <br/>
        <p>술모임방 멤버는 최대 {{limit}}명(선택)으로 제한합니다</p>
        <v-select v-model="limit" v-bind:items="[1,2,3,4,5,6,7,8]" label="멤버 제한(최대 8명)"></v-select>
        <v-checkbox v-model="lock" label="술모임방에 비밀 번호 만들기"></v-checkbox>
        <v-text-field v-if="lock" v-model="pwd" :counter="8" :rules="pwdRules" label="비밀번호" required></v-text-field>
    </v-col>
    <v-col>
      <br/>
        <p fontSize="10">본인의 닉네임을 입력해 주세요</p>
        <v-text-field v-model="nickname" :counter="10" :rules="nicknameRules" required></v-text-field>    
      <br/>
        <p>완료를 누르면 바로 방으로 입장합니다.</p>
      <br/>
          <v-btn v-on:click="finishCreate" rounded color="dark" dark width="100">입력 완료</v-btn>
    </v-col>
  </v-row>
   <v-alert :value="alert" dense type="success" color="dark" dark>
        {{ name }} 방이 만들어졌습니다. 잠시 후 방으로 입장합니다.  
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
  <v-flex xs12 sm6 md4 v-for="r in rooms" :key="r.name" >
      <br/>
    <v-card  class="mx-auto" width="300" height ="300" >
      <v-img
        class="white--text align-end"
        height="120px"
        src="../assets/cardBeer.jpg">
        <v-card-title>{{r.name}}</v-card-title>
      </v-img> 
      <v-card-subtitle height="20px" class="pb-1">
        모임중인 멤버 : 
        <v-avatar v-for="n in r.mem" :key="n" size="20"><v-img src="../assets/full.png" /></v-avatar>
        <v-avatar v-for="n in (r.limit-r.mem.length)" :key="n" size="20"><v-img src="../assets/empty.png" /></v-avatar>
      </v-card-subtitle>
      <v-card-text class="text--primary">
        <div>{{r.desc}}</div>
      </v-card-text>
      <v-card-actions><!-- 들어가기 btn start-->
       <v-spacer></v-spacer>
        <v-btn position="center" color="orange" @click="OpenDialog(r)">
        들어가기 
        <v-img contain transition="scale-transition" width="20px" height="20px" v-if='r.lock===true' src="../assets/lock.png"/></v-btn>
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
import axios from 'axios' 

export default {
  name: "GameHome",
  data(){
    return{
    openText : "술모임방 만들기",
    open : false, 
    alert : false,
    name:'',
    nameRules: [
        v => !!v || '방이름을 입력해 주세요',
        v => (v && v.length <= 10) || '방이름은 10자 이하로 입력해 주세요',
      ],
    nickname:'',
    nicknameRules: [
        v => !!v || '닉네임을 입력해 주세요',
        v => (v && v.length <= 10) || '닉네임은 10자 이하로 입력해 주세요',
      ],
    desc:'',
    descRules: [
        v => !!v || '소개글을 입력해 주세요',
        v => (v && v.length <= 40) || '소개글은 40자 이하로 입력해 주세요',
      ],
    lock:false,
    pwd:'',
    pwdRules: [
        v => !!v || '비밀번호를 입력해 주세요',
        v => (v && v.length <= 8) || '비밀번호는 8자 이하로 입력해 주세요',
      ],
    limit :1,
    rooms : [],
    mem:[],
    dialog : false,
    selectedRoom : null,
    }
  },//data

  methods:{

    createRoom(){
      this.open = !this.open;
      this.openText = this.openText ==="접기"? "술모임방 만들기" : "접기";
    },

    finishCreate(){
      axios.post('http://localhost:3000/api/rooms',{
        name:this.name, desc: this.desc, lock:this.lock, pwd:this.pwd, 
        limit:this.limit, mem:this.nickname
      })
        .then((r) => {
          let id = r.data.id[0]._id;
          console.log(r.data.id);
          alert(this.name+'의 방이 만들어졌습니다.');
          localStorage.setItem("nickname",this.nickname)
          this.$router.push({path: '/room/id/'+id});
        })
        .catch((e) => {
          console.error(e.message)
          alert("방 만들기에 실패했습니다.");
        })
      //route.push ... 이동

    },
    OpenDialog(r){
      if(r.limit-r.mem.length===0){
        alert("방이 꽉 찼습니다.")
      }
      else{
        console.log(r);
        this.$router.push({path:'/login/'+r._id});
      }
    }

  },//methods

  mounted () {
    axios.get('http://localhost:3000/api/rooms')
      .then((r) => {
        this.rooms = r.data.rooms
        console.log(r)
      })
      .catch((e) => {
        console.error(e.message)
      })
  },

}


</script>
