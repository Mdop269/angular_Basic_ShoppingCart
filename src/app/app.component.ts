import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CatalogComponent } from "./catalog/catalog.component";
import { AdminComponent } from "./admin/admin.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { CartDetailsComponent } from "./cart-details/cart-details.component";
import { SiteHeaderComponent } from "./site-header/site-header.component";
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from "./add-product/add-product.component";
import { TryingComponent } from "../../core/trying/trying.component";







@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatalogComponent, AdminComponent, ProductDetailsComponent, CartDetailsComponent, RouterLink, RouterModule, SiteHeaderComponent, FormsModule, AddProductComponent, TryingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'joes-robot-shop';

}
