<template>
  <div class="about">
    <h1>This is an about page : axios test </h1>
    <ol v-for="room in rooms" :key="room">
      <li>{{room.name}}</li>
      <li>{{room.desc}}</li>
      <li>{{room.lock}}</li>
      <li>{{room.pwd}}</li>
      <li>{{room.limit}}</li>
      <li>{{room.mem}}</li>
    </ol>
        <ol>
      <li><input type="text" v-model="name">방 이름 입력</li>
      <li><input type="text" v-model="desc">방 소개 입력</li>
      <li><input type="text" v-model="lock">비밀 방 여부 입력</li>
      <li><input type="text" v-model="pwd">방 비밀번호 입력</li>
      <li><input type="text" v-model="limit">제한 인원 입력</li>
      <li><input type="text" v-model="mem">현재 인원 입력</li>
      <li><v-btn @click="submit" ></v-btn></li>
      <li>{{msg}}</li>
    </ol>
  </div>
  

</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      rooms :[],
      name : "",
      desc : "",
      lock : "",
      pwd : "",
      limit : 1,
      mem : 1,
      msg:""
    }
  }
  ,mounted () {
    axios.get('http://localhost:3000/api/rooms')
      .then((r) => {
        this.rooms = r.data.rooms
        console.log(r)
      })
      .catch((e) => {
        console.error(e.message)
      })
  },
  methods : {
    submit : function(){

      axios.post('http://localhost:3000/api/rooms',{
        name:this.name, desc: this.desc, lock:this.lock, pwd:this.pwd, 
        limit:this.limit, mem:this.mem
      })
        .then((r) => {
          this.msg = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })

    }

    }
  } 

</script>
