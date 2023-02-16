const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer:{
    host:'192.168.146.101',
    port:8080,
    client:{
      webSocketURL:'ws://192.168.146.101:8080/ws',
    },
    headers:{
      'Access-Control-Allow-Origin':'*',
    }

  },
  transpileDependencies: true
})
