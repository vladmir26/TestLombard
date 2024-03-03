
const url = 'https://api.valantis.store:41000/';
const password = 'Valantis';
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const authString = `${password}_${timestamp}`;
const xAuth = md5(authString);


const headers = new Headers({
  'X-Auth': xAuth,
  'Content-Type': 'application/json'
});

const requestBodyId = {
  "action": "get_ids",
	"params": {"offset": 10, "limit": 100}
};


let productsId;

fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(requestBodyId)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  //console.log(data);
  productsId = data.result;
  useProductID()
})
.catch(error => {
  console.error('There has been a problem with your fetch operation:', error);
})
.finally(() => {
   console.log(productsId);
})

function useProductID() {

  const requestBody = {
    action: 'get_items',
    params: {"ids": productsId}
  };

  let products;

fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(requestBody)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  products = data.result;
})
.catch(error => {
  console.error('There has been a problem with your fetch operation:', error);
})
.finally(() => {
   console.log(products);
   addList(products)
})
}
useProductID(url)



function addList (products) {
products.forEach(product => {
  const productList = document.getElementById("product");
    const listItem = document.createElement("li");

    const id = document.createElement('p');
    id.textContent = `Id: ${product.id}`
    const priceElement = document.createElement("p");
    priceElement.textContent = `Цена: ${product.price} руб.`;

    const nameElement = document.createElement("p");
    nameElement.textContent = `Название: ${product.product}`;

    const brandElement = document.createElement("p");
    brandElement.textContent = `Бренд: ${product.brand}`;

    listItem.appendChild(id);
    listItem.appendChild(nameElement);
    listItem.appendChild(priceElement);
    listItem.appendChild(brandElement);

    productList.appendChild(listItem);
})
}