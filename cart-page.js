document.addEventListener("DOMContentLoaded", () =>{
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    let conteiner = document.querySelector(".cart-items")
    let totalEl = document.querySelector(".total")

    function renderCart(){
        conteiner.innerHTML = ""
        let total = 0
    }

        if (cart.length === 0){
            conteiner.innerHTML = "<h3>Кошик порожній :(<h3>"
        totalEl.textContent = ""
        return
    }

    cart.forEach(item => {
        total += item.price * item.qty

        conteiner.innerHTML += `
        <div>
            <h3>${item.name}</h3>
            <p>${item.price} грн.</p>
            <button>-</button>
            <span>${item.qty}</span>
            <button>+</button>
            <button>Видалити</button>
        </div>
        `
    });

    totalEl.textContent = "Разом:" + total +" грн."

    window.changeQty = function(id,delta){
        let item = cart .find(i => i.id === id)
        if (item) return

        item.qty += delta

        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id)
        }
        save()

    }
    window.removeItem = function(id){
        cart = cart.filter(i => i.id !== id)
        save()
    }

    function save(){
        localStorage.setItem("cart", JSON.stringify(cart))
        renderCart()
    }

    window.openCheckout = function(){
        document.querySelector(".checkout").computedStyleMap.display="block"

    }

    window.confirmOrder = function(){
        alert("Замовлення оформлене")
        localStorage.removeItem("cart")  
        location.reload()     
    }
    renderCart()
})