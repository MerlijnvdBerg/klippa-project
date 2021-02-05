import {Component, OnInit} from '@angular/core';
import {KlippaService} from "../../../services/klippa/klippa.service";

@Component({
	selector: 'app-receipt-view',
	templateUrl: './receipt-view.component.html',
	styleUrls: ['./receipt-view.component.scss']
})
export class ReceiptViewComponent implements OnInit {
	receiptFileLocation = "";
	rawText = "";
	fields = {};
	lines = [];
	documentType = 0;

	constructor(private klippaService: KlippaService) {
	}

	ngOnInit(): void {
		this.klippaService.openPanelProcessEventListner().subscribe((data: any) => {
			this.receiptFileLocation = data.filename;
			this.fields = data.data;

			if (data.data.hasOwnProperty("parsed")) {
				this.documentType = 1;
				let temp = data.data.parsed.lines[0]
				this.lines = temp.lineitems;
			}
			delete this.fields['raw_text'];
			delete this.fields['hash'];
		})
	}

	prettyString(str: string) {
		return str.replace('_', ' ');
	}
}
