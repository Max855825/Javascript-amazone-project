import { cart } from "../cart.js";
import { getProduct } from "../../data/products.js";
import { getDelivaryOption } from "../delivaryOptions.js";
import { formatCurrency } from "../Money.js";
import { addOrder } from "../../data/orders.js";
export function paymentSummary(){
      let  productPriceCents=0;
      let  shippingPriceCcents=0;
cart.forEach((cartItem) => {

    let product=getProduct(cartItem.productId);
 productPriceCents+=product.priceCents*cartItem.quantity;

let delivaryOption=getDelivaryOption(cartItem. delivaryOptionId);
shippingPriceCcents += delivaryOption.priceCents;

});
 let totalBeforeTax=productPriceCents+shippingPriceCcents;
let taxCents=totalBeforeTax*0.1;
let totalCents= totalBeforeTax+taxCents;
let paymentSummaryHTML=` 

          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCcents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-holder">
            Place your order
          </button>
       `;
       document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
       document.querySelector('.js-place-holder').addEventListener('click',async ()=>{
    
        try{
    let response=await fetch('https://supersimplebackend.dev/orders',{
         method : 'POST',
         headers :{
          'Content-Type':'application/json'
         } ,
         body:JSON.stringify({
          cart:cart
         })
        });
        let order=await response.json();
        addOrder(order);
        }catch (error){
console.log('unexpected error try again')
        }

        window.location.href="orders.html"
       })
}
