<template>
    <v-container fluid>
        <v-layout column>
        <v-flex><!-- plyer list view / start-->
        <v-row>
          <v-col></v-col>
          <v-col v-for="(mem,i) in members" :key="i" >
            <v-img v-if="i===player" alt="player" class="shrink mr-2" contain src="../../assets/sejong1.png"
                transition="scale-transition" width="30"/>
            <v-img v-else alt="player" class="shrink mr-2" contain src="../../assets/sejong0.png"
                transition="scale-transition" width="30"/><p>{{mem}}</p>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-flex><!-- plyer list view / end-->
        
        <v-layout wrap align-center column v-show="isGameOn">
            <v-flex text-xs-center>
            <h1>초성 : {{chosung}}</h1>
            </v-flex>
            <br/><br/>
            <v-flex>
                <v-text-field v-model="word" label="입력 후 엔터키를 누르세요" required @keyup.enter = "OnClickNext"></v-text-field>
            </v-flex><!-- 단어 입력 끝-->
            <br/>
            <v-flex>
            <p>단어 검색 결과 : </p>
            <v-card><v-card-text>{{dictionary}}</v-card-text></v-card>
            </v-flex>
        </v-layout>
        <v-layout justify-center v-show="!isGameOn">
            <v-flex x1></v-flex>
            <v-flex>
                <v-text-field v-model="chosung" label="게임을 시작할 단어를 입력한 후 엔터키를 누르세요" required v-on:keyup.enter = "SetChosung"></v-text-field>
            </v-flex>
            <v-flex x1></v-flex>
        </v-layout>
        <v-layout v-show="isGameEnded" row>
        <v-flex><h1>{{lastPlayer()}} : 원샷 당첨!</h1></v-flex>
        <v-flex><v-btn @click="OnClickReset">다시 하기</v-btn></v-flex>
        <v-flex><h2>게임을 종료하려면 상단의 채팅 모드를 클릭하여 돌아가세요</h2></v-flex>
        </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import cheerio from 'cheerio'

export default {
    data(){
        return{
            isGameOn : false,
            isGameEnded: false,
            chosung:"",
            word:"",
            words:[],
            dictionary:"",
            player:0,
            hangeulCheck : /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
            chosungs : [ "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ" ],
        }
    },
    props:{
        members:{
            type:Array,
            default:[]
        }
    },
    methods:{
        SetChosung(){
            if(this.hangeulCheck.test(this.chosung.trim())){
                if(this.chosung.trim().length==2){
                    this.chosung = this.MakeChosung()
                    if(this.chosung) this.isGameOn=true
                    else {
                        this.chosung=""
                        alert("초성을 찾을 수 없는 단어입니다. 다시 입력해주세요.")
                    }
                }else{
                    alert("단어는 두 글자 입력 해 주세요!")
                }
            }else{
                alert("한글만 입력해 주세요!")
            }
            console.log(this.chosung)
        },
        MakeChosung(){
            let a = this.chosung.charCodeAt(0)-0xAC00; 
		    let b = this.chosung.charCodeAt(1)-0xAC00; 
		    let a_loc = parseInt((a/28)/21); 
            let b_loc = parseInt((b/28)/21);
            if(this.chosungs[a_loc] && this.chosungs[b_loc]) return this.chosungs[a_loc] + this.chosungs[b_loc]
             
        },
        OnClickNext(){
            console.log(this.word)
            this.searchDict()
        },
        turnNext(){
            this.player++;
            if(this.player===this.members.length) this.player=0;   
        },
        searchDict(){
            console.log(this.word)
            const search_result ="body > #wrap > .container > #contentWrap > #content > .cont_box_lr > #searchPaging > .floatL > .mt30 > .panel > li > .group > .search_result"
            const meaning_result = "dl > dd > a > .word_dis "
            let result = ""
            axios.get("http://localhost:8080/dictApi"+word)
                .then(r=>{
                    const $ = cheerio.load(r.data)
                    console.log($.find(search_result+" > "+meaning_result).text())
                      
                })
                .catch(e=>{
                    console.log(e + "사전 접근 실패")
                })
            //return result
        },
/*         searchDict(word){
            const search_result ="body > #wrap > .container > #contentWrap > #content > .cont_box_lr > #searchPaging > .floatL > .mt30 > .panel > li > .group > .search_result"
            const meaning_result = "dl > dd > a > .word_dis "
            let result = ""
            axios.get("http://localhost:8080/dictApi"+word)
                .then(r=>{
                    const $ = cheerio.load(r.data)
                    const $result = $(search_result)
                   $(search_result).find(meaning_result).each(function(index, elem){
                       result += $(this).text()+"\n"
                       if(index==3) return result
                   })
                })
                .catch(e=>{
                    console.log(e + "사전 접근 실패")
                })
        }, */
        lastPlayer(){
            return this.members[this.player]
        },
        OnClickReset(){
            this.player=0
            this.chosung=""
            this.word=""
            this.words=[]
            this.dictionary=""
            this.isGameEnded=false
            this.isGameOn=false
        }

    }
    
}
</script>

<style>

</style>