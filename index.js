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
        `<h2 class="font">Showing results for ${input.value}</h2>`
    )
    data.query.search.map(array => {
        const url = `https://en.wikipedia.org/?curid=${array.pageid}`;
        const resultTitle = array.title;
        const resultSnippet = array.snippet;
        return result.insertAdjacentHTML(
            `beforeend`,
            `<hr/>
            <div class="font">
            <h3 ><a href="${url}" target="_blank" rel="noopener">${resultTitle}</a></h3>
            <p>${resultSnippet}</p>
            </div>
            <hr/>`
        )
    })    
}

const searchWiki = async () => {
    const inputValue = input.value.split(' ').join('_');
    try {
        let wikiResults = await fetchResults(inputValue);
        resultsOnPage(wikiResults);
    } catch (error) {
        console.log(error);
        alert("I regret to admit that I have failed you curious one! :(");    
    }
}

const returnInvalid = () => result.insertAdjacentHTML("beforeend", `<h3 class="font">That is invalid</h3>`);

//searches after hitting the search button
const sROC =  () => {
    if(checkUserInput() === 0) {
        clearDOM();
        returnInvalid();
    }else{
        clearDOM();
        searchWiki();
    }
}
//searches after hitting the enter key
const sRAKP = (e) => {
    if(checkUserInput() === 0 && e.which === 13 ) {
        clearDOM();
        returnInvalid();
    }else if(checkUserInput() > 0 && e.which === 13) {
        clearDOM();
        searchWiki();
    }
}

button.addEventListener('click', sROC); //show results on click
input.addEventListener('keypress', sRAKP) //show results after key press(sRAKP)