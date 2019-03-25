module.exports={
    presets:[
        [
            "@babel/preset-env",
            {
                targets:{
                    "browsers":["last 3 versions","ie>=9"]
                },
                useBuiltIns:"entry",
                debug:false
            }
        ]
    ]
}