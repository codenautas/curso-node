#Promesas 

Si todo está basado en promesas:

solo se necesita
  * Para encadenar:
    * `.then`
    * `.catch`
  * Si se necesita devolver algo sin procesar:
    * `.resolve`
    * `.reject`

## Cómo se usa Promesas con librerías que ya implementan promesas

```js

var fs = require('fs-promise');

var encoding = {encoding: 'utf8'};

return fs.exist('config.json').then(function(existe){
    if(existe){
        return fs.readFile('config.json', encoding).then(JSON.parse).then(function(data){
            return data;
        }
    }else{
        return configDefault;
    }
}).then(function(config){
    startServerWithOwerLibrary(config);
}).catch(function(err){
    console.log('error irrecuperable');
})

```

Sin el exists. 

```js

return fs.readFile('config.json',encoding).then(JSON.parse).catch(function(err){
    // tipico error recuperable, si no pude leer porque no existe uso el default. 
    if(err.code!=='ENOENT'){
        throw err;
    }
    return configDefault;
}).then(function(config){
    startServerWithOwerLibrary(config);
}).catch(function(err){
    console.log('error irrecuperable');
})

```

## Vamos con otro ejemplo basado en Base de datos:

```js

var pg = require('pg-promise-strict');

var tablaPersonas={
    publicFieldsNames:['dni','nombre','apellido']
};

function startServerWithOwerLibrary(config){
    app.use('/personas/new/save',function(req, res){
        var theClient;
        pg.connect(config).then(function(client){
            theClient=client;
            console.log(req.query); // {dni:'99999', name:...}
            return client.query(
                'insert into esq.personas ('+tablaPersonas.publicFieldsNames.join(',')+') values ('+
                    tablaPersonas.publicFieldsNames.map(function(nombreCampo, pos){ return '$'+pos; })+')',
                tablaPersonas.publicFieldsNames.map(function(nombreCampo, pos){ return req.query[nombreCampo]||null; })
            );
        }).then(function(result){
            if(result.rowCount!==1){
                throw new Error('No se pudo insertar la persona por un error no especificado en la base de datos');
            }
            res.end(200,'Se inserto una persona');
        }).catch(function(err){
            console.log('ERROR',err);
            res.end(500,'Error al insertar la persona\n'+err.message);
        }).then(function(){
            theClient.done();
        });
    });
}
```

## sin promesas, con callbacks

```js

var pg = require('pg');


function startServerWithOwerLibrary(config){
    app.use('/personas/new/save',function(req, res){
        pg.connect(config, function(err, client, done){
            function enCasoDeError(err){
                console.log('ERROR',err);
                res.end(500, 'Error al insertar la persona\n'+err.message);
                done();
            }
            if(err){
                enCasoDeError(err);
                return ;
            }
            console.log(req.query); // {dni:'99999', name:...}
            return client.query(
                'insert into esq.personas ('+tablaPersonas.publicFieldsNames.join(',')+') values ('+
                    tablaPersonas.publicFieldsNames.map(function(nombreCampo, pos){ return '$'+pos; })+')',
                tablaPersonas.publicFieldsNames.map(function(nombreCampo, pos){ return req.query[nombreCampo]||null; }),
                function(err, result){
                    if(err){
                        enCasoDeError(err);
                        return ;
                    }
                    if(result.rowCount!==1){
                        enCasoDeError(new Error('No se pudo insertar la persona por un error no especificado en la base de datos'));
                        return ;
                    }
                    res.end(200,'Se inserto una persona');
                }
                done();
            );
        });
    });
}```


## Mixto, con promesas usando librerías que no tienen promesas, o sea como transformar callbacks en promesas. 

```js

var pg = require('pg');


function startServerWithOwerLibrary(config){
    app.use('/personas/new/save',function(req, res){
        var theClient;
        new Promise(function(resolve, reject){
            pg.connect(config, function(err, client, done){
                if(err){
                    reject(err);
                    return;
                }
                client.done=done;
                resolve(client);
            });
        }).then(function(client){
            theClient=client;
            console.log(req.query); // {dni:'99999', name:...}
            return new Promise(function(resolve, reject){
                client.query(
                    'insert into esq.personas ('+tablaPersonas.publicFieldsNames.join(',')+') values ('+
                        tablaPersonas.publicFieldsNames.map(function(nombreCampo, pos){ return '$'+pos; })+')',
                    tablaPersonas.publicFieldsNames.map(function(nombreCampo, pos){ return req.query[nombreCampo]||null; }),
                    function(err, result){
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    }
                );
            });
        }).then(function(result){
            if(result.rowCount!==1){
                throw new Error('No se pudo insertar la persona por un error no especificado en la base de datos');
            }
            res.end(200,'Se inserto una persona');
        }).catch(function(err){
            console.log('ERROR',err);
            res.end(500,'Error al insertar la persona\n'+err.message);
        }).then(function(){
            theClient.done();
        });
    });
}
```

## ejemplo con wrapErrRes 

```js

var pg = require('pg');


function startServerWithOwerLibrary(config){
    app.use('/personas/new/save',function(req, res){
        var theClient;
        new Promise(function(resolve, reject){
            pg.connect(config, function(err, client, done){
                if(err){
                    reject(err);
                    return;
                }
                client.done=done;
                resolve(client);
            });
        }).then(function(client){
            theClient=client;
            console.log(req.query); // {dni:'99999', name:...}
            client.queryPromise=Promises.wrapErrRes(client.query);
            return client.queryPromise(
                'insert into esq.personas ('+tablaPersonas.publicFieldsNames.join(',')+') values ('+
                    tablaPersonas.publicFieldsNames.map(function(nombreCampo, pos){ return '$'+pos; })+')',
                tablaPersonas.publicFieldsNames.map(function(nombreCampo, pos){ return req.query[nombreCampo]||null; })
            );
        }).then(function(result){
            if(result.rowCount!==1){
                throw new Error('No se pudo insertar la persona por un error no especificado en la base de datos');
            }
            res.end(200,'Se inserto una persona');
        }).catch(function(err){
            console.log('ERROR',err);
            res.end(500,'Error al insertar la persona\n'+err.message);
        }).then(function(){
            theClient.done();
        });
    });
}
```


```js
    o.f=function(query, data, callback){ .... }
    g=Promises.wrapErrRes(o.f);
    g.call(o, query, data);
    g.apply(o, [query, data]);
    