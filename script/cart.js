export let cart;
loadStorage();
export function loadStorage() {
   cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    delivaryOptionId:'1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    delivaryOptionId:'2'
  },
];
}
}
export function addTocart(productId){
  let matchingItem = "";
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  let quantitySelector = document.querySelector(
    `.js-qantity-selector-${productId}`,
  );
  let quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      delivaryOptionId:'1'
    });
  }
 saveTostorage()
}
 export function updateCartquantity(){
  let cartquantity=0;
cart.forEach((cartItem)=>{
cartquantity+=cartItem.quantity;
})

return cartquantity
}

export function removeFromcart(productId){
  let newcart=[];
  cart.forEach((cartItem)=>{
if(cartItem.productId!==productId){
  newcart.push(cartItem)
}


  });
cart = newcart;
saveTostorage();

}

 
function saveTostorage(){
localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateQuantity(productId,newQuantity) {
   let matchingItem = "";
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity=newQuantity;
  saveTostorage()
}
export function updatedelivaryOption(productId,delivaryOptionId) {
   let matchingItem = "";
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.delivaryOptionId=delivaryOptionId;
  saveTostorage()
}

export function loadcart(fun){
 let xhr= new XMLHttpRequest();
 xhr.addEventListener('load', ()=>{
console.log(xhr.response);
fun();
 });
 xhr.open('GET',('https://supersimplebackend.dev/cart'));
 xhr.send();
}
 export async function loadcartFetch() {
  let response= await fetch('https://supersimplebackend.dev/cart');
  let text = response.text();
  console.log(text);
  return text;
}
