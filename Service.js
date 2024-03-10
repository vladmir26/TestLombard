

export default class Service {
    _products = []
    url = 'https://api.valantis.store:41000/'
    headers = {}

    constructor() {
      this.initHeaders()
    }

    get products() {
        return this._products
    }

    set products(products) {
      this._products = products
    }

    initHeaders() {
      const password = 'Valantis'
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const authString = `${password}_${timestamp}`;
      const xAuth = md5(authString);

      this.headers = new Headers({
        'X-Auth': xAuth,
        'Content-Type': 'application/json'
     });
    }
    
    async render() {
        const productIds = await this.getProductIds()
        console.log(productIds)
        this.products  = await this.getProductData(productIds)
    }

    async getProductIds() {
      const requestBodyId = {
        "action": "get_ids",
        "params": {"offset": 10, "limit": 50}
      };

      return await fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(requestBodyId)
          })
          .then(response => {
            console.log(response)
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log(data)
            return data.result;
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          })

    }

    async getProductData(getProductIds) {
      const requestBody = {
        action: 'get_items',
        params: {"ids": getProductIds}
      };
      return await fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(requestBody)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            return data.result;
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          })
          }
}
