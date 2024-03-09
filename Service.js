export default class Service {
    _products = []
    url = 'https://api.valantis.store:41000/'
    password = 'Valantis'
    timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    authString = `${this.password}_${this.timestamp}`;
    xAuth = md5(this.authString);

    headers = new Headers({
        'X-Auth': this.xAuth,
        'Content-Type': 'application/json'
     });

    requestBodyId = {
        "action": "get_ids",
        "params": {"offset": 10, "limit": 50}
       };
    requestBody = {
        action: 'get_items',
        params: {"ids": this.getProductIds()}
      };

    get products() {
        return this._products
    }

    async render() {
        const productIds = await this.getProductIds()
        this._products  = await this.getProductData(productIds)
    }

    async getProductIds() {

        fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(this.requestBodyId)
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

    async getProductData() {
          
          fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(this.requestBody)
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

