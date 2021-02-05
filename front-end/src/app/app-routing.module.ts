import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {customRoutes} from "./interfaces/CustomRoutes";
import {faFolder, faHome} from "@fortawesome/free-solid-svg-icons";
import {FolderComponent} from "./components/folder/folder/folder.component";
import {ReceiptComponent} from "./components/receipt/receipt/receipt.component";

const routes: customRoutes = [
	{path: "home", component: ReceiptComponent, name: "My Klippa", icon: faHome},
	{path: "folders", component: FolderComponent, name: "Folders", icon: faFolder},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
