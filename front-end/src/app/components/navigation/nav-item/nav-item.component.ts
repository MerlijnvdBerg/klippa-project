import {Component, OnInit, Input} from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {customRoute } from "../../../interfaces/CustomRoutes";


@Component({
	selector: 'app-nav-item',
	templateUrl: './nav-item.component.html',
	styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
	@Input() route: customRoute;

	faHome = faHome;

	constructor() {
	}

	ngOnInit(): void {
	}

}
