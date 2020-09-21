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
            <v-flex v-if=!isGameOn><!-- input view / start-->
            <v-row>
            <v-col cols="2"></v-col>
            <v-col cols="5"><v-select v-model="CardNum" v-bind:items="[1,2,3,4,5,6,7,8]" label="카드 갯수 제한 : 인원의 최대 4배"></v-select></v-col>
            <v-col cols="3" ><v-btn @click="OnClickShuffle" width="120px" height="50px">카드 섞기</v-btn></v-col>
            <v-col cols="2"></v-col>
            </v-row>
            </v-flex><!-- input view / end-->
            <v-flex v-if=isGameOn><!--card game view / start-->
                <v-layout justify-space-between row><!-- card layer-->
                <v-flex xs3 v-for= "card in cardList" :key="card">
                <v-img alt="player" class="shrink mr-2" contain src="../../assets/cardback.png" transition="scale-transition" width="80"
                @click="OnClickCard(card)"/>
                <br/>
                </v-flex>
                </v-layout>
            </v-flex><!--card game view / end-->
            <v-flex v-if=gameEnd>
                    <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="3">{{OnResult()}}</v-col>
                    <v-col cols=2><v-btn @click="OnClickReset" width="120px" height="50px">다시하기</v-btn></v-col>
                    <v-col cols=2><v-btn @click.passive="OnClickBack" width="120px" height="50px">끝내기</v-btn></v-col>
                    <v-col cols="1"></v-col>
                    </v-row>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            //members :["toto","lolo","hoho","popo"], //this.$route.params.mem
            peopleNum: null, //members.length
            cardNum:1, //v-model : default:1 / 배수로 돌리기
            isGameOn : false,
            gameEnd:false,
            playerCount : -1,
            cardList : [],
            
        }
    },
    props:{
        members:{
            type:Array,
            default:[]
        }
    },
    methods : {
        OnClickShuffle(){ //Loginclick
            this.cardList = Array.from({length : this.peopleNum}, () => null); 
            let randomNumber = Math.floor(Math.random() * this.cardNum); //choose shot card num
            this.cardList[randomNumber] = 'O'; // choose shot card
            this.isGameOn = true;
        },
        OnClickCard(card){
            if(card){ //if(card==='O')
                //this.cardImg = passImg;
                this.gameEnd = true;
                this.OnResult();
            }
        },
        OnClickReset(){
            this.isGameOn = false;
            this.gameEnd = false;
            this.playerCount=-1;
        },
        OnClickBack(){
            
        },
        OnResult(){
                return (this.playerCount % this.peopleNum)+1+'번째 플레이어 당첨';
        }
    },
    watch:{
        peopleNum(){
            return this.peopleNum = this.peopleNum.replace(/[^0-9]/g, '');
        },
        cardNum(){
            return this.cardNum = this.cardNum.replace(/[^0-9]/g, '');
        }
    },
    mounted(){
        this.peopleNum = this.members.length;
    }
    
}
</script>