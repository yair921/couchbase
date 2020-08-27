const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const NodeCouchDb = require('node-couchdb')


// const couch = new NodeCouchDb({
//         host:'127.0.0.1',
//         protocol: 'http',
//         port:8091
// })

// const couch = new NodeCouchDb({
//     host:'couchbase://production-srv.default.svc.cluster.local',
//     protocol: 'http',
//     port:8091
// })


// const couch = new NodeCouchDb({
//     auth:{
//         host:'http://127.0.0.1',
//         protocol: 'http',
//         user:'Administrator',
//         password:'password',
//         port:8091
//     }
// })




// couch.createDatabase('dbTest').then(res => {
//     console.log(res)
// }).catch(error=>{
//     console.log(error)
// });

// couch.listDatabases().then((dbs)=>{
//     console.log('Connection successfully..');
//     console.log(dbs)
// }).catch(e=>{
//     console.log(`Error in connection ${e}`)
// })

function couchdb(req, res){
    let host = req.query.host;
    try {
        var couchbase = require('couchbase');
        var cluster = new couchbase.Cluster(host, {
            username: 'Administrator',
            password: 'password',
        });
        var bucket = cluster.bucket('default');
        var coll = bucket.defaultCollection();
        
        coll.upsert('keyPrimary123', { name: 'Frank' }, (err) => {
            if (err) {
                console.log(`Error upsert: ${err}`)
                res.send({
                    host,
                    error:`Error upsert: ${err}`
                })
            }else{
                coll.get('keyPrimary123', (err, data) => {
                    if (err) {
                        console.log(`Error get: ${err}`)
                        res.send({
                            host,
                            error:`Error get: ${err}`
                        })
                    }else{
                        console.log(`The response get --> ${data.value}`);
                        res.send({
                            host,
                            error:`Response get --> : ${JSON.stringify(data.value)}`
                        })
                        // {name: Frank}
                    }
                });
            }
        });
    } catch (error) {
        console.log(`Unexpected error: ${error}`)
        res.send({
            host,
            error:`Unexpected error: ${error}`
        })
    }
}

            
const app = express();

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    couchdb(req, res);
})

app.listen(3000,()=>{
    console.log('Server running on port 3000...')
})
