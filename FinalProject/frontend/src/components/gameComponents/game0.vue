<template>
    <v-container fluid>
        <v-layout column>
            <v-flex><!-- plyer list view-->
            </v-flex>
            <v-flex v-if=!isGameOn><!-- input view-->
            <v-select v-model="CardNum" v-bind:items="[1,2,3,4,5,6,7,8]" label="카드 갯수 제한 : 인원의 최대 4배"></v-select>
            <v-btn @click="ShuffleClick">카드 섞기</v-btn>
            </v-flex>
            <v-flex><!--card game view-->
                <v-layout justify-space-between row v-if=isGameOn><!-- card layer-->
                <v-flex v-for= "card in cardList" :key="card">
                    <v-card>
                    <v-img v-bind:src="cardImg" @load="OnClickCard(card)"></v-img>
                    </v-card>
                </v-flex>
                </v-layout>
                <v-flex v-else>
                    {{OnResult()}}
                    <v-btn @click="OnClickReset">다시하기</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click.passive="OnClickBack">끝내기</v-btn>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            peopleNum:null, //this.$route.params.mem
            cardNum:null, //v-model : default:1
            isGameOn : false,//gameEnd : false;
            playerCount : -1,
            cardList : [],
            cardImg : "default",
            passImg :"pass",
            shotImg : "shot"

        }
    },
    methods : {
        ShuffleClick(){ //Loginclick
            this.cardList = Array.from({length : this.peopleNum}, () => null);
            let randomNumber = Math.floor(Math.random() * this.cardNum);
            this.cardList[randomNumber] = 'O';
            this.isGameOn = true;
            alert("게임이 시작되었습니다. 카드를 선택하세요");
        },
        OnClickCard(){
            if(card){
                this.cardImg = passImg;
                this.OnResult;
                isGameOn = false;

            }
        },
        OnClickReset(){
            this.isGameOn=True;
            this.playerCount=-1;
        },
        OnClickBack(){
            //This.$router.go(-1);
        },
        OnResult(){
            alert((this.playerCount % this.peopleNum)+1+'번째 플레이어 당첨');
        }
    },
    watch:{
        peopleNum(){
            return this.peopleNum = this.peopleNum.replace(/[^0-9]/g, '');
        },
        cardNum(){
            return this.cardNum = this.cardNum.replace(/[^0-9]/g, '');
        }
    }
    
}
</script>