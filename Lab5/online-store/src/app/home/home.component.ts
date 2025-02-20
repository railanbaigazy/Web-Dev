import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Product } from '../product';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-home',
  imports: [ProductItemComponent],
  template: `
    <div class="home-container">
      @for (product of products; track product.id) {
        <app-product-item [product]="product" />
      }
    </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categoriesService: CategoriesService = inject(CategoriesService);

  constructor() { }

  ngOnInit() {
    this.products = this.categoriesService.getAllProducts();
  }
}

