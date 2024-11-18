import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReversePipe, TimeAgoPipe, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  // @Input({required: true}) img: string = '';
  // @Input({required: true}) price: number= 0;
  // @Input({required: true}) title: string= '';

  @Input({ required: true }) product!: Product;

  @Output() addToCart = new EventEmitter();

  // addToCartHandler(){
  //   console.log('Click from child');
  //   this.addToCart.emit('Hola este es un msg desde el hijo' + this.product.title);
  // }

  addToCartHandler() {
    this.addToCart.emit(this.product);
  }

}
