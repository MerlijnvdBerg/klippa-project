import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Folder} from "../../../interfaces/Folder";
import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

@Component({
	selector: 'app-folder-item',
	templateUrl: './folder-item.component.html',
	styleUrls: ['./folder-item.component.scss']
})
export class FolderItemComponent implements OnInit {
	@Output() UpdateFolder = new EventEmitter<number>();
	@Input() folder: Folder;
	faFolder: IconDefinition= faFolder;

	constructor() {
	}

	ngOnInit(): void {
	}

	updateFolder(id: number) {
		this.UpdateFolder.next(id);
	}
}

