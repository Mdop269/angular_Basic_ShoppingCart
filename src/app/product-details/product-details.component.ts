import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { Iproduct } from '../catalog/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  // as you havee seen we have transfered data from parent component to child component with this we take the input of the parent component
  @Input() product!:Iproduct

  // with @output we send the data to parent component and buy is the property and new is a keyword is used to create a new object instance
  // and event Emitter is to emit events to its parent components or other components that are listening to those events.
  @Output() buy = new EventEmitter()

  // the function which called when we clicked on the buy button 
  buyButtonClicked(){
    // this is the current object which has the product and buy property, 
    // with buy we are calling the event emitter and those property will be shown
    //  and with emit we are sending the data to the listener the that the button is clicked
    // so it knows which data we need to send to is the button which we clicked
    this.buy.emit()
    
  }

}
