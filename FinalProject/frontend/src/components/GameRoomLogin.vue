<template>
<v-container>
<v-layout column>
  <v-card>
  <v-card-text>
    <v-layout column>
    <v-flex><v-text-field label="닉네임 입력" v-model="nickname"></v-text-field></v-flex>
    <v-flex><v-text-field label="방 비밀번호 입력" v-if="room.lock" v-model="password"></v-text-field></v-flex>
    </v-layout>
  </v-card-text>
  <v-card-actions>
    <br/>
    <v-layout row>
    <v-spacer></v-spacer>
    <v-flex><v-btn @click="cancel">돌아가기</v-btn></v-flex>
    <v-spacer></v-spacer>
    <v-flex><v-btn @click="login">입장</v-btn></v-flex>
    <v-spacer></v-spacer>
    </v-layout>
    <br/>
  </v-card-actions> 
  </v-card>
</v-layout>
</v-container>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      nickname:'',
      password:"",
      room : [],
    }
  },
  props :{
    id:{
      type : String,
      default : ''
    }
  },
  methods:{
    cancel(){
      this.$router.push({path:"/"});
    },
    login(){
      if(this.room.mem.indexOf(this.nickname)<0){
        if(this.password===this.room.pwd){
            this.putNickname();
        }else{
          alert("비밀번호가 불일치 합니다.")
        }
      }else{
        alert("다른 닉네임을 입력해 주세요.")
      }
      
    },
    putNickname(){
      console.log(this.id)
      axios.put('http://localhost:3000/api/rooms/login/',{
        id:this.room._id, nickname:this.nickname
      })
            .then((r)=>{
              console.log(r);
              this.$router.push({path:'/room/id/'+this.room._id})
              localStorage.setItem("nickname",this.nickname)
            })
            .catch((e)=>{
              console.log(e)
            })
    }
  },
  mounted(){
    axios.get('http://localhost:3000/api/rooms/login/'+this.id)
      .then((r) => {
        this.room = r.data.room
        console.log(r.data.room.lock)
        
      })
      .catch((e) => {
        console.error(e.message)
      })
    
    
  }
}
</script>

