import { Injectable } from '@angular/core'
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { ErrorMessages } from '../const/ErrorMessages'

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  static customValidator(controlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control.get(controlName)
      if (!form?.errors) return null
      const [error] = Object.keys(form.errors)
      return { [controlName]: ErrorMessages[error] }
    }
  }

  static passwordMatchValidator(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control.get(controlName)
      if (form.value === control.get('password').value) {
        return null
      }
      form?.setErrors({ [controlName]: true })
      return { [controlName]: ErrorMessages['mismatch'] }
    }
  }
}
