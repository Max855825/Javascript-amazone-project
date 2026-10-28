class Cart {
 cartItems=undefined;
   loadStorage() {
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
    if(!this.cartItems){
    this.cartItems= [
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
    saveTostorage(){
    localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
    }
     addTocart(productId){
      let matchingItem = "";
      this.cartItems.forEach((cartItem) => {
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
       this.cartItems.push({
          productId: productId,
          quantity: quantity,
          delivaryOptionId:'1'
        });
      }
     this.saveTostorage()
    }
    
    removeFromcart(productId){
      let newcart=[];
      this.cartItems.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newcart.push(cartItem)
    }
    
    
      });
    this.cartItems= newcart;
   this.saveTostorage();
    
    }
    updatedelivaryOption(productId,delivaryOptionId) {
   let matchingItem = "";
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.delivaryOptionId=delivaryOptionId;
  saveTostorage()
}
}

let cart= new Cart();
cart.loadStorage();











