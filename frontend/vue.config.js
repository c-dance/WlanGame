module.exports = {
  transpileDependencies: ["vuetify"],
  runtimeCompiler: true,
  pages:{
    Home:{ //주소에 붙여질 이름
        entry: 'src/pages/Home/main.js', //vue 시작점
        template: 'public/index01.html', //vue 붙일 html
        filename: 'index01.html' //dist에 저장될 파일
    },
    Room:{
        entry: 'src/pages/Room/main.js',
        template: 'public/index02.html',
        filename: 'index02.html'
    }
},
};
