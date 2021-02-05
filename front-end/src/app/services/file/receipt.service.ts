import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Receipt} from "../../interfaces/Receipt";

@Injectable({
	providedIn: 'root'
})
// TODO: Change fileService =>
export class ReceiptService {
	url = 'http://localhost:3000/';
	receipts: Receipt[] = [];
	image: Object[] = [];

	constructor(private http: HttpClient) {
	}

	// Save image temporarily
	uploadFile(file: File): Observable<Object> {
		const formData: FormData = new FormData();
		formData.append('fileKey', file, file.name);
		return this.http.post(this.url + "file/temp", formData);
	}

	submitForm(formData: FormData) {
		return this.http.post(this.url + "receipt", formData)
	}

	getReceipts(currentPage: number, amountPage: number): Observable<Receipt[]> {
		return this.http.get<Receipt[]>(this.url + "receipt/all?pagenr=" + currentPage + "&amount=" + amountPage);
	}

	getImageById(id: number) {
		return this.http.get(this.url + "receipt/image?id=" + id)
	}
}
