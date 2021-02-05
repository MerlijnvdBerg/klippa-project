import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Folder} from "../../../interfaces/Folder";
import {FolderService} from "../../../services/folder/folder.service";

@Component({
	selector: 'app-folder-list',
	templateUrl: './folder-list.component.html',
	styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {
	@Output() OpenFolder = new EventEmitter<number>();
	@Output() UpdateFolder = new EventEmitter<number>();
	@Input() folders: Folder[];

	constructor(private folderService: FolderService) {
	}

	ngOnInit(): void {
		this.getFolders();
	}

	getFolders(): any {
		this.folderService.getFolders().subscribe((data) => {
			this.folderService.folders = data;
			this.folders = data;
		})
	}

	openFolder(event: Event, id: number): void {
		// @ts-ignore
		if (event.target.id != "edit")
			this.OpenFolder.next(id);
	}

	updateFolder(id: number) {
		this.UpdateFolder.next(id);
	}
}
