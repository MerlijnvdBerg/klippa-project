import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {FolderService} from "../../../services/folder/folder.service";
import {Receipt} from "../../../interfaces/Receipt";
import {Folder} from "../../../interfaces/Folder";

@Component({
	selector: 'app-folder-add',
	templateUrl: './folder-add.component.html',
	styleUrls: ['./folder-add.component.scss']
})
export class FolderAddComponent implements OnInit {
	@Input() folder: Folder;
	folderForum = this.formBuilder.group({
		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
	});

	constructor(private folderService: FolderService,
				private formBuilder: FormBuilder) {
	}

	ngOnInit(): void {
		if (this.folder != null) {
			let folder = this.folder;
			this.folderForum.setValue({
				'name': folder.name,
			});
		}
	}

	submit() {
		const formData = new FormData();
		let inputValues = this.folderForum.value;

		formData.append("name", inputValues.name);

		this.folderService.submitForm(formData).subscribe(data => {
			console.log(data);
			// TODO: Success alert
		})
	}

}
