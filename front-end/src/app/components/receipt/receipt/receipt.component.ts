import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ReceiptService} from "../../../services/file/receipt.service";
import {Receipt} from "../../../interfaces/Receipt";
import {KlippaService} from "../../../services/klippa/klippa.service";
import {AlertService} from "../../../services/alert/alert.service";

@Component({
	selector: 'app-receipt',
	templateUrl: './receipt.component.html',
	styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
	@Output() updateReceipts = new EventEmitter<any>()
	panelOpenReceipt = false;
	panelOpenProcessed = false;
	receiptProcessedData = [];
	alertPanel = [];
	receipts: Receipt[];
	receipt: Receipt;

	constructor(private receiptService: ReceiptService, private klippaService: KlippaService, private alertService: AlertService) {
	}

	ngOnInit(): void {
		this.klippaService.openPanelProcessEventListner().subscribe((data: any) => {
			if(data.data != null) this.togglePanelProcessed();
		})

		this.alertService.AlertProcessEventListner().subscribe((data: any) => {
			if(data != null){
				this.alert(data)
			}
		})
	}

	togglePanelReceipt(event: any) {
		if (typeof event == 'number') {
			this.receipt = this.receiptService.receipts.filter(receipt => receipt.id == event)[0];
		} if(event == null){
			this.receipt = null;
		}
		this.panelOpenReceipt = !this.panelOpenReceipt;
	}

	togglePanelProcessed() {
		this.panelOpenProcessed = !this.panelOpenProcessed;
	}


	alert(data: string[]) {
		this.alertPanel = data
		setTimeout(() => {
			this.alertPanel = null
		}, 3000)
	}
}
