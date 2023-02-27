import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigComponent } from './components/config/config.component';
import { StoreModules } from './store/store.module';
import { ItemComponent } from './components/item/item.component';
import { AllergenComponent } from './components/allergen/allergen.component';
import { ButtonComponent } from './ui/button/button.component';
import { MenuComponent } from './components/menu/menu.component';
import { HelpdialogComponent } from './components/helpdialog/helpdialog.component';
import { DialogComponent } from './ui/dialog/dialog.component';
import { OrderComponent } from './components/order/order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PictureComponent } from './ui/picture/picture.component';
import { CheckboxComponent } from './ui/checkbox/checkbox.component';
import { SelecteditemComponent } from './components/selecteditem/selecteditem.component';
import { DefaultimageDirective } from './directives/defaultimage.directive';
import { ToCommaDecimal } from './pipes/tocommadecimal.pipe';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DefaultimageDirective,
    ConfigComponent,
    ItemComponent,
    AllergenComponent,
    ToCommaDecimal,
    ButtonComponent,
    CheckboxComponent,
    MenuComponent,
    HelpdialogComponent,
    DialogComponent,
    OrderComponent,
    PictureComponent,
    SelecteditemComponent,
    HeaderComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModules,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
