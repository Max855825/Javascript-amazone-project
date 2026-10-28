import { formatCurrency } from "../Money.js";
import { cart,removeFromcart, updateCartquantity,updateQuantity,updatedelivaryOption} from "../cart.js";
import { products,getProduct } from "../../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { delivaryOptions ,getDelivaryOption} from "../delivaryOptions.js"; 
export function renderOrder() {
let cartSummaryHtml='';
 cart.forEach((cartItem)=>{
let productId=cartItem.productId;
let matchingProduct=getProduct(productId);


let delivaryOptionId=cartItem.delivaryOptionId;
let delivaryOption= getDelivaryOption(delivaryOptionId);

let today=dayjs();
let delivaryDate=today.add(delivaryOption.delivaryDays,'days');
let dataString = delivaryDate.format('dddd, MMMM D');



cartSummaryHtml += `
  <div class="cart-item-container 
 js-cart-item-container
  js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date:${dataString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <di js-cart-item-containerv class="product-name">
                  ${matchingProduct.name}
                </di>
                <div class="product-price">
             ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity
                js-product-qunatity${matchingProduct.id}
                ">
                  <span>
                    Quantity: <span class="quantity-label  js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update"
                  data-product-id=${matchingProduct.id}>
                    Update
                     </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary">Save</span>
                 
                  <span class="delete-quantity-link link-primary js-delete-link
                  js-delete-link-${matchingProduct.id}
                  " data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               
               ${delivaryOptionHtml(matchingProduct,cartItem)}
              </div>
            </div>
          </div>
`;
 });
 document.querySelector(".js-order-summary").innerHTML=cartSummaryHtml;
document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',
    ()=>
    {
    let productId= link.dataset.productId;
   removeFromcart(productId);
   let container=document.querySelector(`.js-cart-item-container-${productId}`);
   container.remove()
    }
  )
});
document.querySelector(".js-checkout").innerHTML=`checkout(${updateCartquantity()})`
document.querySelectorAll(".js-update").forEach((link)=>{
link.addEventListener('click',()=>{
  let productId = link.dataset.productId;
 const container=document.querySelector(`.js-cart-item-container-${productId}`);
container.classList.add('is-editing-quantity');

document.querySelector('.save-quantity-link').addEventListener('click',
  ()=>{
    container.classList.remove('is-editing-quantity');

   let inputValue= document.querySelector(`.js-quantity-input-${productId}`);
   let newQuantity=Number(inputValue.value);
   console.log(newQuantity);
   updateQuantity(productId,newQuantity);
   let quantityLable = document.querySelector(`.js-quantity-label-${productId}`);
quantityLable.innerHTML=newQuantity;
updateCartquantity()
  }
)
})
});


function delivaryOptionHtml(matchingProduct,cartItem) {
   let html='';
  delivaryOptions.forEach((delivaryOption)=>{
   
let today=dayjs();
let delivaryDate=today.add(delivaryOption.delivaryDays,'days');
let dataString = delivaryDate.format('dddd, MMMM D');
let priceString= delivaryOption.priceCents===0 ?'free shipping' : `$${formatCurrency(delivaryOption.priceCents) } -`;
let ischecked= delivaryOption.id===cartItem.delivaryOptionId;

html += `
                <div class="delivery-option js-delivary-option-id"
                data-product-id="${matchingProduct.id}"
                data-delivary-option-id="${delivaryOption.id}">
                  <input type="radio"
                  ${ischecked ? 'checked' :''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                   ${dataString}
                    </div>
                    <div class="delivery-option-price">
                   ${priceString} - Shipping
                    </div>
                  </div>
                </div>
`
  });
  return html;
}
document.querySelectorAll('.js-delivary-option-id').forEach((element)=>{
element.addEventListener('click',()=>{
  const {productId,delivaryOptionId } = element.dataset;
  updatedelivaryOption(productId,delivaryOptionId);
renderOrder();
});
}) 
};
  
