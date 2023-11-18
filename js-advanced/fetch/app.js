fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())// chuyen kieu du lieu sang dang js
    .then(function(posts) {
        var news = document.getElementById('demo');
        var newHtml = posts.map((Element, index)=>{
            return`
            <h1>${Element.title}</h1>
            <p>${Element.body}</p>
            `;
        });
        
        news.innerHTML = newHtml.join('');
    })
    .catch((err)=>{console.log(err);})