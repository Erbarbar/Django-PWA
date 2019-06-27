//Open new IndexedDB conncetion.    
    var dbPromise = idb.open('djangopwa-db', 5, function(upgradeDb) {  
        upgradeDb.createObjectStore('tables',{keyPath:'pk'});  
    }); 


 //collect latest post from server and store in idb.    
fetch('/get_table').then(function(response){  
    return response.json(); 
}).then(function(jsondata){ 
    dbPromise.then(function(db){    
        var tx = db.transaction('tables', 'readwrite');    
        var feedsStore = tx.objectStore('tables'); 
        for(var key in jsondata){   
            if (jsondata.hasOwnProperty(key)) { 
                feedsStore.put(jsondata[key]);      
            }   
        }
        return db; 
    }).then(function(db){    
        var content = document.getElementById("content");
        var transaction = db.transaction('tables', 'readonly');    
        var objectStore  = transaction.objectStore('tables');  
        objectStore.openCursor().then(function logItems(cursor){    
            if(cursor){ 
                var entry = document.createElement('a');  
                entry.href = "/" + cursor.key;  
                entry.innerHTML = "<h3>" + cursor.value.fields.text + "</h3>";    
                content.appendChild(entry);    
                content.appendChild(document.createElement('br'));  
                content.appendChild(document.createElement('hr'));  

                 return cursor.continue().then(logItems);   
            }   
        }); 
    });
}); 
