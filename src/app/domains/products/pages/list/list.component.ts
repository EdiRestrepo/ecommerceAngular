import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';

import { ProductComponent } from '@products/components/product/product.component'
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  @Input() category_id?: string;


  ngOnInit() {
    // this.getProducts();
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges){
    this.getProducts();
    // const category_id = changes['category_id'];
    // if(category_id){
    //   this.getProducts();
    // }
    // console.log(this.category_id);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }

  private getProducts(){
    this.productService.getProducts(this.category_id).subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {

      }
    })

  }

  private getCategories(){
    this.categoryService.getAll().subscribe({
      next: (data) => {
        console.log(data)
        this.categories.set(data);
      },
      error: () => {

      }
    })

  }


  // cart = signal<Product[]>([]); //todo se comenta porque ya se va a manjar a traves del servicio para solucionar el problema del prop drilling


  // TODO el constructor se comenta porque ya se va a traer la data desde una API con HTTP
  // constructor(){
  //   const initProducts: Product[] = [
  //     {
  //       id: Date.now(),
  //       title: 'Pro 1',
  //       price: 100,
  //       image: 'https://picsum.photos/640/640?r=23',
  //       creationAt: new Date().toISOString(),
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Pro 2',
  //       price: 100,
  //       image: 'https://picsum.photos/640/640?r=24',
  //       creationAt: new Date().toISOString(),
  //     },
  //   ]
  //   this.products.set(initProducts);
  // }


  // fromChild(event: string){
  //   console.log('Estamos en el padre');
  //   console.log(event);
  // }

  //todo se comenta porque ya se va a manjar a traves del servicio para solucionar el problema del prop drilling
  // addToCart(product: Product){
  //   this.cart.update(prevState =>  [...prevState, product])
  // }



}
