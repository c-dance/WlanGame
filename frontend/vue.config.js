module.exports = {
  transpileDependencies: ["vuetify"],
  runtimeCompiler: true,

  pages:{
        Home:{ //주소에 붙여질 이름
        
        entry: 'src/pages/Home/main.js', //vue 시작점
        template: 'public/index01.html', //vue 붙일 html
        filename: 'Home.html', //dist에 저장될 파일
        title : 'HomePage', //page title name
        chunks:['chunk-vendors','chunk-common','Home'] //dist/js
    },
        Room:{
        entry: 'src/pages/Room/main.js',
        template: 'public/index02.html',
        filename: 'Room.html', //dist에 저장될 파일
        title : 'RoomPage',
        chunks:['chunk-vendors','chunk-common','Room']
    }
    },
    
};
