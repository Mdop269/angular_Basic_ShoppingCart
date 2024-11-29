import { Injectable } from '@angular/core';
import { Iproduct } from './catalog/product.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartForQuantity: Iproduct[] = [];

  products : Iproduct[] = []
  // behaviour subject is used for passing the data from one component to another component in behavuour subject we have to define the initial value
  public SendDataToCart = new BehaviorSubject<Iproduct[]>([])

  constructor() {
    // Load cart from localStorage if available
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedCarts = localStorage.getItem('carts');
      if (savedCarts) {
        this.cartForQuantity = JSON.parse(savedCarts);
        // so with this the first time it will send this data after clicking on but it will run the below function so new data will be added
        this.SendDataToCart.next(this.cartForQuantity);  // it will store all the localstorage cart to the array and it will give to subscriber
      }
    }
  }

  ngOnInit(){
    
  }

  // Add a product to the cart
  add(product: Iproduct): void {
    // in this the argument which we got from the catalog component we are displaying the value of it 
    console.log('Adding product:', product);
    
    // it will find if the existing product is available in the cart or not through unique id
    const existingProduct = this.cartForQuantity.find(item => item.id === product.id);
    
    // if its available it will ppend the data or it will execute else statement
      if (existingProduct) {
        if(existingProduct.quantity < product.quantityShouldBe){
          existingProduct.quantity += 1;
        }
      } else {
        this.cartForQuantity.push({
          // it is a spread operator in this ...product 
          // it will assign the whole array and add the it assign the new object with the new value 
          // but it wont change the oriinal like product it will just assign in new object in which case 
          // our is cartForQuantity
          ...product,
          quantity: 1,
        });
      }

    // it will overwrite the old data and add this data to local storage
    localStorage.setItem('carts', JSON.stringify(this.cartForQuantity));
    // it will share this data to cart-detail via subscribe 
    this.SendDataToCart.next(this.cartForQuantity);  // Emit updated cart
  }

}
