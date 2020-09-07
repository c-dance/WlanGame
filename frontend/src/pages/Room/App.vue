<template>
<v-app>
  <v-main>
<v-container fluid>
<v-layout column>
  <v-flex><router-view name="RoomMenu"></router-view></v-flex>
  <v-flex>
    <v-layout row>
      <v-flex xs8><router-view name="Game0"></router-view></v-flex>
      <v-flex xs4><router-view name="RoomChat"></router-view></v-flex>
    </v-layout>
  </v-flex>
  <v-flex>state : {{state}}</v-flex>
</v-layout>
</v-container>
  </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",
  data(){
    return{
    state : "state"
    }
  },
  
};
</script>
