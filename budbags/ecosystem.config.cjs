module.exports = {
  apps: [
    {
      name: 'budbags',
      cwd: __dirname,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3152',
      env: {
        NODE_ENV: 'production',
        PORT: '3152',
        QUOTE_TO_EMAIL: 'marc@bagsupplyco.com',
        QUOTE_FROM_EMAIL: 'quotes@budbags.net',
      },
    },
  ],
}
