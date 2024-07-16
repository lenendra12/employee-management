window.indexedDB = window.indexedDB;

window.IDBTransaction = window.IDBTransaction;

const empData = [
    // {id: 1, name : "jason" , position: "FullStack Developer" , fromDate : "20/4/2022", toDate: "20/04/23"},
    // {id: 2, name : "lokesh" , position: "Frontend Developer" , fromDate : "21/4/2022", toDate: ""},
    // {id: 3, name : "tarun" , position: "Backend Developer" , fromDate : "22/4/2022", toDate: ""},
    // {id: 4, name : "pranith" , position: "UI Developer" , fromDate : "23/4/2022", toDate: "23/4/23"}
 ];

if(!window.indexedDB ) {
    alert('Your browser does not support to indexDB');
}

var db;
var request = window.indexedDB.open('employee', 1);

request.onerror = function(event) {
    console.log('error' + event.target.result);
}

request.onsuccess = function(event) {
    db = event.target.result;
    console.log('success' + db);
}

request.onupgradeneeded = function(event){
    var db = event.target.result;
    var objectStore = db.createObjectStore("employeeDb", { keyPath :"id", autoIncrement: true });
    objectStore.createIndex("id", "id", { unique: false });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("position", "position", { unique: false });
    objectStore.createIndex("fromDate", "fromDate", { unique: false });
    objectStore.createIndex("toDate", "toDate", { unique: false });
    objectStore.transaction.oncomplete = event => {
       var objectStore = db.transaction("employeeDb", "readwrite").objectStore("employeeDb");
       empData.forEach(function(emp) {
          objectStore.add(emp);
       });
    };
}