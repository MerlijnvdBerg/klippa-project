import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Receipt} from "../../../interfaces/Receipt";
import {ReceiptService} from "../../../services/file/receipt.service";
import {Observable} from "rxjs";

@Component({
	selector: 'app-receipt-list',
	templateUrl: './receipt-list.component.html',
	styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit {
	@Output() OpenReceipt = new EventEmitter<number>();
	@Input() receipts: Receipt[];
	currentPage: number = 0;
	pageAmount: number = 25;

	constructor(private receiptService: ReceiptService) {
	}

	ngOnInit(): void {
		if (this.receipts == null) {
			this.getFiles();
			this.receipts = [{
				id: 0,
				name: 'Your receipts will show here!',
				amount: null,
				folder_id: null,
				date: null,
			}];
		}
	}

	getFiles(): any {
		this.receiptService.getReceipts(this.currentPage, this.pageAmount).subscribe((data: Receipt[]) => {
			this.receiptService.receipts = data;
			this.receipts = data;
		})
	}

	openReceipt(id): void {
		this.OpenReceipt.next(id);
	}

	imgNext() {
		if (this.currentPage < this.receipts.length - 1) {
			this.currentPage++;
			this.getFiles();
		}
	}

	imgPrev() {
		if (this.currentPage > 0) {
			this.currentPage--;
			this.getFiles();
		}
	}

}
