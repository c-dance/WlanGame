<template>
    <v-container fluid>
        
        <v-layout row>
            <v-flex v-if="!isGameOn">
                <v-text-field  required @keyup.enter.exact = "SetChosung"></v-text-field>
                <v-btn>초성 입력</v-btn>
            </v-flex>
            <v-flex  v-else>
                <h3>{{chosung}}</h3>
            </v-flex>
        </v-layout>
        <v-layout row v-if="isGameOn && !gameEnd">
            <v-flex>
                <v-textarea>{{dictionary}}</v-textarea>
            </v-flex>
            <v-flex>
                <v-text-field  required @keyup.enter.exact = "SetChosung"></v-text-field>
                <p>입력 후 Enter키를 누르세요</p>
            </v-flex>
        </v-layout>
        <v-layout column v-if="isGameOn && gameEnd">
        </v-layout>



    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            isGameOn : false,
            gameEnd: false,
            chosung:"",
            word:"",
            words:[],
            dictionary:""
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