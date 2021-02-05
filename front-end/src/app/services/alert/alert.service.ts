import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
	private AlertProcessEvent = new BehaviorSubject<any>({});


	constructor() { }


	AlertProcessEventTrigger(data){
		this.AlertProcessEvent.next(data)
	}

	AlertProcessEventListner(){
		return this.AlertProcessEvent.asObservable();
	}
}
