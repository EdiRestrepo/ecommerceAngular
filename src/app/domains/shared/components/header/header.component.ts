import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  hideSideMenu = signal(true);

  // @Input({required: true}) cart: Product[] = [];  //todo se comenta porque ya se va a manjar a traves del servicio para solucionar el problema del prop drilling
  // total = signal(0); //todo se comenta porque ya se va a manjar a traves del servicio para solucionar el problema del prop drilling

  private cartService = inject(CartService);

  cart = this.cartService.cart;
  total = this.cartService.total;

  toogleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }


  //todo se comenta porque ya se va a manjar a traves del servicio para solucionar el problema del prop drilling
  // ngOnChanges(changes: SimpleChanges){
  //   const cart = changes['cart'];

  //   if(cart){
  //     this.total.set(this.calcularTotal())
  //   }

  // }

  // calcularTotal(){
  //  return this.cart.reduce((total, product) => total+ product.price, 0)
  // }

}
