import shopProductsData from './products.js'

const shopEl = document.getElementById('shop')
const cartAmountEl = document.querySelector('.cartAmount')
let shoppingBasket = {}

function renderShopItems(data) {

    data.forEach(item => {
        const {id, name, price, description, img} = item

       const itemEl = document.createElement('div')
       itemEl.classList.add('item')
       
       const imgEl = document.createElement('img')
       imgEl.src = `./${img}`
       imgEl.width = 350
       itemEl.appendChild(imgEl)

       const detailsDiv = document.createElement('div')
       detailsDiv.classList.add('details')
       itemEl.appendChild(detailsDiv)

       const h3 = document.createElement('h3')
       h3.innerText = name
       detailsDiv.appendChild(h3)

       const p = document.createElement('p')
       p.innerText = description
       detailsDiv.appendChild(p)

       const priceQuantityDiv = document.createElement('div')
       priceQuantityDiv.classList.add('price-quantity')
       detailsDiv.appendChild(priceQuantityDiv)

       const h2 = document.createElement('h2')
       h2.innerText = `$${price}`
       priceQuantityDiv.appendChild(h2)

       const btnDiv = document.createElement('div')
       btnDiv.classList.add('buttons')
       const btnIncrease = document.createElement('button')
       btnIncrease.innerText = 'Add'
       btnIncrease.classList.add('increase')
       btnDiv.appendChild(btnIncrease)
       const btnQuantity = document.createElement('button')
       btnQuantity.innerText = 0
       btnQuantity.classList.add('quantity')
       btnDiv.appendChild(btnQuantity)
       const btnDecrease = document.createElement('button')
       btnDecrease.innerText = 'Remove'
       btnDecrease.classList.add('decrease')
       btnDiv.appendChild(btnDecrease)
       priceQuantityDiv.appendChild(btnDiv)

       btnIncrease.addEventListener('click', () => {
        btnQuantity.innerText = Number(btnQuantity.innerText) + 1
        cartAmountEl.innerText = Number(cartAmountEl.innerText) + 1
        addToShoppingBasket(id, cartAmountEl.innerText, price, name)
        console.log(shoppingBasket)
        transferShoppingBasketToLocalStorage()
       })

       btnDecrease.addEventListener('click', () => {
            if (btnQuantity.innerText > 0) {
             btnQuantity.innerText = Number(btnQuantity.innerText) - 1
             cartAmountEl.innerText = Number(cartAmountEl.innerText) - 1
             addToShoppingBasket(id, cartAmountEl.innerText, price, name)
             console.log(shoppingBasket)
             transferShoppingBasketToLocalStorage()
        }
       })

       shopEl.appendChild(itemEl)
    })
}

renderShopItems(shopProductsData)

function addToShoppingBasket(productId, quantity, price, name) {
    shoppingBasket[productId] = {
        quantity: parseInt(quantity),
        price: parseFloat(price),
        name: name
}
}

function transferShoppingBasketToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(shoppingBasket))
}

