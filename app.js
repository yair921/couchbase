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


var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://production-srv', {
    username: 'Administrator',
    password: 'password',
});
var bucket = cluster.bucket('default');
var coll = bucket.defaultCollection();
    
coll.upsert('key', { name: 'Frank' }, (err, res) => {
if (err) {
    console.log(`Error upsert: ${err}`)
}else{
    coll.get('key', (err, res) => {
        if (err) {
            console.log(`Error get: ${err}`)
        }else{
            console.log(`The response get --> ${res.value}`);
            // {name: Frank}
        }
    });
}
});

            

// const app = express();

// app.set('view engine','ejs')
// app.set('views',path.join(__dirname,'views'))

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}))

// app.get('/',(req,res)=>{
//     res.send('Working...')
// })

// app.listen(3000,()=>{
//     console.log('Server running on port 3000...')
// })
