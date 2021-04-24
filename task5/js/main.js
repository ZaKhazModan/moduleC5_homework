const btnQuery = document.querySelector('.btn-query');
let imageResult = document.querySelector('.image-result');
imageResult.innerHTML = localStorage.getItem('images');

const useRequest = (pageNumber, limit) => {
    return fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => { return json; }) 
        .catch(() => { console.log('error') });
}

btnQuery.addEventListener('click', async () => {
    const pageNumber = Number.parseInt(document.querySelector('.page-number').value);
    const imageLimit = Number.parseInt(document.querySelector('.image-limit').value);
    const correctPageNumber = pageNumber >= 1 && pageNumber <= 10;
    const correctImageLimit = imageLimit >= 1 && imageLimit <= 10;
    if (!correctImageLimit && !correctPageNumber) {
        alert('Номер страницы и лимит вне диапазона от 1 до 10');
    } 
    else if (!correctPageNumber) {
        alert('Номер страницы вне диапазона от 1 до 10');
    }
    else if (!correctImageLimit) {
        alert('Лимит вне диапазона от 1 до 10')
    }
    else {
        const queryResult = await useRequest(pageNumber, imageLimit);
        let imageBlocks = '';
        for (image of queryResult) {
            imageBlocks += `
                <div class="image">
                    <img class="image-card" src="${image.download_url}">
                </div>
                <p>${image.author}</p>`
        }
        imageResult.innerHTML = imageBlocks;
        localStorage.setItem('images', imageBlocks);
    }
})