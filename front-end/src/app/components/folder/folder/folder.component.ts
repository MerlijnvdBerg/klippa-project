import {Component, OnInit} from '@angular/core';
import {FolderService} from "../../../services/folder/folder.service";
import {Folder} from "../../../interfaces/Folder";
import {Receipt} from "../../../interfaces/Receipt";

@Component({
	selector: 'app-folder',
	templateUrl: './folder.component.html',
	styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
	panelOpenView: boolean = false;
	panelOpenUpdate: boolean = false;
	panelOpenItem: boolean = false;

	folder: Folder;
	receipts: Receipt[];
	receipt: Receipt;

	constructor(private folderService: FolderService) {
	}

	ngOnInit(): void {
	}

	togglePanelUpdate(event: any) {
		if (typeof event == 'number') {
			this.folder = this.folderService.folders.filter(folder => folder.id == event)[0];
		}
		if (event == null) {
			this.folder = null;
		}
		this.panelOpenUpdate = !this.panelOpenUpdate;
	}

	togglePanelView(event: any) {
		if (typeof event == 'number') {
			this.folderService.getReceiptsByFolder(event).subscribe((data: Receipt[]) => {
				this.receipts = data;
				this.panelOpenView = !this.panelOpenView;
			});
		} else{
			this.receipts = null;
			this.panelOpenView = !this.panelOpenView;
		}
	}

	togglePanelItem(event: any) {
		if (typeof event == 'number') {
			this.receipt = this.receipts.filter(receipt => receipt.id == event)[0];
		} if(event == null){
			this.receipt = null;
		}
		this.panelOpenItem = !this.panelOpenItem;
	}
}
