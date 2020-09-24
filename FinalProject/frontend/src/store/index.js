import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: { //공용 데이터 선언
    members :[],
    games : [{cardList:[], isGameOn:false, isGameEnded:false, player:0},
            {isGameOn:false, isGameEnded:false, player:0},
            {isGameOn:false, isGameEnded:false, player:0},
            {chosung:"", word:"", words:[], dictionary:"", isGameOn:false, isGameEnded:false, player:0}]

  },
  mutations: { //state값 직접 변경
    ChangeMembers(state, payload){state.members=payload},
    ChangeGames(state, value){
      let selectedGame = value.selectedGame
      let newData = value.newData
      state.games[selectedGame] = value.newData
    },
    ChangeGame0(state, payload){ state.games[0] = payload},
    ChangeGame1(state, payload){ state.games[1] = payload},
    ChangeGame2(state, payload){ state.games[2] = payload},
    ChangeGame3(state, payload){ state.games[3] = payload}
    }
  ,
  actions: { //컴포넌트로부터의 통신 받아 mutation 활성화 <- 비동기 처리 

  },
  getters:{ //데이터 값 가져오기
    getGames(state){ return state.games },
    getMembers(state){ return state.members }
  },

})
