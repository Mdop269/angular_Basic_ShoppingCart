import { Injectable } from '@angular/core';
import { Iproduct } from './catalog/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  
// assinging behaviour subject which will transfer the data
  public SendProduct = new BehaviorSubject<Iproduct[]>([])
  products$ = this.SendProduct.asObservable();  // observvable for component to subscribe to 

//  in this if theres product in local storage it will assign it and if not it will add this product to local storage
  constructor(){
    if (typeof window !== 'undefined' && window.localStorage){
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
        this.SendProduct.next(products);
      } 
    }   
  };

  saveProducts(products: Iproduct[]){
    localStorage.setItem('products', JSON.stringify(products))
    this.SendProduct.next(products)
  }

  addProduct(product: Iproduct){
      const currentProducts = this.SendProduct.getValue();
      const updatedProducts = [...currentProducts]
      updatedProducts.push(product)
      this.saveProducts(updatedProducts)
    
  }

  deletedProduct(product: Iproduct){
      const currentProducts = this.SendProduct.getValue();
      const updatedProducts = currentProducts.filter(p => p.id !== product.id) 
      this.saveProducts(updatedProducts)
  }
}


