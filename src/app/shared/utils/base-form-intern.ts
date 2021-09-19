import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormIntern {
  
  private string = /[a-zA-Z]/;
  private ci_num = /[0-9]/
  private num_string = /[a-zA-Z0-9 ]/;
  errorMessage = null;

  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    nombre: [
        '',
        [Validators.required,
         Validators.pattern(this.string),
         Validators.minLength(4),
         Validators.maxLength(20) ]
    ],

    ci: [
        '',
        [Validators.required,
        Validators.pattern(this.ci_num),
        Validators.minLength(10),
        Validators.maxLength(10),
    ]
    ],

    ingresoViamatica: [
        '',
        [Validators.required]
    ],

    ingresoPracticas: [
        '',
        [Validators.required]
    ],

    egresoPracticas: [
        '',
        [Validators.required]
    ],

    lider: [
        '',
        [Validators.required,
        Validators.pattern(this.string),
        Validators.minLength(5)]
    ],

    celular: [
        '',
        [Validators.required,
        Validators.pattern(this.ci_num),
        Validators.maxLength(10),
        Validators.minLength(10)]
    ],

    correo: [
        '',
        [Validators.required,
        Validators.email]
    ],

    semestre: [
        '',
        [Validators.required,
         Validators.pattern(this.num_string)]
    ],

    sector: [
        '',
        [Validators.pattern(this.num_string)]
    ],

    avance: [
        '',
        [Validators.pattern(this.num_string)]

    ],


    disponibilidad: [
        '',
        [Validators.pattern(this.num_string)]

    ],

    observacion: [
        '',
        [Validators.pattern(this.num_string)]

    ],

    almuerzo: [
        '',
        [Validators.required]
    ],

    
    tecnologia: [
        '',
        [Validators.pattern(this.string)]

    ],

    universidad: [
        '',
        [Validators.required,
         Validators.pattern(this.string) ]
    ],

    carrera: [
        '',
        [Validators.required,
         Validators.pattern(this.string)]
    ],

    tipoPasantias: [
        '',
        [Validators.required,
         Validators.pattern(this.string)]
    ],


    horario: [
        '',
        [Validators.pattern(this.num_string)]
 
    ],

    proyecto: [
        '',
        [Validators.pattern(this.string)]

    ],


  });


  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
      !this.baseForm.get(field).valid
    );
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.baseForm.get(field);

    if (errors) {
        const minlength = errors?.minlength?.requiredLength;
        const maxlenght = errors?.maxlenght?.requiredLength;
      const messages = {
        required: 'You must enter a value.',
        pattern: 'Write correctly this field',
        minlength: `This field must be longer than ${minlength} characters`,
        maxlenght: `This field must be longer than ${maxlenght} characters`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
