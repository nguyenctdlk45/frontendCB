const getTodo = async () =>{
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();
    return data;
}
getTodo().then(posts =>{ // posts == data owr dong 4
    var news = document.getElementById('demo');
        var newHtml = posts.map((Element, index)=>{
            return`
            <h1>${Element.title}</h1>
            <p>${Element.body}</p>
            `;
        });
        
        news.innerHTML = newHtml.join('');
}
)