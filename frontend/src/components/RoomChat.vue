<template>
    <v-container>
        <v-layout column>
            <v-flex>
                <v-card  class="mx-auto" min-height="600">
                채팅창
                {{ myMsg }}
                </v-card>
            </v-flex>
            <v-flex>
                <v-card class="mx-auto" min-height="100">
                <v-btn block v-on:click="send" dense height="40" color="#F39C12" dark>message send</v-btn>
                <v-textarea type="text" v-model="myMsg" outlined rows="2" min-height="60" row-height = "60"></v-textarea>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>
<script>
export default {
    name:"RoomChat",
    data(){
        return{
            myMsg : ""
        }
    },
    methods : {
        send(){
            this.myMsg = "send click";
        }
    }
}
</script>