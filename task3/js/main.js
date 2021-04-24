const btn_search = document.querySelector('.btn-search');
let image_result = document.querySelector('.image-result');

function useRequest(url, callback) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            if (callback) {
                const result = JSON.parse(xhr.response);
                callback(result);
            }
        }
    };
    xhr.onerror = function() {
        console.log('Ошибка запроса!');
    }
    xhr.send();
}

function showImages(objImages) {
    let imageBlocks = '';
    for (image of objImages) {
        imageBlocks += `
            <div class="image">
                <img class="image-card" src="${image.download_url}">
            </div>
            <p>${image.author}</p>`
    }
    image_result.innerHTML = imageBlocks;
}


function findImages() {
    btn_search.addEventListener('click', function() {
        let number = document.querySelector('.input-number').value;
        if(number < 1 || number > 10) {
            alert('Число вне диапазона от 1 до 10');
        } else {
            const url = `https://picsum.photos/v2/list?limit=${number}`;
            useRequest(url, showImages);
        }
    });
}

findImages();