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
var funcionesApp={
    login: function(req, res){ /*.. algo que hace login */ },
    menu: function(req, res){ /*.. algo que hace menu */ },
}

var pg = require('pg-promise-strict');

function startServerWithOwerLibrary(config){
    app.use('/login',funcionesApp.login);
    pg.connect(config).then(function(client){
        return client.query('select nombre_servicio, nombre_funcion from procesos');
    }).then(function(result){
        for(var i=0; i<result.rowCount; i++){
            var row=result.rows[i];
            app.use(row.nombre_servicio, funcionesApp[row.nombre_funcion]);
        }
    }).catch(function(err){
        console.log('ERROR',err);
    });
}
```