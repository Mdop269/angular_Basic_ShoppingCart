import { Routes } from '@angular/router';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {   
        path:'cart-Details',
        component:CartDetailsComponent
        
    },
    {   
        path:'catalog',
        component:CatalogComponent  
    },
    {   
        path:'admin',
        component:AdminComponent 
    },
    
];
