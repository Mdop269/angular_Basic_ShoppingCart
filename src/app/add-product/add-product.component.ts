import { Component, Inject, inject, OnInit, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { Iproduct } from '../catalog/product.model';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductStoreService } from '../product-store.service';





@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatSelectModule,],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  newProducts: Iproduct[] = []

  private sendNewData = new BehaviorSubject<Iproduct[]>([])
  constructor(private cdRef: ChangeDetectorRef,  @Inject(ProductStoreService) private proSvc: ProductStoreService){
    // if (typeof window !== 'undefined' && window.localStorage){
    //   const savedCarts = localStorage.getItem('products');
    //   if (savedCarts) {
    //     this.newProducts = JSON.parse(savedCarts);
    //   }
    // }
  };

    
  
    matcher = new MyErrorStateMatcher();

    generateUniqueId(){
          var uniq = (new Date()).getTime();
          return uniq
      }
      
    

    addNewProduct: FormGroup = new FormGroup({
      id: new FormControl(1,[Validators.required, Validators.min(1)]),
      description: new FormControl('ONEPLUS NORD is the third best phone in the world',[Validators.required, Validators.minLength(15)]),
      name: new FormControl('ONEPLUS NORD',[Validators.required, Validators.minLength(4)]),
      imageName: new FormControl('image/oneplus nord.jpg',[Validators.required, Validators.minLength(5)]),
      category: new FormControl('', Validators.required),
      price: new FormControl('200',[Validators.required, Validators.min(10)]),
      quantityShouldBe: new FormControl(3,[Validators.required, Validators.min(1)]),
      quantity: new FormControl(1,[Validators.required, Validators.min(1)]),
    })


    onSubmit(){
      if (this.addNewProduct.valid) {

        const product: Iproduct = {
          id: this.generateUniqueId(),
          description: this.addNewProduct.value.description,
          name: this.addNewProduct.value.name,
          imageName: this.addNewProduct.value.imageName,
          category: this.addNewProduct.value.category,
          price: this.addNewProduct.value.price,
          quantityShouldBe: this.addNewProduct.value.quantityShouldBe,
          quantity: 1,
          isEdit: false,
          originalValues: undefined
        };

    
      this.proSvc.addProduct(product)
      }
      else {
        console.log("form has error")
      }
    }

    
    
}


/** Error when invalid control is dirty, touched, or submitted. */
// The ErrorStateMatcher class is used to determine when an error message should be displayed for a form control.
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    // we are using .error rather then .hasError because in hasError we need to have the thing in html because we havent clicked that input it wont be so with error we are checking wholee html so for that or is better 
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted) && (control.errors?.['required'] || control.errors?.['min'] || control.errors?.['minlength']));
  }
}