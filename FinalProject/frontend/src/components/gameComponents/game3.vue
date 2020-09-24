<template>
<v-container fluid>
    <p>{{members}}</p>
    <p>{{gameData}}</p>
    <p>{{player}}</p>
    <v-text-field type="text" v-model="newData"></v-text-field>
    <p>{{newData}}</p>
    <v-btn @click="turnNext">turnNext</v-btn>
   <!--  <v-layout>
    <v-flex>
        <v-row>
          <v-col></v-col>
          <v-col v-for="(mem,i) in members" :key="i" >
            <v-img v-if="i===gameData.player" alt="player" class="shrink mr-2" contain src="../../assets/sejong1.png"
                transition="scale-transition" width="30"/>
            <v-img v-else alt="player" class="shrink mr-2" contain src="../../assets/sejong0.png"
                transition="scale-transition" width="30"/><p>{{mem}}</p>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-flex>
      <v-btn @click="nextPlayer">change Player</v-btn>
    </v-layout> -->
</v-container>
</template>
<script>
export default {

    data(){
        return{
            newData:{}
        }
    },
    props:{
        gameData : {
            type:Object,
            default:{}
        },
        members:{
            type:Array,
            default:[]
        }
    },
    methods : {
        turnNext:function(){
                this.newData = this.gameData
                this.newData.player ++;
                this.$emit("ChangeGames",{selectedGame:3, newData:newData})
                }
    },
    computed:{

    }, 
}
</script>