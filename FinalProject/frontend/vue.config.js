const path = require("path");

module.exports = {
  lintOnSave:false,
  "transpileDependencies": [
    "vuetify"
  ],
 
    devServer: { 
      proxy: { 
        '/api': { 
          target: 'http://localhost:3000/api',
          changeOrigin: true, 
          pathRewrite: { 
            '^/api': ''
          } 
        },
        '/dictApi' :{
          target:"https://opendict.korean.go.kr/search/searchResult?focus_name=query&query=",
          } 
        }
      
    },
    //outputDir: '../backend/public',  //생성되는 파일들은 백엔드 서버가 사용할 수 있다. 
/*     chainWebpack : config => {
      config.module.rules.delete('eslint');
  } */
}