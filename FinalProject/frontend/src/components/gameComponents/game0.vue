<template>
    <v-container fluid>
        <v-layout column>
            <v-flex><!-- plyer list view / start-->
            <v-row>
            <v-col></v-col>
            <v-col v-for="(mem,index) in members" :key="index" >
            <v-img v-if="index===gameData.player" alt="now play" class="shrink mr-2" contain src="../../assets/jocker0.png"
                transition="scale-transition" width="30"/>
            <v-img v-else alt="player" class="shrink mr-2" contain src="../../assets/jocker1.png"
                transition="scale-transition" width="30"/><p>{{mem}}</p>
            </v-col>
            <v-col></v-col>
            </v-row>
            </v-flex><!-- plyer list view / end-->
            <v-flex v-if="!gameData.isGameOn"><!-- input view / start-->
            <v-row>
            <v-col cols="2"></v-col>
            <v-col cols="5"><v-select v-model="cardNum" v-bind:items="numArray" label="카드 갯수 제한 : 최대 30개"></v-select></v-col>
            <v-col cols="3" ><v-btn @click="OnClickShuffle" width="120px" height="50px">카드 섞기</v-btn></v-col>
            <v-col cols="2"></v-col>
            </v-row>
            </v-flex><!-- input view / end-->
            <v-flex v-if="gameData.isGameOn"><!--card game view / start-->
                <v-layout justify-space-between row><!-- card layer-->
                <v-flex xs3 v-for= "(card, index) in cardList" :key="index">
                <v-img alt="card" class="shrink mr-2" contain src="../../assets/cardback.png" transition="scale-transition" width="80"
                @click="OnClickCard(index)"/>
                <br/>
                </v-flex>
                </v-layout>
            </v-flex><!--card game view / end-->
            <v-flex v-if="gameData.isGameEnded">
                <v-layout column>
                    <br/>
                    <v-flex><h1>{{members[gameData.player]}}(이)가 당첨되었습니다. 원샷!</h1></v-flex>
                    <br/>
                    <v-flex><v-btn @click="OnClickReset" width="120px" height="50px">다시하기</v-btn></v-flex>
                    <br/>
                    <v-flex><p>게임을 끝내려면 상단의 채팅모드를 눌러주세요</p></v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            newData:{},
            cardNum:0,  
            shotCard:0,
            cardList:[],
            numArray:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
        }
    },
    props:{
        members:{
            type:Array,
            default:[]
        },
        gameData : {
            type:Object,
            default:{}
        },
    },
    methods : {
        OnClickShuffle(){ //Loginclick
            if(this.cardNum > 0 && this.cardNum){
                this.cardList = Array.from({length : this.cardNum}, () => null);
                let randomNumber = Math.floor(Math.random() * this.cardNum);
                this.cardList[randomNumber] = 'O';

                this.newData = this.gameData //newData-gameData matching
                this.newData.cardList = this.cardList
                this.newData.isGameOn = true;
                this.sendEvent(this.newData)
            }else{
                alert('카드 갯수를 다시 선택하세요.');
            }
        },
        OnClickCard(index){
            this.newData = this.gameData
            if(this.newData.cardList[index]){ //if(card==='O')
                //this.cardImg = passImg;
                this.OnResult();
            }else{
                this.newData.cardList.splice(index,1)
                if(this.newData.player===(this.members.length-1)){
                    this.newData.player=0
                }else{
                    this.newData.player++;   
                }
                this.sendEvent(this.newData)
            }
        },
        OnClickReset(){
            /* this.newData={cardList:[], isGameOn:false, isGameEnded:false, player:0}
            this.sendEvent(this.newData) */
            this.$router.go(0)
        },
        OnResult(){
            this.newData=this.gameData
            this.newData.isGameEnded = true
            this.sendEvent(this.newData)
        },
        sendEvent(newValue){
            this.$emit("ChangeGames",{selectedGame:0,newData:newValue})
        }
    },
    
}
</script>