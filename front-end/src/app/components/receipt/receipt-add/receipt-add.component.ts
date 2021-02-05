import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Receipt} from "../../../interfaces/Receipt";
import {Image} from "../../../interfaces/Image";
import {Folder} from "../../../interfaces/Folder";
import {ReceiptService} from "../../../services/file/receipt.service";
import {FolderService} from "../../../services/folder/folder.service";
import {KlippaService} from "../../../services/klippa/klippa.service";

@Component({
	selector: 'app-receipt-add',
	templateUrl: './receipt-add.component.html',
	styleUrls: ['./receipt-add.component.scss']
})
export class ReceiptAddComponent implements OnInit {
	@Output() alert = new EventEmitter<string[]>();
	@Output() closePanel = new EventEmitter<boolean>();
	@Input() receipt: Receipt;

	receiptForum = this.formBuilder.group({
		id: new FormControl(''),
		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
		folder: new FormControl(''),
		amount: new FormControl('', [Validators.pattern("^[0-9]*.[0-9]*$")]),
		date: new FormControl(''), // TODO: show date when editing
		files: new FormControl(''),
		fileSource: new FormControl(''),
	});

	files: string[] = [];
	filePreviews: any[] = [];
	currentImg: number = 0;
	folders: Folder[] = [];

	constructor(private receiptService: ReceiptService,
				private formBuilder: FormBuilder,
				private folderService: FolderService,
				private klippaService: KlippaService) {
	}

	ngOnInit(): void {
		if (this.receipt != null) {
			let receipt = this.receipt;
			this.receiptForum.setValue({
				'id': receipt.id,
				'name': receipt.name,
				'folder': receipt.folder_id,
				'amount': receipt.amount,
				'date': receipt.date,
				'files': null,
				'fileSource': null
			});
			this.getImagesById(receipt.id);
		}
		this.getFolders();
	}

	getFolders() {
		this.folderService.getFolders().subscribe((data) => {
			this.folderService.folders = data;
			this.folders = data;
		})
	}


	getImagesById(id: number) { // Change to imag object
		this.receiptService.getImageById(id).subscribe((data: Image[]) => {
			this.receiptForum.controls['files'].setValue(data)

			for (const d of data) {
				let url = "http://localhost:3000/files/" + d.filename;
				this.filePreviews.push({url: url, filename: d.filename})
			}
		})
	}

	sendFilesToServer(event) {
		// TODO: Send array of files
		let files = event.target.files;
		for (let i = 0; i < files.length; i++) {
			this.receiptService.uploadFile(files[i]).subscribe(data => {
					// @ts-ignore
					this.filePreviews.push(data);
				}
			)
		}
	}

	onFileChange(event) {
		this.receiptForum.controls['files'].setValue(event.target.files);
		for (let i = 0; i < event.target.files.length; i++) {
			this.files.push(event.target.files[i]);
		}
		this.sendFilesToServer(event);
	}

	submit() {// TODO: Update after submit
		const formData = new FormData();
		if (this.receiptForum.status === "INVALID") {
			this.alert.emit(["error", "Input fields are invalid"]);
			return;
		}

		for (let i = 0; i < this.files.length; i++) {
			formData.append("files", this.files[i]);
		}
		let inputValues = this.receiptForum.value;

		formData.append("file", this.files[0]);

		formData.append("id", inputValues.id);
		formData.append("name", inputValues.name);
		formData.append("folder", inputValues.folder);
		formData.append("amount", inputValues.amount);
		formData.append("date", inputValues.date);

		this.receiptService.submitForm(formData).subscribe(data => {
			this.alert.emit(["success", "Receipt saved succesfully"]);
			// TODO: Update the receipt deta and closing the window
		})
	}

	imgNext() {
		if (this.currentImg < this.filePreviews.length - 1) {
			this.currentImg++;
		}
	}

	imgPrev() {
		if (this.currentImg > 0)
			this.currentImg--;
	}
}
