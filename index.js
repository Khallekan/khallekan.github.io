const searchBar = document.getElementById('searchBar');
const input = document.getElementById('input');
const button = document.getElementById('button');
const result = document.getElementById('result');

const checkUserInput = () => {
    return input.value.length;
}
const clearDOM = () => {
    return result.innerHTML = ''
}

const fetchResults = async (inputValue) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=30&srsearch=%27${inputValue}`;
    const resp = await fetch(url);
    if (!resp.ok) {
        throw Error(resp.statusText);
    }
    const data = resp.json();
    return data;
};

const resultsOnPage = (data) => {
    result.insertAdjacentHTML(
        "beforeend",
        `<h2>Showing results for ${input.value}</h2>`
    )
    data.query.search.map(array => {
        const url = `https://en.wikipedia.org/?curid=${array.pageid}`;
        const resultTitle = array.title;
        const resultSnippet = array.snippet;
        return result.insertAdjacentHTML(
            `beforeend`,
            `<hr/>
            <div>
            <h3><a href="${url}" target="_blank" rel="noopener">${resultTitle}</a></h3>
            <p>${resultSnippet}</p>
            </div>
            <hr/>`
        )
    })    
}

const doSomething = async () => {
    const inputValue = input.value.split(' ').join('_');
    try {
        let wikiResults = await fetchResults(inputValue);
        resultsOnPage(wikiResults);
    } catch (error) {
        console.log(error);
        alert("I regret to admit that I have failed you curious one! :(");    
    }
}
const sROC =  () => {
    if(checkUserInput() === 0) {
        clearDOM();
        return result.insertAdjacentHTML("beforeend", `<h3>That is invalid</h3>`);
    }else{
        clearDOM();
        doSomething();
    }
}

const sRAKP = (e) => {
    if(checkUserInput() === 0 && e.which === 13 ) {
        clearDOM();
        return result.insertAdjacentHTML("beforeend", `<h3>That is invalid</h3>`);
    }else if(checkUserInput() > 0 && e.which === 13) {
        clearDOM();
        doSomething();
    }
}

button.addEventListener('click', sROC); //show results on click
input.addEventListener('keypress', sRAKP) //show results after key press(sRAKP)