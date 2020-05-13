const { exec } = require('promisify-child-process');

async function testingC(){

    let commando =await  exec(`curl -s "https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com" | jq "[ to_entries | .[] | {alg: ."RS256", kty: ."RSA", use: ."sig", kid: ."key", x5c: [(.value | @base64) ] } ] | {"keys": "."}"`)
            // console.log(commando);
            return commando
}

testingC().then( async res=> {
    let response = await JSON.parse(res.stdout)
    response.keys.forEach(element => {
        element.alg = 'RS256';
        element.kty = 'RSA';
        element.use = 'sig';
    });

}).catch( err => {
    console.log(err)
})