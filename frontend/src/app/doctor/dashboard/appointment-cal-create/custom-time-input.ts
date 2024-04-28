import {FocusMonitor} from '@angular/cdk/a11y';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';

/** @title Form field with custom telephone number input control. */
@Component({
  selector: 'form-field-custom-control-example',
  templateUrl: 'custom-time-input-control.html',
})
export class FormFieldCustomControlExample {
  form: FormGroup = new FormGroup({
    appointment_time: new FormControl(new MyTime('', '')),
  });
}

/** Data structure for holding telephone number. */
export class MyTime {
  constructor(public hour: string, public minute: string) {}
}

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'example-time-input',
  templateUrl: 'custom-time-input.html',
  styleUrls: ['custom-time-input.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: MyTimeInput}],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})
export class MyTimeInput implements ControlValueAccessor, MatFormFieldControl<MyTime>, OnDestroy {
  static nextId = 0;
  @ViewChild('hour') hourInput: HTMLInputElement;
  @ViewChild('minute') minuteInput: HTMLInputElement;

  parts = this._formBuilder.group({
    hour: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    minute: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
  });
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'example-time-input';
  id = `example-time-input-${MyTimeInput.nextId++}`;
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    const {
      value: {hour, minute},
    } = this.parts;

    return !hour && !minute;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): MyTime | null {
    if (this.parts.valid) {
      const {
        value: {hour, minute},
      } = this.parts;
      return new MyTime(hour!, minute!);
    }
    return null;
  }
  set value(appointment_time: MyTime | null) {
    const {hour, minute} = appointment_time || new MyTime('', '');
    this.parts.setValue({hour, minute});
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = true;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.example-time-input-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.parts.controls.hour.valid) {
      this._focusMonitor.focusVia(this.minuteInput, 'program');
    } else {
      this._focusMonitor.focusVia(this.hourInput, 'program');
    }
  }

  writeValue(appointment_time: MyTime | null): void {
    this.value = appointment_time;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */