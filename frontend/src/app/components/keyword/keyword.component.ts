import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.css']
})
export class KeywordComponent {

  @Output() typeEvent = new EventEmitter<string>();
  @Output() doneEvent = new EventEmitter<boolean>();
  @Input() count: number = 10;

  @Input() text: string = '';

  get isDone() {
    return (this.text.length == this.count);
  }

  pushBtn(num: number) {
    if (this.text.length < this.count) {
      this.text = `${this.text}${num}`;      
    }
    this.typeEvent.emit(this.text);
    this.doneEvent.emit(this.isDone);
  }

  deleteBtn() {
    this.text = this.text.substring(0, this.text.length - 1);
    this.typeEvent.emit(this.text);
    this.doneEvent.emit(this.isDone);
  }
}
