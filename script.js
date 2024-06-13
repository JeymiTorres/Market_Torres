document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
  
    let cart = [];
    let total = 0;
  
    fetch('products.json')
      .then(response => response.json())
      .then(products => {
        products.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.className = 'product';
          productDiv.innerHTML = `
            <img src="${product.image}" class="product-img" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">$${product.price.toFixed(2)}</p>
              <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Agregar al carrito</button>
            </div>
          `;
          productList.appendChild(productDiv);
        });
      });
  
    function addToCart(id, name, price) {
      const product = cart.find(item => item.id === id);
      if (product) {
        product.quantity++;
      } else {
        cart.push({ id, name, price, quantity: 1 });
      }
      updateCart();
      animateProduct(id);
    }
  
    function removeFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      updateCart();
    }
  
    function updateQuantity(id, quantity) {
      const product = cart.find(item => item.id === id);
      if (product) {
        product.quantity = parseInt(quantity);
        if (product.quantity <= 0) {
          removeFromCart(id);
        }
      }
      updateCart();
    }
  
    function updateCart() {
      cartItems.innerHTML = '';
      total = 0;
  
      cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          <div>
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <input type="number" class="form-control d-inline-block ml-2" style="width: 60px;" value="${item.quantity}" min="0" onchange="updateQuantity(${item.id}, this.value)">
          </div>
          <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
      });
  
      totalElement.textContent = total.toFixed(2);
    }
  
    function animateProduct(id) {
      const productElement = document.querySelector(`.product:nth-child(${id}) .product-img`);
      if (productElement) {
        productElement.classList.add('added-to-cart');
        setTimeout(() => {
          productElement.classList.remove('added-to-cart');
        }, 1000);
      }
    }
  });
  