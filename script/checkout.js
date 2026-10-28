import { renderOrder } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";
import '../script/checkout/cart-class.js';
import { loadfunction,loadProductFetch} from "../data/products.js";
import { loadcartFetch } from "./cart.js";

import '../data/backend-project.js';
async function loadpage(){ 
await Promise.all([
 loadProductFetch(),
loadcartFetch()
])
renderOrder();
paymentSummary();
}

loadpage();
