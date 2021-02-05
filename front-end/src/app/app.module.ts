import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {NavListComponent} from "./components/navigation/nav-list/nav-list.component";
import {NavItemComponent} from "./components/navigation/nav-item/nav-item.component";
import { PanelComponent } from './components/panel/panel.component';

import { ReceiptComponent } from './components/receipt/receipt/receipt.component';
import { ReceiptListComponent } from './components/receipt/receipt-list/receipt-list.component';
import { ReceiptItemComponent } from './components/receipt/receipt-item/receipt-item.component';
import { ReceiptAddComponent } from './components/receipt/receipt-add/receipt-add.component';
import { ReceiptViewComponent } from './components/receipt/receipt-view/receipt-view.component';

import { FolderComponent } from './components/folder/folder/folder.component';
import { FolderListComponent } from './components/folder/folder-list/folder-list.component';
import { FolderItemComponent } from './components/folder/folder-item/folder-item.component';
import { FolderAddComponent } from './components/folder/folder-add/folder-add.component';
import { FolderViewComponent } from './components/folder/folder-view/folder-view.component';
import { ReceiptKlippaComponent } from './components/receipt/receipt-klippa/receipt-klippa.component';

@NgModule({
	declarations: [
		AppComponent,

		NavListComponent,
		NavItemComponent,
		PanelComponent,

		ReceiptComponent,
		ReceiptListComponent,
		ReceiptItemComponent,
		ReceiptAddComponent,
		ReceiptViewComponent,
		ReceiptKlippaComponent,

		FolderComponent,
		FolderListComponent,
		FolderItemComponent,
		FolderAddComponent,
		FolderViewComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		FontAwesomeModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
