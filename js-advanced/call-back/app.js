const callback = (error, data)=>{
    if(error){
        console.log('>>> calling callback with error', error);
    }
    if(data){
        console.log('>>> calling callback with data', data);
    }
}
function getTodos (callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        const data = JSON.parse(xhttp.responseText);
        callback(undefined, data);
    }
    if (this.readyState == 4 && this.status != 200) {
        callback('something wrong',undefined);
    }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();
}
getTodos(callback);