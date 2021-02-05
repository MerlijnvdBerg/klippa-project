import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Image} from "../../interfaces/Image";

@Injectable({
	providedIn: 'root'
})
export class KlippaService {
	private receiptProcessEvent = new BehaviorSubject<any>({});
	url = 'http://localhost:3000/';

	constructor(private http: HttpClient) {
	}

	export(formData: FormData): Observable<any> {
		return this.http.post(this.url + "klippa/export", formData)
	}

	templates(): Observable<any> {
		return this.http.get(this.url + "klippa/templates");
	}


	openPanelProcessEventTrigger(data){
		this.receiptProcessEvent.next(data)
	}

	openPanelProcessEventListner(){
		return this.receiptProcessEvent.asObservable();
	}

}
