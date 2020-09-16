<template>
<v-container fluid>
    <v-layout column>
    <v-flex><!-- plyer list view / start-->
        <v-row>
          <v-col></v-col>
          <v-col v-for="mem in members" :key="mem" >
          <v-img alt="player" class="shrink mr-2" contain src="../../assets/p0.png"
                transition="scale-transition" width="30"/> <p>{{mem}}</p>  
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-flex><!-- plyer list view / end-->
    <v-flex><!-- input view /start-->
    <v-row>
    <v-col cols="2"></v-col>
    <v-col cols="5"><v-text-field :rules="rules" v-model="word" @keyup.enter.exact="callDictAPI"></v-text-field></v-col>
    <v-col cols="3"><v-btn @click="callDictAPI" width="120px" height="50px">검색하기</v-btn></v-col>
    <v-col cols="2"></v-col>
    </v-row>
    </v-flex><!-- input view /end-->
    <v-flex><!-- result view / start-->
    <li v-for="data in result" :key="data">{{data}}</li>
  </v-flex><!-- result view / end-->
      </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'

let appendWords = []
const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

export default {
  data(){
    return{
      members :["toto","lolo","hoho","popo"], //this.$route.params.mem
      word : '',
      result : []
    }
  },
  methods:{
    callDictApi(){
      if(!regex.test(this.word)){
        alert('한글만 입력하세요.')
      }
      else if(appendWords.indexOf(this.word) >= 0){
        alert("꽝입니다.(중복)");
        this.clear();
      }
      else if(appendWords.length > 0 && appendWords[appendWords.length-1][appendWords[appendWords.length-1].length - 1] !== this.word[0]){
        console.log(appendWords[appendWords.length-1][appendWords[appendWords.length-1].length - 1]);
        console.log(this.word[0]);
        alert("꽝입니다.(이전 문자와 이어지지 않음)");
        this.clear();
      }
      else{
        appendWords.push(this.word)
        this.result = []
        axios.get('http://localhost:8000/callDictAPI?word='+this.word)
        .then(res=>{
          let parser = new DOMParser();
          let xmlDoc = parser.parseFromString(res.data,"text/xml");
          let x = xmlDoc.getElementsByTagName("item")[0].getElementsByTagName("sense");
          for(let i = 0; i<x.length;i++){
            this.result.push(x[i].getElementsByTagName("definition")[0].innerHTML);
          }
        })
        .catch(() => {
          alert("꽝입니다.(없는 문자)");
          this.clear();
        })
      }
    },
    clear(){
      appendWords = [],
      this.result = [],
      this.word = ''
    }
  }
}
</script>

<style>

</style>