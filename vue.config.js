module.exports = {
    devServer : {
        proxy : {
            '/board' : {
                target : 'http://127.0.0.1:3000',
                changeOrigin :true,
                logLevel : 'debug'
            },
            '/member' : {
                target : 'http://127.0.0.1:3000',
                changeOrigin :true,
                logLevel : 'debug'
            },
        }
    }    
};

