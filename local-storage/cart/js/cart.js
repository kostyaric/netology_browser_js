'use strict';

//add colors
fetch('https://neto-api.herokuapp.com/cart/colors', {
  method: 'get',
})
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let colorSwatch = document.querySelector('#colorSwatch');
    data.forEach(function(item) {
      let available, checked;
      if (item.isAvailable) {
        available = 'available';
        checked = 'checked';
      } else {
        available = 'soldout';
        checked = 'disabled';
      }
      colorSwatch.innerHTML += `<div data-value="${item.type}" class="swatch-element color ${item.type} ${available}">
  <div class="tooltip">${item.title}</div>
  <input quickbeam="color" id="swatch-1-${item.type}" type="radio" name="color" value="${item.type}" ${checked}>
  <label for="swatch-1-${item.type}" style="border-color: red;">
    <span style="background-color: ${item.code};"></span>
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>`;
    });
  });

//add sizes
fetch('https://neto-api.herokuapp.com/cart/sizes', {
  method: 'get',
})
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let sizeSwatch = document.querySelector('#sizeSwatch');
    data.forEach(function(item) {
      let available;
      let checked;
      if (item.isAvailable) {
        available = 'available';
        checked = 'checked';
      } else {
        available = 'soldout';
        checked = 'disabled';
      }
      sizeSwatch.innerHTML += `<div data-value="${item.type}" class="swatch-element plain ${item.type} ${available}">
  <input id="swatch-0-${item.type}" type="radio" name="size" value="${item.type}" ${checked}>
  <label for="swatch-0-${item.type}">
    ${item.title}
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>`;
    });
    if (localStorage.index) {
      let arrIndex = JSON.parse(localStorage.index),
        inputSwatches = document.querySelectorAll('.swatches input');

      arrIndex.forEach(function(item) {
        inputSwatches[item].checked = true;
      });
    }
  });

//Cart snippet basket
function snippetCart(data) {
  let quickCart = document.querySelector('#quick-cart'),
    totalPrice = 0;

  data.forEach(function(item) {
    quickCart.innerHTML = `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">
  <div class="quick-cart-product-wrap">
    <img src="${item.pic}" title="${item.title}">
    <span class="s1" style="background-color: #000; opacity: .5">$${item.price}</span>
    <span class="s2"></span>
  </div>
  <span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
  <span class="quick-cart-product-remove remove" data-id="${item.id}"></span>
</div>`;
    totalPrice = item.price * item.quantity;
  });

  quickCart.innerHTML += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
  <span>
    <strong class="quick-cart-text">Оформить заказ<br></strong>
    <span id="quick-cart-price">${totalPrice}</span>
  </span>
</a>`;

  const quickCartPay = document.querySelector('#quick-cart-pay');
  data.length === 0 ? quickCartPay.classList.remove('open') : quickCartPay.classList.add('open');

  let remove = document.querySelector('.remove');

  remove.addEventListener('click', removeItem);
}

fetch('https://neto-api.herokuapp.com/cart', {
  method: 'get',
})
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    snippetCart(data);
  });
//remove item function
function removeItem() {
  const remove = document.querySelector('.remove');
  const quickCart = document.querySelector('#quick-cart');
  const formData = new FormData();
  formData.append('productId', remove.dataset.id);
  console.log(remove.dataset.id);

  fetch('https://neto-api.herokuapp.com/cart/remove', {
    method: 'post',
    body: formData,
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      data.length > 0 ? snippetCart(data) : (quickCart.innerHTML = '');
    });
}

let swatches = document.querySelector('.swatches');
swatches.addEventListener('click', selection);

//select swatch
function selection(event) {
  let swatchesInput = document.querySelectorAll('.swatches input'),
   swatchesInputArr = Array.from(swatchesInput),
   arrIndex = [];

  swatchesInputArr.forEach(function(item, i) {
    if (item.checked) {
      arrIndex.push(i);
    }
  });
  localStorage.index = JSON.stringify(arrIndex);
}

let addToCart = document.querySelector('#AddToCart');

addToCart.addEventListener('click', ordering);
//Order form
function ordering(event) {
  let AddToCartForm = document.querySelector('#AddToCartForm'),
  formData = new FormData(AddToCartForm);
  formData.append('productId', AddToCartForm.dataset.productId);

  fetch('https://neto-api.herokuapp.com/cart', {
    method: 'post',
    body: formData,
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      snippetCart(data);
    });
  event.preventDefault();
}