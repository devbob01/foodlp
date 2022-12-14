const cartBtn = document.querySelector(".cart-btn")
const closeCartBtn = document.querySelector(".close-cart")
const clearCartBtn = document.querySelector(".clear-cart")
const cartDOM = document.querySelector(".cart")
const cartOverlay = document.querySelector(".cart-overlay")
const cartItems = document.querySelector(".cart-items")
const cartTotal = document.querySelector(".cart-total")
const cartContent = document.querySelector(".cart-content")
const productsDOM = document.querySelector(".products-center")


let cart=[]
let buttonDOM = []

class Products {
    async getProduct(){
       try {
           let resullt = await fetch("products.json")
           let data = await resullt.json()

           let products = data.items
           products = products.map(item =>{
               const {title, category, price} = item.fields
               const{id} = item.sys
               const image = item.fields.image.url
               return { title, category, price, id, image}
           })
           return products
       } catch (error) {
           console.log(error)
           
       }
    }
}

class UI{
    displayProducts(products){
        let result = ''
        products.forEach(product => {
            result += `
            <div class="col l-3 m-4 s-12">
                <article class="product menu-item" data-food="${product.category}">
                    <div class="img-container">
                        <img src="${product.image}" alt="" class="product-img">                        
                    </div>
                    <h3> ${product.title} </h3>
                    <h4> ${product.price}</h4>
                    <button class="bag-btn" data-id="${product.id}">
                            <i class="fas fa-shopping-cart">
                                 Add to cart 
                            </i>
                        </button>
                </article>
            </div>
            `
        });
        productsDOM.innerHTML=result
    }

    getBagButtons(){
        const buttons = [...document.querySelectorAll(".bag-btn")]       
        buttonDOM = buttons
        
        buttons.forEach(button =>{
            let id = button.dataset.id
            let inCart = cart.find(item => item.id === id)
            if(inCart){
                button.innerHTML = " <span>In cart</span> "
                button.disabled = true
            }
        
            button.addEventListener("click", event => {
                event.target.innerText = "In Cart"
                event.target.disabled = true
                //get product from products
                let cartItem = {...Storage.getProduct(id), amount: 1}

                //add product to the cart
                cart = [...cart, cartItem ]

                //save cart in local storage
                Storage.saveCart(cart)

                //set cart value
                this.setCartValues(cart)

                //display cart item
                this.addcartItems(cartItem)     
                
                 //show cart
                 this.showCart()

            })
        
        })
    }

    setCartValues (cart){
        let tempTotal = 0
        let itemsTotal = 0
        cart.map(item => {
            tempTotal += item.price * item.amount
            itemsTotal += item.amount
        })

        cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
        cartItems.innerText = itemsTotal
        
    }

    addcartItems(item){
        const div = document.createElement("div")
        div.classList.add("cart-item")
        div.innerHTML= `
            <div class="container">
                <div>
                    <img src=${item.image} alt="">
                </div>
                                           
                <div class="title">
                    <h4> ${item.title} </h4>
                    <h5> ${item.price} </h5>
                </div>
                <div class="count">
                    <i class="fas fa-minus-square" data-id=${item.id}></i>
                    <p class="item-amount">  ${item.amount} </p>
                    <i class= "fas fa-plus-square" data-id=${item.id}></i>
                </div>

                <div class="delete">
                    <span class="fas fa-trash remove-item " data-id=${item.id}> </span>
                </div>
            </div>
        `

        cartContent.appendChild(div)
       
    }   

    showCart(){
        cartOverlay.classList.add("transparentBcg")
        cartDOM.classList.add("showCart")
    }

    setupAPP(){
        cart = Storage.getCart()
        this.setCartValues(cart)
        this.populateCart(cart)
        cartBtn.addEventListener("click", this.showCart)
        closeCartBtn.addEventListener("click",this.hideCart)
    }

    populateCart(cart){
        cart.forEach(item => this.addcartItems(item))
    }

    hideCart(){
        cartOverlay.classList.remove("transparentBcg")
        cartDOM.classList.remove("showCart")
    }

    cartLogic(){
        clearCartBtn.addEventListener("click", ()=>{
            this.clearCart()
        })

        cartContent.addEventListener("click", event => {
            if(event.target.classList.contains("remove-item")){
                let removeItem = event.target
                let id = removeItem.dataset.id
                cartContent.removeChild(removeItem.parentElement.parentElement.parentElement)
                this.removeItem(id)
            }

            else if( event.target.classList.contains("fa-plus-square")){
                let addAmount = event.target
                let id = addAmount.dataset.id

                let tempItem =cart.find(item => item.id === id)
                tempItem.amount = tempItem.amount + 1
                Storage.saveCart(cart)
                this.setCartValues(cart)
                addAmount.nextElementSibling.innerText = tempItem.amount              
            }

            else if( event.target.classList.contains("fa-minus-square")){
                let lowerAmount = event.target
                let id = lowerAmount.dataset.id
                let tempItem = cart.find(item => item.id === id)
                tempItem.amount = tempItem.amount -1
                if(tempItem.amount > 0){
                    Storage.saveCart(cart)
                    this.setCartValues(cart)
                    lowerAmount.previousElementSibling.innerText = tempItem.amount
                }
                else{
                    cartContent.removeChild(lowerAmount.parentElement.parentElement.parentElement)
                    this.removeItem(id)
                }
            }
        })
    }

    clearCart(){
        let cartItems = cart.map(item => item.id)
        cartItems.forEach( id => this.removeItem(id))
        while(cartContent.children.length > 0){
            cartContent.removeChild(cartContent.children[0])
        }
        this.hideCart()
    }

    removeItem(id){
        cart = cart.filter( item => item.id !==id)
        this.setCartValues(cart)
        Storage.saveCart(cart)
        let button = this.getSingleButton(id)
        button.disabled =false
        button.innerHTML =` <i class="fas fa-shopping-cart></i> add to cart`
    }

    getSingleButton(id){
        return buttonDOM.find(button => button.dataset.id === id)
    }
  
}

class Storage {
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products))
    }

    static getProduct(id){
        let products = JSON.parse(localStorage.getItem("products"))
        return products.find(product => product.id === id)
    }

    static saveCart(){
        localStorage.setItem("cart",JSON.stringify(cart))
    }

    static getCart(){
        return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")): []
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI()
    const products = new Products()
    ui.setupAPP()

    products
    .getProduct()
    .then(products =>{
        ui.displayProducts(products)
        Storage.saveProducts(products)
    })
    .then(()=>{
        ui.getBagButtons()

        ui.cartLogic()
        
    })

})


