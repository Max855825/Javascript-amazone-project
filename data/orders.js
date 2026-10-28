export const orders=JSON.parse(localStorage.getItem('orders')) || [];
export function addOrder(order){
orders.unshift(order);
savetoStorage()
}
function savetoStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}
export function getorder(orderId){
let matchiingOrder ="";
orders.forEach((order)=>{
if(orderId===order.id){
    matchiingOrder=order
}
});
return matchiingOrder;
}