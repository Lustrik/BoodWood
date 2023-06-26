// Страница: https://boodwood.ru/catalog
// Задача: добавить кнопку "Вся коллекция" к каждой карточке с товаром в каталоге, при нажатии на которую открывается страница соответствующей коллекции товаров.

function addButton(buttonBlock, collectionRusName) {
    let collectionsLinks = {
        'ВЕСЕННИЙ ЗАКАТ': 'https://boodwood.ru/springsunset',
        'ГОРОД ЦВЕТОВ': 'https://boodwood.ru/cityofflowers',
        'ЗИМНИЙ ВЕЧЕР': 'https://boodwood.ru/winterevening',
        'ИРИСКА': 'https://boodwood.ru/iriska',
        'СОЛНЕЧНОЕ ЛЕТО': 'https://boodwood.ru/sunnysummer',
        'КОСМОС': 'https://boodwood.ru/space'
    };
    buttonBlock.insertAdjacentHTML('beforeEnd',
        `<a href="${collectionsLinks[collectionRusName]}" class="js-store-prod-btn2 t-store__card__btn t-store__card__btn_second t-btn t-btn_sm"
        style="color:#ffffff; background-color:#48a43f; border-radius:12px; -moz-border-radius:12px; -webkit-border-radius:12px;"
        ><span class="t-store__card__btn-text">ВСЯ КОЛЛЕКЦИЯ</span></a>`);
}

function loadButtons() {        
    let timerId = setInterval(() => {
        if (document.querySelector('.js-store-buttons-wrapper')) {
    
            let pieces = catalogContent.split ('group_id="');
            //разбили строку на куски, сделали из них массив. Отбросили первый элемент:
            pieces.splice(0,1); //удалили 1 элемент начиная с нулевого индекса

            let collections = {};
        
            pieces.forEach(piece => {
                let index = piece.indexOf('<param name="Коллекция">'); //24 символа
                let cutStart = index + 24;
                let cutString = piece.slice(cutStart);
                let index2 = cutString.indexOf('<');
                let collectionName = cutString.slice(0, index2);
                let itemID = piece.substring(0, 12);
                if (index === -1) {
                    collections[itemID] = '';
                } else {
                    collections[itemID] = collectionName;
                }
            });

            //let popUpButtonPlace = document.querySelector('.t-store__prod-popup__text'); //нашли поп-ап товаров

            let buttonsBlock = document.querySelectorAll('.js-store-buttons-wrapper'); //нашли блок кнопок
            buttonsBlock.forEach(buttonBlock => {
                let prodBlock = buttonBlock.closest('.t-store__card'); //нашли род блок кнопок
                let lid = prodBlock.dataset.productGenUid; //взяли id товара
                let collection = collections[lid];
                if (collection) {
                    addButton(buttonBlock, collection);
                }
            });

            clearInterval(timerId);
        } else {
            console.log('Popup is not loaded yet.')
        }
    }, 500);
}

loadButtons();

document.addEventListener('click', event => {
    let target = event.target;
    if (
        target.closest('.js-pagination-item') ||
        target.closest('.js-store-parts-switcher') ||
        target.closest('.t-store__filter__custom-sel')    
    ) {
        loadButtons();
    };
})
