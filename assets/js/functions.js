function categoriesToSidebar(sidebar,obj) { //добавляет категории в сайдбар
    for (var key in obj){
        var categoryLi = document.createElement('li'),
            category = document.createElement('a');
        category.innerText = key;
        category.setAttribute('href','#');
        category.setAttribute('id',key);
        categoryLi.appendChild(category);
        sidebar.appendChild(categoryLi);
    }
}

function productNameShow (obj, category, page) { //выводит на экран названия товаров в категории
    var listGroup = document.createElement('div');
    listGroup.classList.add('list-group');
    for (var i=0; i < obj[category].length; i++){
        console.log(obj[category][i].name);
        var listGroupBtn = document.createElement('button');
        listGroupBtn.classList.add('list-group-item');
        listGroupBtn.setAttribute('id',obj[category][i].name);
        listGroupBtn.innerText = obj[category][i].name;
        listGroup.appendChild(listGroupBtn);
    }
    page.appendChild(listGroup);
}

function productDetailsShow (obj, name, page) { //пишет детали про выбранному товару
    for (var key in obj){
        for (var i=0; i < obj[key].length; i++){
            if (obj[key][i].name == name) {
                var divRow = document.createElement('div');
                divRow.classList.add('row');
                var divGrid = document.createElement('div');
                divRow.classList.add('col-md-4');
                divRow.appendChild(divGrid);
                var divThumb = document.createElement('div');
                divThumb.classList.add('thumbnail');
                divRow.appendChild(divThumb);
                var divH3 = document.createElement('h3');
                divH3.innerText = obj[key][i].name;
                divThumb.appendChild(divH3);
                var divImg = document.createElement('img');
                divImg.setAttribute('src', obj[key][i].img);
                divImg.setAttribute('heiht', '200'+'px');
                divImg.setAttribute('width', '100'+'px');
                divThumb.appendChild(divImg);
                var divP = document.createElement('p');
                divP.innerText = obj[key][i].description;
                divThumb.appendChild(divP);
                var divBuyBtn = document.createElement('button');
                divBuyBtn.classList.add('btn');
                divBuyBtn.classList.add('btn-primary');
                divBuyBtn.innerText = 'Add to Cart';
                divBuyBtn.setAttribute('id',obj[key][i].name);
                divBuyBtn.classList.add('buyBtn');
                divThumb.appendChild(divBuyBtn);
                page.appendChild(divRow);
            }
        }
    }
}

function userCartShow (obj, name){ //наполняет и вызывает модальное окно с корзиной
    var userCartTable = document.getElementById('userCartTable'),
        alertDiv = document.getElementById('alertDiv');
    $(userCartTable).empty();
    $(alertDiv).empty();
    document.getElementById('userForm').reset();
    for (var key in obj) {
        for (var i = 0; i < obj[key].length; i++) {
            if (obj[key][i].name == name) {
                var row = userCartTable.insertRow(0),
                    cell1 = row.insertCell(0),
                    cell2 = row.insertCell(1),
                    cell3 = row.insertCell(2),
                    cell4 = row.insertCell(3);
                cell1.innerText = obj[key][i].name;
                cell2.innerText = obj[key][i].price;
                cell3.innerText = '1';
                cell4.innerText =  obj[key][i].price * parseInt(cell3.innerText);
            }
        }
    }
    $('#userCart').modal();
}

function showAlert(alertText) { //отрисовывает алерт о ошибке ввода данных с переданным текстом ошибки
    var alert = document.createElement('div'),
        btnClose = document.createElement('button'),
        alertDiv = document.getElementById('alertDiv');

    alert.classList.add('alert');
    alert.classList.add('alert-danger');
    btnClose.classList.add('close');
    btnClose.setAttribute('type','button');
    btnClose.setAttribute('data-dismiss','alert');
    btnClose.setAttribute('aria-label','close');
    btnClose.innerHTML = '<span aria-hidden="true">&times;</span>';
    alert.innerText = alertText;
    alert.appendChild(btnClose);
    alertDiv.appendChild(alert);
}

function formCheks() { //функция валидации данных в имени и email
    $('#name').on('change', function () {
        if (!isNaN($('#name').val())){ //корявый способ проверить не ввел ли пользователь числа (нормально это делается regexp ом как я понял)
            showAlert('Oops! This does not look like a valid name!');
        }
    });

    $('#name').on('blur', function () {
        if ($('#name').val().length === 0){ //проверка на пустой ввод при уходе с поля
            showAlert('Name cannot be blank');
        }
    });

    $('#name').on('focus', function () { //сброс ошибок при фокусе на поле
        $('#alertDiv').empty();
    });

    $('#email').on('change', function () {
        if ($('#email').is(':invalid')){ //проверка на валидность формата email встроенным html5
            showAlert('Oops! This does not look like a valid email!');
        }
    });

    $('#email').on('blur', function () {
        if ($("#email").val().length === 0){
            showAlert('Email cannot be blank');
        }
    });

    $('#email').on('focus', function () {
        $('#alertDiv').empty();
    });
}