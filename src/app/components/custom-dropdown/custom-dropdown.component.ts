import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomDropdownComponent),
    multi: true,
  }]
})
export class CustomDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() options: string[];

  selectedOption: string;

  onChange: (_: any) => {};

  constructor() {
    this.selectedOption = null;
  }

  ngOnInit() {
    this.selectedOption = null;
  }

  writeValue(value: string) {
    this.selectedOption = value;
  }

  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }

  changeSelectedOption(option: string) {
    this.selectedOption = option;
    this.onChange(option);
  }

  registerOnTouched() { }
}