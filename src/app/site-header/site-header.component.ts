import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterModule, RouterLink, MatTabsModule],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css'
})
export class SiteHeaderComponent {

}
