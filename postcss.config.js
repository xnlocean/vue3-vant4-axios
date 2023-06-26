// postcss.config.js
module.exports = {
    plugins: {
        // postcss-pxtorem 插件的版本需要 >= 5.0.0
        'postcss-pxtorem': {
            rootValue({ file }) {
                if(file.includes('vant')||file.includes('nut')){
                    return  37.5
                }else{
                    return  75
                }
            },
            propList: ['*'],
        },
    },
}