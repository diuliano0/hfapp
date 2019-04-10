import {Component, Input} from '@angular/core';

/**
 * Generated class for the HeaderFourComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-four',
  templateUrl: 'header-four.html'
})
export class HeaderFourComponent {

  @Input('title') title: string; // Page Title

  constructor() { }



}
