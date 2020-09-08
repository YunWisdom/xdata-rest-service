/* eslint valid-jsdoc: "off" */
/* eslint-disable indent */
/* eslint-disable eol-last */
'use strict';

const redisStore = require('cache-manager-ioredis');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_0000_0000';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true,
        },
        domainWhiteList: ['*'],
    };

    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    };

    config.dbconfig = {
        user: 'meeting',
        password: 'meeting',
        server: '172.18.1.11',
        database: 'newecology',
        port: 1433,
        options: {
            encrypt: false,
            enableArithAbort: false,
        },
        pool: {
            min: 0,
            max: 10,
            idleTimeoutMillis: 3000,
        },
    };

    config.mailer = {
        host: 'smtp.exmail.qq.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'zhaoziyu@yunwisdom.club', // generated ethereal user
            pass: 'Miazzy@163.com', // generated ethereal password
        },
    };

    config.oss = {
        client: {
            accessKeyId: 'your access key',
            accessKeySecret: 'your access secret',
            bucket: 'your bucket name',
            endpoint: 'oss-cn-hongkong.aliyuncs.com',
            timeout: '60s',
        },
    };

    // 缓存配置
    config.cache = {
        default: 'memory',
        stores: {
            memory: {
                driver: 'memory',
                max: 100,
                ttl: 0,
            },
            redis: { // full config: https://github.com/dabroek/node-cache-manager-ioredis#single-store
                driver: redisStore,
                host: '172.18.254.95',
                port: 6379,
                password: '',
                db: 0,
                ttl: 600,
                valid: _ => _ !== null,
            },
        },
    };

    // oracle数据库连接配置
    config.oracle = {
        client: {
            user: 'user',
            password: 'password',
            connectString: 'localhost/orcl',
        },
    };

    // mysql数据库连接配置
    config.mysql = {
        // database configuration
        client: {
            // host
            host: '172.18.254.95',
            // port
            port: '3309',
            // username
            user: 'zhaoziyun',
            // password
            password: 'ziyequma',
            // database
            database: 'jeecg-boot',
        },
        // load into app, default is open
        app: true,
        // load into agent, default is close
        agent: false,
    };

    // mssql数据库连接配置
    config.mssql = {

        // Single Database
        client: {
            server: '172.18.1.11',
            port: '1433',
            user: 'meeting',
            password: 'meeting',
            database: 'newecology',
        },

        // Multi Databases
        // clients: {
        //   db1: {
        //     server: 'host',
        //     port: 'port',
        //     user: 'user',
        //     password: 'password',
        //     database: 'database',
        //   },
        //   db2: {
        //     server: 'host',
        //     user: 'user',
        //     password: 'password',
        //     database: 'database',
        //   },
        // },
    };

    // 反向代理配置
    // config.proxy = [{
    //     host: 'host1',
    //     match: /\/assets1/,
    // }, {
    //     host: 'host2',
    //     match: /\/assets2/,
    // }];

    // 网关代理配置
    config.httpProxy = {
        '/api': {
            target: 'http://www.example.org',
            pathRewrite: { '^/api': '/api' },
        },
    };

    // 网关代理配置
    config.httpproxy = {
        proxyTable: [{
                path: '/risws/',
                proxy: { target: 'http://t.vy01.com/MedTechWebService/', changeOrigin: true },
            },
            {
                path: '/zsapi/',
                proxy: { target: 'http://a.vy01.com/api/', changeOrigin: true },
            },
        ],
    };

    return {
        ...config,
        ...userConfig,
    };
};