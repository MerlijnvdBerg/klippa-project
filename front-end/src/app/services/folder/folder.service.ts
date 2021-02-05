import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Folder} from "../../interfaces/Folder";

@Injectable({
  providedIn: 'root'
})
export class FolderService {
	url: string = "http://localhost:3000/";
	folders: Folder[];

  constructor(private http: HttpClient) { }

	getFolders(): Observable<Folder[]> {
		return this.http.get<Folder[]>(this.url + "folder/all");
	}

	submitForm(formData: FormData) {
		return this.http.post(this.url + "folder", formData);
	}

	getReceiptsByFolder(id: number) {
		return this.http.get(this.url + "folder/receipts?id=" + id);
	}
}
