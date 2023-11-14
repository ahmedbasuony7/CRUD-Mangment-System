
// variables
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxs = document.getElementById('taxs');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


let mood = 'create';
let temp;

//  get total fnction 
function getTotal(){
    if(price.value !== "" ){
        let result = (+price.value + +taxs.value + +ads.value) - +discount.value;
        total.innerHTML  = result;
        total.style.background = "green";
    }else{
        total.style.background = "red";
        total.innerHTML  = '';
    }
}

//  create product function 
let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);
}else{
    dataProduct = [];
}
submit.onclick = function(){
    let newObjProduct = {
        title : title.value.toLowerCase() ,
        price: price.value ,
        taxs : taxs.value , 
        ads : ads.value , 
        discount : discount.value , 
        total : total.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value,
    }

    //  create  count  
    if(title.value != '' && price.value != '' && category.value != ''){
        if(mood === 'create'){
            if(newObjProduct.count > 1){
                for(let i=0 ; i<newObjProduct.count; i++){
                    dataProduct.push(newObjProduct);
                }
            }else{
                dataProduct.push(newObjProduct);
            }
        }else{
            dataProduct[temp] = newObjProduct;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
    }else{
        clearData();
    }

    // save data in localstorage  function 
    localStorage.setItem('product',JSON.stringify(dataProduct));
    clearData();
    showData();
}

//  create  clear inputs  function 
function clearData(){
    title.value = '';
    price.value = '';
    taxs.value = '';
    ads.value = '';
    discount.value = ''; 
    total.innerHTML = '';
    total.innerHTML = '';
    count.value = '' 
    category.value = '';
}

// create read fnction
function showData(){

    getTotal();
    let table = '';
    for(let i =0; i<dataProduct.length; i++ ){
        table += `
        <tr>
            <td> ${i} </td>
            <th> ${dataProduct[i].title} </th>
            <th> ${dataProduct[i].price  } </th>
            <th> ${dataProduct[i].taxes  } </th>
            <th> ${dataProduct[i].ads  } </th>
            <th> ${dataProduct[i].discount  } </th>
            <th> ${dataProduct[i].total  } </th>
            <th> ${dataProduct[i].category  } </th>
            <td> <button onclick="updateData(${i})"  id="update"> update </button> </td>
            <td> <button onclick="deleteProduct(${i})"  id="delete" > delete  </button> </td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML =table;

    let deleteAllElment  = document.getElementById('delete-all');
    if(dataProduct.length> 0 ){
        deleteAllElment.innerHTML = `<button onclick="deleteAll()"> delete All (${dataProduct.length}) </button>`;

    } else{
        deleteAllElment.innerHTML ='';
    }
}

// show data on the screen every time
showData();

// delete product function 
function deleteProduct(i){
    dataProduct.splice(i,1);

    // clean data function 
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

// delete  All function 
function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}

// update function 
function updateData(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxs.value = dataProduct[i].taxs;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();

    count.style.display='none';
    category.value = dataProduct[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    temp=i;

    scroll({
        top: 0,
        behavior : 'smooth',
    });
}

// search function 
let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle') {
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    // showData();
}

// create search function 
function searchData(value){
    let table ='';
    if(searchMood == 'title'){
        for(let i =0; i< dataProduct.length; i++){
            if(dataProduct[i].title.toUpperCase().includes(value)  || dataProduct[i].title.toLowerCase().includes(value)){
                table += `
                <tr>
                    <td> ${i} </td>
                    <th> ${dataProduct[i].title} </th>
                    <th> ${dataProduct[i].price  } </th>
                    <th> ${dataProduct[i].taxes  } </th>
                    <th> ${dataProduct[i].ads  } </th>
                    <th> ${dataProduct[i].discount  } </th>
                    <th> ${dataProduct[i].total  } </th>
                    <th> ${dataProduct[i].category  } </th>
                    <td> <button onclick="updateData(${i})"  id="update"> update </button> </td>
                    <td> <button onclick="deleteProduct(${i})"  id="delete" > delete  </button> </td>
                </tr>`;
            }
        }

    }else{
        // searchMood = 'category';
        for(let i =0; i< dataProduct.length; i++){
            if(dataProduct[i].category.toUpperCase().includes(value) || dataProduct[i].category.toLowerCase().includes(value) ){
                table += `
                <tr>
                    <td> ${i} </td>
                    <th> ${dataProduct[i].title} </th>
                    <th> ${dataProduct[i].price  } </th>
                    <th> ${dataProduct[i].taxes  } </th>
                    <th> ${dataProduct[i].ads  } </th>
                    <th> ${dataProduct[i].discount  } </th>
                    <th> ${dataProduct[i].total  } </th>
                    <th> ${dataProduct[i].category  } </th>
                    <td> <button onclick="updateData(${i})"  id="update"> update </button> </td>
                    <td> <button onclick="deleteProduct(${i})"  id="delete" > delete  </button> </td>
                </tr>`;
            }
        }

    }
    document.getElementById('tbody').innerHTML =table;

}

