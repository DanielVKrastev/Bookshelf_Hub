import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { matchPasswordsValidator } from '../app/utils/match-passwords.validator';

@Directive({
  selector: '[appMatchPassword]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: MatchPasswordDirective
  }
]
})
export class MatchPasswordDirective implements Validator {
  @Input() passwordControlName: string = '';
  @Input() rePasswordControlName: string = '';

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const validatorFn = matchPasswordsValidator(this.passwordControlName, this.rePasswordControlName);

    return validatorFn(control);
  }
}
