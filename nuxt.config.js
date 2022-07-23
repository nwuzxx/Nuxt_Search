require('events').EventEmitter.defaultMaxListeners = 0
module.exports = {
    /*
     ** Headers of the page
     */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy'
    ],

    axios: {
        proxy: true,
        prefix: '', // baseURL
        credentials: true,
    },

    env: {
        baseUrl:  'http://172.18.7.48:8050'
    },

    //proxy: {
        //财务查询微服务代理
        // '/fms': {
        //     target: 'http://localhost:8012', // 代理地址
        //     changeOrigin: true,
        //     logLevel: 'debug',
        //     pathRewrite: {
        //         '^/fms': '/fms', // 将 /api 替换掉
        //     },
        // },
        // '/*': {
        //     target: 'http://localhost:8050', // 代理地址
        //     changeOrigin: true,
        //     logLevel: 'debug',
        //     pathRewrite: {
        //         '^/': '/', // 将 /api 替换掉
        //     },
        // },
        //用户单点登录 nwucenter
        // '/nwucenter': {
        //     target: 'http://localhost:8026', // 代理地址
        //     logLevel: 'debug',
        //     pathRewrite: {
        //         '^/nwucenter': '/nwucenter', // 将 /api 替换掉
        //         changeOrigin: true
        //     },
        // },
        //藏品图片上传
        // '/collImage': {
        //     target: 'http://localhost:8027', // 代理地址
        //     logLevel: 'debug',
        //     pathRewrite: {
        //         '^/collImage': '/collImage', // 将 /api 替换掉
        //         changeOrigin: true
        //     },
        // },


        //藏品入库微服务代理
        // '/cem': {
        //     target: 'http://localhost:8021', // 代理地址
        //     logLevel: 'debug',
        //     pathRewrite: {
        //         '^/cem': '/cem', // 将 /api 替换掉
        //         changeOrigin: true
        //     },
        // },
        //仓单管理微服务代理
        // '/wm': {
        //     target: 'http://localhost:8022', // 代理地址
        //     logLevel: 'debug',
        //     pathRewrite: {
        //         '^/wm': '/wm', // 将 /api 替换掉
        //         changeOrigin: true
        //     },
        // },
        //藏品出库微服务代理
        // '/com': {
        //     target: 'http://localhost:8023', // 代理地址
        //     logLevel: 'debug',
        //     pathRewrite: {
        //         '^/com': '/com', // 将 /api 替换掉
        //         changeOrigin: true
        //     },
        // },

        //后台微服务管控代理
        // '/icp': {
        //     target: 'http://localhost:8002', // 代理地址
        //     changeOrigin: true,
        //     logLevel: 'debug',
        //     pathRewrite: {
        //         '^/icp': '/icp', // 将 /api 替换掉
        //     },
        // },
    //},
    plugins: [{
        src: '~/plugins/nuxt-swiper-plugin.js',
        ssr: false
    },
    {
        src: '~/plugins/element-ui.js',
        ssr: true,
    }
    ],
    css: [
        'swiper/dist/css/swiper.css',
        'element-ui/lib/theme-chalk/index.css',
        '~assets/css/global.css',
        '~assets/css/collection.css',
        '~/assets/css/sign.css'
    ],

    head: {
        title: '国家博物馆',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '{{escape description }}' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#3B8070' },

    vendor: ['element-ui'],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** Run ESLint on save
         */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue|ttf)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}