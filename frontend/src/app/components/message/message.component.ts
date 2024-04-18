import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @Input() message:string = '';
  @Input() hasCancel: boolean = false;
  @Input() isVisible: boolean = false;
  @Output() aceptEvent = new EventEmitter<boolean>();
  @Output() cancelEvent = new EventEmitter<boolean>();

  cancel() {
    this.isVisible = false;
    this.cancelEvent.emit(true);
  }

  acept() {
    this.isVisible = false;
    this.aceptEvent.emit(true);
  }

}
