import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';


@Component({
	selector: 'app-nav-list',
	templateUrl: './nav-list.component.html',
	styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {
	routes: Route[];

	constructor(private router: Router) {
	}

	ngOnInit(): void {
		this.routes = this.router.config;
	}
}
