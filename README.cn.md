# js-helper

k`s javascript helper/library/utils

### 依赖库

```shell
#或者yarn add xxx
npm i --save core-js
npm i --save crypto-js
npm i --save lodash
npm i --save qs
npm i --save url-parse
```

### 测试库

```shell
#或者yarn add --dev xxx

# https://jestjs.io/zh-Hans/
npm install --save-dev jest

npm install --save-dev babel-jest

npm install --save-dev @babel/preset-env
```

### 执行测试

```shell
yarn test
npm run test
```

### 打包

````shell
npm i --save-dev rimraf
npm i --save-dev rollup
npm i --save-dev @rollup/plugin-node-resolve
npm i --save-dev @rollup/plugin-commonjs
npm i --save-dev @rollup/plugin-json
npm i --save-dev @rollup/plugin-babel
npm i --save-dev rollup-plugin-terser
npm i --save-dev @babel/plugin-transform-runtime

yarn build
````

### 发布

```shell
查看npm设置
npm config list
恢复官方
npm config set registry https://registry.npmjs.com

查看当前用户
npm whoami

#登录
npm login

#发布
npm config set access public
npm publish
```

### 其他
