import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
	selector: 'app-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
	@Output() TogglePanel = new EventEmitter<boolean>();


	constructor() {
	}

	ngOnInit(): void {
	}

	closePanel(event: Event) {
		// @ts-ignore
		if (event.target.id == 'background' || event == true)
			this.TogglePanel.emit(false)
	}
}
