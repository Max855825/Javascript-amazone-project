import { getProduct,loadProductFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { formatCurrency } from "./Money.js";
import { addTocart } from "./cart.js";
import { getorder } from "../data/orders.js";

async function loadpage(){
    await loadProductFetch();
    let url=new URL(window.location.href )
    let orderId=url.searchParams.get('orderId');
    let productId=url.searchParams.get('productId')

    let order=getorder(orderId);
    let product=getProduct(productId);
    let productdetail='';
    order.products.forEach((detail)=>{
if(detail.productId===product.id){
    productdetail=detail;
}
    });
    let today=dayjs();
    let orderTime=dayjs(order.orderTime);
    let delivaryTime=dayjs(productdetail.estimatedDeliveryTime);
    const percentProgress=((today-orderTime)/(delivaryTime-orderTime))*100;


 
    let trackingHTML=` 
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on :${
            dayjs(productdetail.estimatedDeliveryTime).format('ddd,MMMM D')
          }
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productdetail.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label${percentProgress<50 ? 'current-status':''}"> 
            Preparing
          </div>
          <div class="progress-label ${(percentProgress>=50 && percentProgress<1000) ? 'current-status':'' }">
            Shipped
          </div>
          <div class="progress-label 
          ${percentProgress>=100 ? 'current-status':'' }
          ">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${percentProgress}%"></div>
        
      </div>`;

    document.querySelector('.order-tracking').innerHTML=trackingHTML;
    console.log(trackingHTML);
}
loadpage();