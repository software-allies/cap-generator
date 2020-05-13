const { exec } = require('promisify-child-process');

async function testingC(){

    let commando =await  exec(`curl -s "https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com" | jq "[ to_entries | .[] | {alg: ."RS256", kty: ."RSA", use: ."sig", kid: ."key", x5c: [(.value | @base64) ] } ] | {"keys": "."}"`)
            // console.log(commando);
            return commando
}

testingC().then( async res=> {
    let response = await JSON.parse(res.stdout)
    console.log('BEfore', response.keys )
    response.keys[0].alg = 'RS256';
    response.keys[0].kty = 'RSA';
    response.keys[0].use = 'sig';
    console.log('After' ,response.keys)   

}).catch( err => {
    console.log(err)
})