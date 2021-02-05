import {Route} from "@angular/router";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

export declare type customRoutes = customRoute[];

export interface customRoute extends Route {
	name?: string;
	icon?: IconDefinition;
	children?: customRoutes;
}

