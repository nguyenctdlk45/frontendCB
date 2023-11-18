// const callback = (error, data)=>{
//     if(error){
//         console.log('>>> calling callback with error', error);
//     }
//     if(data){
//         console.log('>>> calling callback with data', data);
//     }
// }
function getTodos(id) {
    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(xhttp.responseText);
                // callback(undefined, data);
                resolve(data);
            }
            if (this.readyState == 4 && this.status != 200) {
                // callback('something wrong', undefined);
                reject('error');
            }
        };
        xhttp.open("GET", `https://jsonplaceholder.typicode.com/todos/${id}`, true);
        xhttp.send();
    })

}
getTodos(1).then(data1=>{
    console.log(data1);
    return getTodos(2);
}).then(data2=>{
    console.log(data2);
})