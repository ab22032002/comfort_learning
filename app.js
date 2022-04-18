const cart = document.querySelector("nav .cart")
const cartsidebar= document.querySelector(".cart-sidebar")
const closecart= document.querySelector(".close-cart")
const burger = document.querySelector(".burger")
const menusidebar = document.querySelector(".menu-sidebar")
const closemenu = document.querySelector(".close-menu")
const cartitemstotal = document.querySelector(".noi")
const cartpricetotal = document.querySelector(".total-amount")
const cartui = document.querySelector(".cart-sidebar .cart")
const totaldiv= document.querySelector(".total-sum")
const clearbtn = document.querySelector(".clear-cart-btn")
const cartcontent= document.querySelector(".cart-content")
let Cart= [];
let buttonsDOM=[];
cart.addEventListener("click",function(){
    cartsidebar.style.transform = "translate(0%)"
    const bodyoverlay= document.createElement("div")
    bodyoverlay.classList.add("overlay");
    setTimeout(function(){
        document.querySelector("body").append(bodyoverlay)
    },300)
})
closecart.addEventListener("click",function(){
    cartsidebar.style.transform = "translate(100%)";
    const bodyoverlay = document.querySelector(".overlay")
    document.querySelector("body").removeChild(bodyoverlay);
})
burger.addEventListener("click",function(){
    menusidebar.style.transform="translate(0%)"
})
closemenu.addEventListener("click",function(){
    menusidebar.style.transform="translate(-100%)"
})
//  grtting the objects from the json files
class Product{
    async getProduct(){
        const response = await fetch("products.json");
        const data = await response.json();
        let products = data.items;
        products = products.map(item=>{
            const{tittle,price}=item.fields;
            const{id}=item.sys;
            const image = item.fields.image.fields.file.url;
            return {tittle,price,id,image}
        })
        return products;
    }
}
class UI {
    displayproducts(products){
        let result = "";
        products.array.forEach(product => {
            const productdiv = document.createElement("div")
            productdiv.innerHTML=`<div class = "product-card">
                                  <img src ="${product.image}" alt= "product">
                                  <span class = "add-to-cart" data-id="${product.id}">
                                  <i class = fa fa-cart--plus fa-1x"
            style="margin-right:0.1em; font-size:1em;"></i>
                                  add to cart 
                                  </span>
                                  <div class ="product-name">${product.tittle}</div>
                                  <div class ="product-pricing>${product.price}</div>
                                  </div>`
            const p = document.querySelector(".product")
            p.append(productdiv)
        })
    }
getbuttons(){
    const btns= document.querySelectorAll(".add-to-cart")
    Array.from(btns)
    buttonsDOM=btns;
    btns.forEach((btn)=>{
        let id = btn.dataset.id
        let incart = cart.find((item)=>item.id === id);
        if(incart)
        {
            btn.innerHTML = "in cart "
            btn.dissabled = true;
        }
        btn.addEventListener("click",(e)=>{
            e.currentTarget.innerHTML = "in cart "
            e.currentTarget.style.color = "white"
            e.currentTarget.style.pointerevents = "none"
            let cartitem = {
                ...Storage.getStorageProducts(id),'amouont':1}
                cart.push(cartitem)
                Storage.savecart(cart)
                this.setcartvalues(cart)
                this.addcartitem(cartitem)
        })
    })
}
setcartvalues(cart){
    let temptotal= 0;
    let itemtotal = 0;
    cart.map((item)=>{
        temptotal += (item.price*item.amount);
        itemtotal += item.amount;
        parseFloat(temptotal.toFixed(2))
    })
    cartitemstotal.innerHTML= itemtotal
    cartpricetotal.innerHTML= parseFloat(temptotal.toFixed(2))
}
addcartitem(cartitem){
        let cartitemui = document.createElement("div")
        cartitemui.innerHTML = `<div class = "cart-product">
                                <div class = "product-image">
                                <img src = "${cartitem.image} alt="product">
                                </div>
                                <div class = "cart-product-content">
                                <div class = "cart-product-name">
                                <h3>${cartitem.tittle}</h3></div>
                                <div class="cart-product-price"><h3>${cartitem.price}</h3></div>
                                <div class="cart-product-remove" data-id="${cartitem.id}"
                                <a href = "#" style = "color:red;">remove</a></div>
                                </div>
                                <div class = "plus-minus">
                                <i class = fa fa-angle-left add-amount"
                                data-id= ${cartitem.id}"></i>
                                <span class = "no-of-items">${cartitem.amount}</span>
                                data-id= "${cartitem.id}"</i>
                                </div>
                                </div>`
                                cartcontent.append(cartitemui)
        }
        setupapp(){
            cart= Storage.getcart()
            this.setcartvalues(cart)
            cart.map((item)=>{
                this.addcartitem(item)
            })
        }
        cartlogic()
        {
            clearbtn.addEventListener("click",()=>{
                this.closecart()
            })
        cartcontent.addEventListener("click",(event)=>{
            if(event.target.classList.contains("cart-product-remove")){
                let id = event.target.dataset.id
                this.removeitem(id)
                let div = event.target.parentElement.parentElement.parentElement.parentElement
                div.removeChild(event.target.parentElement.parentElement.parentElement.parentElement)
            }
            else if (event.target.classList.contains("add-amoount")){
                let id = event.target.dataset.id
                let item = cart.find((item) =>
                    item.id===id)
                    item.amount++
                    Storage.savecart(cart)
                    this.setcartvalues(cart)
                    event.target.nextElement.innerHTML = item.amount
            
            }
            else if (event.target.classList.contains("reduce-amount")){
                let id = event.target.dataset.id
                let item = cart.find((item)=>item.id===id)
                if(item.amount>1){
                    item.amount--
                    Storage.savecart(cart)
                    this.setcartvalues(cart)
                    event.target.previousElementSibling.innerHTML= item.amount
                }
            }
            else {
                this.removeitem(id)
                let div = event.target.parentElement.parentElement.parentElement.parentElement
                div.removeChild(event.target.parentElement.parentElement.parentElement.parentElement)
            }
        })

        }
    addamount()
    {
        const addbtn= document.querySelectorAll(".add-amount")
        addbtn.forEach((btn)=>
        { 
            btn.addEventListener("click",(event)=>{
                let id = (event.currentTarget.dataset.id)
                cart.map((item)=>{
                    item.amount++
                    Storage.setcartvalues(cart)
                    this.setcartvalues(cart)
                    const amountui = event.currentTarget.parentElement.children[1]
                    amountui.innerHTML= item.amount
                })
            })

        })
    }
    reduceamount(){
        const reducebtn = document.querySelectorAll(".reduce-amount")
        reducebtn.forEach((btn)=>{
                btn.addEventListener("click",(event)=>{
                    let id = (event.currentTarget.dataset.id)
                    cart.map((item)=>{
                        if(item.id===id){
                        item.amount--
                        if(item.amount>0){
                            Storage.savecart(cart)
                            this.setcartvalues(cart)
                            const amountui = event.currentTarget.parentElement.children[1]
                            amountui.innerHTML= item.amount
                        }
                        else
                        {
                            event.currentTarget.parentElement.parentElement.parentElement.removeChild(event.currentTarget.parentElement.parentElement)
                            this.removeitem(id)
                        }
                    }

                    })
                })
        })
    }
    clearcart(){
        let cartcontent = cart.map(item=>item.id)
        cartitem.forEach((id)=>this.removeitem(id))
        const cartproduct = document.querySelectorAll(".cart-product")
        cartproduct.forEach((item)=>{
            if(item){
                item.parentElement.removeChild(item)
            }
        })
    }
    removeitem(id)
    {
        cart = cart.filter((item)=>item.id!==id)
        this.setcartvalues(cart)
        Storage.savecart(cart)
        let button = this.getsinglebutton(id)
        button.style.pointerevents= "unset"
        button.innerHTML= `<i class ="fa fa-cart-plus"></i>Add to cart `
    }
    getsinglebutton(id)
    {
        let btn 
        buttonsDOM.forEach((button)=>{
            if(buttonsDOM.dataset.id===id){
                btn = button 
            }
        })
        return btn 
    }
} 

class Storage {
    static saveproducts(product){
        localStorage.setItem("products",JSON.stringify(products))
    }
    static getStorageProducts(id){
        let products = JSON.parse(localStorage.getitem('products'))
        return products.find((item)=>item.id===id)

    }
    static savecart(cart){
        localStorage.setItem('cart',JSON.stringify(cart))
    }
    static getcart(){
        return localStorage.getitem('cart')?JSON.parse(localStorage.getitem('cart')):[]
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    const products = new Product();
    const ui = new UI;
    ui.setupapp()
    products.getProduct().then(products=>{
        ui.displayproducts(products)
        Storage.saveproducts(products)
    }).then(()=>{
        ui.getbuttons();
        ui.cartlogic();
    })
})