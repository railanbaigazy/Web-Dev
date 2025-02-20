import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { CategoriesService } from '../categories.service';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductItemComponent],
  template: `
    @if (products && products.length > 1) {
      <div class="products-container">
        @for (product of products; track product.id) {
          <app-product-item [product]="product" (productRemoved)="onProductRemoved($event)" />
        }
      </div>
    } @else {
      <div class="invalid">Invalid category</div>
    }

  `,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  categoriesService: CategoriesService = inject(CategoriesService);
  products: Product[] | undefined;

  constructor() { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const categoryName = params.get('category');
      this.products = this.categoriesService.getProductsByCategory(categoryName ?? '');
    });
  }

  onProductRemoved(productId: number) {
    this.products = this.products?.filter((product) => productId !== product.id);
  }
}
