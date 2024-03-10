import Carts from "./Carts.js";
import Service from "./Service.js";

// const btnMore = document.getElementById("buttonMore");
// const paginationInstance = new Pagination(btnMore)

const serviceInstance = new Service()
await serviceInstance.render()
const products = serviceInstance.products // [{},{},{}]

renderList(products)

function renderList (products) {
  const productContainer = document.getElementById("products");

  const cardsInstance = new Carts(products)
  productContainer.appendChild(cardsInstance.listNode);
}