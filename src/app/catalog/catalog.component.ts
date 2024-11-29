import { Component, EventEmitter, Inject, Output,} from '@angular/core';
import { Iproduct } from './product.model';
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { CartDetailsComponent } from "../cart-details/cart-details.component";
import { CartService } from '../cart.service';
import { RouterLink, RouterModule } from '@angular/router';
import { ProductStoreService } from '../product-store.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductDetailsComponent, CartDetailsComponent,RouterModule,RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  products : Iproduct[] = [];
  filter: string = '';    

  // whenever we start angular it will load all and the constructor get run first
  // with inject we are callinng the CartService file and storing it inn to the cartSVC 
  constructor(@Inject(CartService) private cartSvc: CartService, @Inject(ProductStoreService) private proSvc: ProductStoreService){
  };
  ngOnInit(): void{
    this.proSvc.products$.subscribe((product: Iproduct[]) => this.products = product);
  } 


  // in the getfiltered product i have given 3-4 button like All, ios and android what happen is its 
  // will check if filter is empty its show all or based on the filter name it will show 
  getFilteredProducts() {
    // If the filter is empty, return the entire list of products
    if (this.filter === '') {
      return this.products;
    }
    else{
      // Otherwise, filter the products based on the category
        // and filter is a function which return a sub array if the condition matches 
        return this.products.filter((product) => product.category === this.filter);
    }
  } 
 
  // the product is being pass throught the argument to this parameter 
  addToCart(product:Iproduct){
    // in this we are giving the value to the service add function with product argument 
    // we have used this so in the function we can pass the cart service and the function 
    this.cartSvc.add(product);
  }

}

 