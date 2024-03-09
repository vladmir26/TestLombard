export default class Carts {
    cardList = ''
    products = []
    constructor(products) {
        this.products = products
    }

    get listNode() {
        const list = document.createElement("ul");
        list.classList.add('products-list')

        this.products.forEach(product => {
            this.cardList += this.cardTemplate(product)
        })
        list.innerHTML = this.cardList
        return list
    }

    cardTemplate({id, price, product, brand }) {
        if(!brand) brand = ''
        
        return `<li class="product-item">
            <p>Id: ${id}</p>
            <p>Цена: ${price} руб.</p>
            <p>Название: ${product}</p>
            <p>Бренд: ${brand}</p>
        </li>`
    }
}