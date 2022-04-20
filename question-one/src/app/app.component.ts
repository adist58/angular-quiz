import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formGroup: FormGroup;
  results = true;
  unsubSubject = new Subject();
  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({ colOne: 1, colMiddle: 'p' });
    this.updateResult();
  }
  ngOnInit(): void {
    this.formGroup
      .get('colOne')
      ?.valueChanges.pipe(takeUntil(this.unsubSubject))
      .subscribe(() => this.checkValue());
    this.formGroup
      .get('colMiddle')
      ?.valueChanges.pipe(takeUntil(this.unsubSubject))
      .subscribe(() => this.updateResult());
  }
  checkValue() {
    const inputValue = this.formGroup.get('colOne')?.value;
    if (!inputValue) {
      return;
    }
    if (inputValue < 0) {
      this.formGroup.get('colOne')?.setValue(1);
    } else if (!Number.isInteger(inputValue)) {
      this.formGroup.get('colOne')?.setValue(Math.round(inputValue));
    }
    this.updateResult();
  }
  updateResult() {
    const selectValue = this.formGroup.get('colMiddle')?.value;
    if (selectValue === 'p') {
      this.checkIsPrime();
    } else {
      this.checkFibonacci();
    }
  }
  checkIsPrime() {
    const inputValue = this.formGroup.get('colOne')?.value;
    let isPrimeNumber = true;
    if (inputValue === 1) {
      this.results = false;
    } else {
      for (let i = 2; i < inputValue; i++) {
        if (inputValue % i == 0) {
          isPrimeNumber = false;
          break;
        }
      }
      this.results = isPrimeNumber;
    }
  }

  isPerfectSquare(inputNubmer: number) {
    let s = Math.floor(Math.sqrt(inputNubmer));
    return s * s == inputNubmer;
  }

  checkFibonacci() {
    const inputValue = this.formGroup.get('colOne')?.value;
    this.results =
      this.isPerfectSquare(5 * inputValue * inputValue + 4) ||
      this.isPerfectSquare(5 * inputValue * inputValue - 4);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubSubject.next(true);
  }
}
