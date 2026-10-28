export class car{
#brand;
#model;
speed=0;
isTrunkOpen=false;

     constructor(brand,model){
this.#brand=brand;
this.#model=model;

    }
    displayInfo(){
        let truckStatus= this.isTrunkOpen ?'open' :'false'
      return console.log(`${this.#brand} ${this.#model} ${this.speed}km/h`,`truck:${truckStatus}`) 
    }
    go(){
   
        if(!this.isTrunkOpen){
            this.speed+=5;
        }
        if(this.speed>200){
 this.speed=200;
        }
       
    }
brake(){
     this.speed-=5;
    if(this.speed<0){
this.speed=0;
        }
}
openTruck(){
    if(this.speed===0){
        this.isTrunkOpen=true;
    }
}
closetruck(){
this.isTrunkOpen=false;
}
}

let car1=new car('toyota','corolla');
let car2=new car('tesla', 'model 3');




class Racecar extends car {
  acceleration ;
constructor(brand,model,acceleration){
    super(brand,model);
    this.acceleration=acceleration
}

    go(){
        
            this.speed+=this.acceleration;
        
        if(this.speed>300){
 this.speed=300;
        }  
    }
    openTruck(){
  console.log('racecar doesnt have  truck');
    
}
closetruck(){
console.log('racecar doesnt have  truck');
}
}
let car3=new Racecar('mcLaren','f1',30);
