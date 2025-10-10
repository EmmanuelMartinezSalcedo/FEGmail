import { Component } from '@angular/core';
import { Footer } from '../../common/footer/footer';
import { Header } from '../../common/header/header';

@Component({
  selector: 'app-terms-conditions',
  imports: [Footer, Header],
  templateUrl: './terms-conditions.html',
  styleUrl: './terms-conditions.css',
})
export class TermsConditions {}
