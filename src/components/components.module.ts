import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'
import { HeaderOneComponent } from './header-one/header-one';
import { HeaderTwoComponent } from './header-two/header-two';
import { RecommendDestinationComponent } from './recommend-destination/recommend-destination';
import { DealsComponent } from './deals/deals';
import { TravelCategoryComponent } from './travel-category/travel-category';
import { HeaderThreeComponent } from './header-three/header-three';
import { UserInformationComponent } from './profile/user-information/user-information';
import { CardInformationComponent } from './profile/card-information/card-information';
import { ChangePasswordComponent } from './profile/change-password/change-password';
import { HeaderFourComponent } from './header-four/header-four';

@NgModule({
	declarations: [HeaderOneComponent,
		HeaderTwoComponent,
		RecommendDestinationComponent,
		DealsComponent,
		TravelCategoryComponent,
		HeaderThreeComponent,
		UserInformationComponent,
		CardInformationComponent,
		ChangePasswordComponent,
    HeaderFourComponent],
	imports: [IonicModule],
	exports: [HeaderOneComponent,
		HeaderTwoComponent,
		RecommendDestinationComponent,
		DealsComponent,
		TravelCategoryComponent,
		HeaderThreeComponent,
		UserInformationComponent,
		CardInformationComponent,
		ChangePasswordComponent,
    HeaderFourComponent]
})
export class ComponentsModule { }
