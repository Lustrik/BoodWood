//Страница: https://boodwood.ru/catalog -> карточки товаров в попап
//Задача: добавить галерею товаров коллекции в карточки товаров, которые открываются в попапе каталога при нажатии на кнопку "Подробнее"

function cutPiece(piece, text, textEnd) {
    let index = piece.indexOf(text);
    let length = text.length;
    let cutStart = index + length;
    let cutString = piece.slice(cutStart);
    let index2 = cutString.indexOf(textEnd);
    let name = cutString.slice(0, index2);
    return name;    
}

document.addEventListener('click', event => {
    if (event.target.classList.contains('js-store-prod-btn') || event.target.classList.contains('t-store__card__btn-text')) {
        console.log(event.target);
       
        let timerId = setInterval(() => {
            if (document.querySelector('.js-store-buttons-wrapper')) {
                let pieces = catalogContent.split('group_id="'); //разбили строку на куски
                pieces.splice(0, 1); //удалили 1 элемент

                let collections = {};
                let itemBlocks = {};
                
                pieces.forEach(piece => {
                    let itemID = piece.substring(0, 12);
                    let index = piece.indexOf('<param name="Коллекция">');
                    if (index == -1) {
                        let collectionName = "";
                        collections[itemID] = collectionName;
                        let itemBlock = "";
                        itemBlocks[itemID] = itemBlock;

                    } else {

                        let cutStart = index + 24;
                        let cutString = piece.slice(cutStart);
                        let index2 = cutString.indexOf('<');
                        let collectionName = cutString.slice(0, index2);
                        collections[itemID] = collectionName;

                        let link = cutPiece(piece, 'url>','<');
                        let categoryId = cutPiece(piece, 'categoryId>','<');
                        let picture = cutPiece(piece, 'picture>', '<');
                        let price1 = cutPiece (piece, 'price>', '<');
                        let price = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0, useGrouping: true }).format(price1);
                        let size = cutPiece (piece, 'Размер:', ']');
                        let vendorCode = cutPiece (piece, 'Размер:', '<');
                        let itemName = cutPiece (piece, '<name>', '<');
                        
                        let itemBlock = `
    <div class="js-product t-store__card t-col t-col_3 t-align_left js-product-relevant t-item"
        data-product-inv="" 
        data-product-lid="${itemID}"
        data-product-uid="${itemID}"
        data-product-gen-uid="${itemID}" 
        data-product-pack-label="lwh" data-product-pack-m="0" data-product-pack-x="0" data-product-pack-y="0"
        data-product-pack-z="0" 
        data-product-url="${link}"
        data-product-part-uid="${categoryId}"
        data-card-size="small"
        data-product-img="${picture}">
            <a href="${link}" tabindex="-1">    
                <div class="t-store__card__imgwrapper " style="padding-bottom:77.77777777777777%;">
                    <div class="js-product-img t-store__card__bgimg t-store__card__bgimg_hover t-bgimg loaded"
                        data-original="${picture}" 
                        bgimgfield="st_gallery__${itemID}:::0" 
                        style="background-image: url(&quot;${picture}&quot;);">
                    </div>
                    <div class="t-store__card__bgimg_second t-bgimg loaded" 
                        data-original="${picture}" 
                        style="background-image: url(&quot;${picture}&quot;);">
                    </div>
                </div>    
                <div class="t-store__card__textwrapper" style="height: 205px;">
                    <div class="js-store-prod-name js-product-name t-store__card__title t-name t-name_md"
                        style="font-size:25px;line-height:1.15;font-weight:700;"
                        field="st_title__${itemID}"
                        data-redactor-toolbar="no">${itemName}</div>
                    <div class="t-store__card__sku t-descr t-descr_xxs" style="display:none;">Артикул: 
                        <span class="js-store-prod-sku js-product-sku notranslate" translate="no"
                            field="st_sku__${itemID}" data-redactor-toolbar="no">${vendorCode}</span>
                    </div>
                    <div class="js-store-prod-descr t-store__card__descr t-descr t-descr_xxs"
                        style="font-size:21px;line-height:1.15;"
                        field="st_descr__${itemID}"
                        data-redactor-toolbar="no">Размер: ${size}</div>
                    <div class="js-store-price-wrapper t-store__card__price-wrapper">
                        <div class="t-store__card__price t-store__card__price-item t-name t-name_xs"
                            style="font-size:21px;font-weight:600;">
                            <div class="js-product-price js-store-prod-price-val t-store__card__price-value notranslate"
                                translate="no" field="st_price__${itemID}" data-redactor-toolbar="no" 
                                data-product-price-def="${price}"
                                data-product-price-def-str="${price}">${price}</div>
                            <div class="t-store__card__price-currency">р.</div>
                        </div>
                        <div class="t-store__card__price_old t-store__card__price-item t-name t-name_xs"
                        style="display: none;font-size:21px;font-weight:600;">
                            <div class="js-store-prod-price-old-val t-store__card__price-value notranslate" translate="no"
                                field="st_priceold__${itemID}" data-redactor-toolbar="no"></div>
                            <div class="t-store__card__price-currency">р.</div>
                        </div>
                    </div>
                </div>
            </a>
            <div class="js-product-controls-wrapper t-store__card__prod-controls-wrapper" style="display:none;"></div>
            <div class="t-store__card__btns-wrapper js-store-buttons-wrapper">
                <a href="${link}" class="js-store-prod-btn t-store__card__btn t-btn t-btn_sm"
                    style="color:#ffffff;background-color:#48a43f;border-radius:12px; -moz-border-radius:12px; -webkit-border-radius:12px;"
                    tabindex="-1"><span class="t-store__card__btn-text">ПОДРОБНЕЕ</span>
                </a>
            </div>
    </div>`;

                        itemBlocks[itemID] = itemBlock;
                    }                

                });

              let itemBlock = document.querySelector('.js-store-prod-charcs')
                
                if (itemBlock) {
                    let itemCollection = itemBlock.innerHTML;
                    let itemCollName = itemCollection.slice(11); //взяли название коллекции из карточки товара в попапе

                    let blockCollection = document.querySelectorAll('.js-product.t-store__card.t-col.t-col_3.t-align_left.js-product-relevant.t-item');
console.log(blockCollection);
                    let counter = 0;
                    console.log(counter);

                    for (let key in collections) {

                        if (collections[key] == itemCollName) {
                            blockCollection[counter].innerHTML = itemBlocks[key];
                            console.log(blockCollection[counter]);
                            counter++;
                            if (counter == 10) {
                                break;
                            }
                        }
                    };
                } else {

                    let blockCollection = document.querySelectorAll('.js-product.t-store__card.t-col.t-col_3.t-align_left.js-product-relevant.t-item');
                    for (let counter = 0; counter < blockCollection.length; counter++) {
                        blockCollection[counter].innerHTML = "";                    
                    }
                }

                
                clearInterval(timerId);
                
            } else {
                console.log('System is not ready yet.')
            }
        }, 500);
    }
})
