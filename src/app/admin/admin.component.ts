import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CartService } from '../cart.service';
import { Iproduct } from '../catalog/product.model';
import { ProductStoreService } from '../product-store.service';
import { MatTableModule } from '@angular/material/table' ;
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, NgModel } from '@angular/forms'; // for ng module
import { CommonModule } from '@angular/common';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AddProductComponent } from '../add-product/add-product.component';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatTableModule,FontAwesomeModule, FormsModule, CommonModule , AddProductComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  products : Iproduct[] = [];

// this are some of the icons which i have used 
  faPencilSquare = faPencilSquare
  faTrash = faTrash
  faCloud = faCloud
  faTimesCircle = faTimesCircle




  // whenever we start angular it will load all and the constructor get run first
  // with inject we are callinng the CartService file and storing it inn to the cartSVC 
  constructor(@Inject(CartService) private cartSvc: CartService, @Inject(ProductStoreService) private proSvc: ProductStoreService, ){
  };
  ngOnInit(): void{
    this.proSvc.products$.subscribe((products: Iproduct[]) =>{ this.products = products; console.log(this.products)});
    console.log(this.products)

  } 

// this is used for mat tabke 
  displayedColumns: string[] = ['id', 'description', 'name', 'imageName','category','price',"quantityShouldBe"];

  // if the function is click on on edit 
  onEdit(product:Iproduct){
    // i am storing the original values in this variable
    const Value = { ...product };
    // whatever value is in the originalvalue variable it will overwrite in the originalvalues 
    product.originalValues = Value;
    // with this it will be on edit mode 
    product.isEdit = true
    
  }

  validateField(item:any){
    return !item // this checks if the value is there or not if not then it assigns true (its checks null undefined false , 0 , Nan, "" empty string)
  }
  
  // this check if nothing is null or undefined 
  validateForm(product:any){
   return !(
    product.name &&
    product.description && 
    product.imageName &&
    product.category &&
    product.price && 
    product.quantityShouldBe	
   ); // this checks if the value is there or not if not then it assigns true (its checks null undefined false , 0 , Nan, "" empty string)
  }

  updateProduct(product: Iproduct){
    let updatedProductIndex = this.products.findIndex((p) => product.id === p.id)
    if(updatedProductIndex !== -1){
      // we are assigning updated product to the old array 
      Object.assign(this.products[updatedProductIndex], product)
      // we closed the textbox
      product.isEdit = false
      // saves the product in localstorage
      this.saveProducts()
        
      }
  }

  saveProducts(){
    localStorage.setItem("products", JSON.stringify(this.products))
  }

// in this we will assign the old value 
  onCancel(product:Iproduct){
    console.log(product.originalValues)
    //in the edit function we stored the original value in variable then we overwrite in the orignalvalues
    // so now we are using that value to assign the product
    Object.assign(product, product.originalValues)
    // it will close the chat box 
    product.isEdit = false
  }

  onDelete(product:Iproduct){
    this.proSvc.deletedProduct(product)
  }

}
