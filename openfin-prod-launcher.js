const openfinLauncher = require('openfin-launcher');

openfinLauncher.launchOpenFin({
    configPath: 'http://localhost:5001/app.json'
})
.then(() => {
    console.log('success!');
})
.catch(console.error);
