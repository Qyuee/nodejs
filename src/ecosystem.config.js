module.exports = {
  apps: [
    {
      name: "node-api-server",
      script: 'babel-node ./src/app.js',
      instances: 3,
      exec_mode: "cluster",
      env: {
        // 개발 환경설정
        NODE_ENV: 'development',
      },
    }
  ]
}