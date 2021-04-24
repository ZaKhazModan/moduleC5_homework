const btn_search = document.querySelector('.btn-search');
let image_result = document.querySelector('.image-result');

const useRequest = (width, height) => {
    return fetch(`https://picsum.photos/${width}/${height}`)
        .then((response) => {
            console.log(response);
            return response.url;
        })
        .then((url) => { return url; }) 
        .catch(() => { console.log('error') });
}

btn_search.addEventListener('click', async () => {
    let width = Number.parseInt(document.querySelector('.width').value);
    let height = Number.parseInt(document.querySelector('.height').value);
    if (width >= 100 && height <= 300 && height >= 100 && height <= 300) {
        const requestResult = await useRequest(width, height);
        image_result.innerHTML = `<img class="find-image" src="${requestResult}">`
        console.log('requestResult', requestResult);
    } else {
        alert('Одно из чисел вне диапазона от 100 до 300')
    }
})