import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {KlippaService} from "../../../services/klippa/klippa.service";
import {AlertService} from "../../../services/alert/alert.service";

@Component({
	selector: 'app-receipt-klippa',
	templateUrl: './receipt-klippa.component.html',
	styleUrls: ['./receipt-klippa.component.scss']
})
export class ReceiptKlippaComponent implements OnInit {
	@Input() filePreviews: any;
	@Input() currentImg: number;
	templates = [];


	klippaForum = this.formBuilder.group({
		template: new FormControl(''),
		apiKey: new FormControl(''),
	});

	constructor(private klippaService: KlippaService,
				private formBuilder: FormBuilder,
				private alertService: AlertService) {
	}

	ngOnInit(): void {
		this.getTemplates();
	}


	getTemplates() {
		this.klippaService.templates().subscribe((data) => {
			data = data.data.templates;
			for (const key in data) {
				this.templates[key] = data[key].title
			}
		})
	}

	export(type: string) {
		let inputValues = this.klippaForum.value;
		let formdata = new FormData();

		formdata.append("template", inputValues.template);
		formdata.append("apiKey", inputValues.apiKey);
		formdata.append("pdf_text_extraction", type);
		formdata.append("files", JSON.stringify(this.filePreviews[this.currentImg]));
		this.klippaService.export(formdata).subscribe((data: any) => {
			if(data.hasOwnProperty("error")){
				this.alertService.AlertProcessEventTrigger(["warning", "Make sure you save before you process a file"]);
			}
			this.klippaService.openPanelProcessEventTrigger(data);
		})
	}
}
