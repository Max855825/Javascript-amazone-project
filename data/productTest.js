
import { clothing } from "../data/products.js";
describe('test suite: product',()=>{
it('clothing',()=>{
    
let productss=new clothing({
    id:'123',
    name:'T-shirt',
  priceCents:1000,
  sizeCharLink:'../images/clothing-size-chart.png'


});
expect(productss.id).toEqual('123');

})
});