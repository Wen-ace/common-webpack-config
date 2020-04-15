module.exports = {
    // 线上cdn前缀
    publicPath: 'http://cdn.example.com/',
    // 本地测试cdn, 默认为 '/'
    publicPathLocal: '/',
    // 启动端口 默认 8080
    port: '8080',
    // 打包输出目录 默认 dist
    output: 'dist',
    // 
    https: false,
    // {} | []
    proxy: {
        '/api': {
            target: 'http://target.com'
        }
    },
    // html模板 默认 './src/document.html'
    htmlTemplate: '',
    // 默认为  src/js 下的所有文件。
    entry: false,
    // 静态资源是否添加 hash值， 默认为 true
    hash: true
}