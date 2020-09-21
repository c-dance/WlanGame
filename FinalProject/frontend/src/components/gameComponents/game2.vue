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
    <v-flex>
    음식 명 : <input type="text" @keyup.enter.exact="callSearchAPI" v-model="word"><br/>
    검색 개수 : <input type="text" v-model="searchCount"><br/>
    <button @click="callSearchApi">검색</button><br/>
    </v-flex>
    <p id="res"></p>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            word:'김치찌개',
            searchCount:5,
            result : '<li>'
        }
    },
    props:{
        members:{
            type:Array,
            default:[]
        }
    },
    methods:{
        callSearchApi(){
            this.result = '<li>'
            axios.get('http://localhost:8000/callSearchAPI?word='+this.word + '&count=' + this.searchCount)
            .then((res)=>{
                const items = res.data;
                for(let i = 0 ;i <items.length;i++){
                    let title = items[i].title.replace(/(<b>|<\/b>)/g,'');
                    let description = items[i].description.replace(/(<b>|<\/b>)/g,'');

                    title = title.replace('백종원',`<span style = "background-color : red">백종원</span>`);
                    description = description.replace('백종원',`<span style = "background-color : red">백종원</span>`);

                    this.result += title +'</li><br/><li>';
                    this.result += description +'</li><br/>';
                }
                if(this.result.indexOf('백종원') >= 0) alert('당첨되었습니다.');
                else alert('통과')
                document.getElementById('res').innerHTML = this.result;
            })
        }
    }
}
</script>

<style>

</style>