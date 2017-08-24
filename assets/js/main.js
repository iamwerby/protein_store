
var categoryUl = document.getElementById('categoryselect'),
    productDisplay = document.getElementById('page-content-wrapper');

categoriesToSidebar(categoryUl,products); //вызов функции добавления категорий в сайдбар

var categoryA = document.querySelectorAll('li > a'); //ищет все категории в сайдбаре

for (var i=0; i<categoryA.length; i++) {
    categoryA[i].onclick = function () { //обрабатывает клик на категорию
        for (var key in products) {
            if (this.id == key) {
                $(productDisplay).empty();
                productNameShow(products, key, productDisplay);
            }
        }
        var productBtn = document.querySelectorAll('.list-group-item');
        for (var i = 0; i < productBtn.length; i++) {
            productBtn[i].onclick = function () { //обрабатывает клик на товар
                for (var key in products) {
                    for (var i = 0; i < products[key].length; i++) {
                        if (this.id == products[key][i].name) {
                            $(productDisplay).empty();
                            productDetailsShow(products, this.id, productDisplay);
                            var buyBtn = document.querySelectorAll('.buyBtn');
                            for (var i=0; i<buyBtn.length; i++){
                                buyBtn[i].onclick = function () { //обрабатывает клик на добавление товара в корзину
                                    userCartShow(products, this.id);
                                };
                            }
                        }
                    }
                }
            }
        }
    }
}

formCheks(); //вызов валидации полей формы





