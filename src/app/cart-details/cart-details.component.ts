import { Component, Inject, Input,  } from '@angular/core';
import { Iproduct } from '../catalog/product.model';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent{


  cartForQuantity : Iproduct[] = []
  constructor(@Inject(CartService) private cartSvc: CartService){
  }

  // in this whatever data we got from the cart we will store it in the array 
  ngOnInit(): void{
    this.cartSvc.SendDataToCart.subscribe((cart: Iproduct[]) => this.cartForQuantity = cart);
  } 

  // if we do minus this function will work
  minus(cart:Iproduct): void{
    // if the quantity above then one it can minus
    if(cart.quantity > 1){
      cart.quantity -=1
      localStorage.setItem('carts', JSON.stringify(this.cartForQuantity))
    }
    // if the quantity is less then 1 it will remove from the array
    else{
      const index = this.cartForQuantity.findIndex(item => item.id === cart.id);
      this.cartForQuantity.splice(index, 1);
      localStorage.setItem('carts', JSON.stringify(this.cartForQuantity))
    }
    
  }
  
  // if the quantity is plus it will keep on adding
  plus(cart:Iproduct){
    if(cart.quantity < cart.quantityShouldBe){
      cart.quantity +=1
      localStorage.setItem('carts', JSON.stringify(this.cartForQuantity))
    }
  }

  
  
}
