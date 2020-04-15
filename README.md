### 工程文件说明

- src 文件夹为源文件
- dist 文件夹为打包输出文件夹
- webpack.config.js 文件为webpack dev 环境配置，一般不做修改
- webpack.config.build.js 文件为 webpack production 环境配置，一般不做修改
- config.js 文件为项目实际配置文件。详情请看注释。

### 命令行说明

- 启动本地测试服务，并打开浏览器命令
    ```npm run dev```
- 启动本地测试服务，不打开浏览器命令
    ```npm run start```
- 打包构建线上文件
    ```npm run build```

### js 打包说明

- js的打包配置是 config.js 中的 entry 配置项，如果不配置则会读取src/js 文件夹下的文件，按文件顺序打包引入。
- 如果要自定义顺序，请自行配置entry项。

### css 的引入说明

要使css打包到dist下，必须在js中引入css。
```
import './css/base.css';
import './css/index.less';
```


### 工程项目结构预期

- 输入目录
    |- src 
    | |- index.html
    |
    | |- js 
    | | |- jquery.js
    | | |- util.js
    | | |- index.js
    |
    | |- css 
    | | |- common.less
    | | |- index.less 
    |
    | |- images 
    | | |- logo.png
    | | |- button.png
    | | |- etc.png
    |
    |- webpack.config.js
    |- webpack.config.build.js
    |- package.json
    |
    |- config.js
    |- .gitignore

- 输出目录

    |- dist 
    | |- index.html
    |
    | |- js 
    | | |- jquery[hash].js
    | | |- util[hash].js
    | | |- index[hash].js
    |
    | |- css
    | | |- common[hash].css
    | | |- index[hash].css
    |
    | |- images
    | | |- logo[hash].png
    | | |- button[hash].png
    | | |- etc[hash].png


### 项目 html 处理预期

    - 修改引入src目录下的资源文件为输出名称。
    如： <script src="./index.js"></script> 
         <script src="./index.[hash].js"></script>

### 项目 css 相关处理预期

    - 预编译器的转换 less-loader

### 项目 js 相关处理预期

    - ts 语法转换（可选） ts-loader
    - es6语法转换 babel-loader

### 项目 images 静态资源相关处理预期

    - 增加图片hash值，以便资源缓存的更新。


