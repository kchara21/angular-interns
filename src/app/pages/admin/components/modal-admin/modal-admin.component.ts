import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BaseFormIntern } from '../../../../shared/utils/base-form-intern';
import { UsersService } from '../../services/users.service';

enum Action{
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.component.html',
  styleUrls: ['./modal-admin.component.scss']
})


export class ModalAdminComponent implements OnInit {
  actionTODO = Action.NEW;
  showCiPasswordField = true;
  
  constructor(
  @Inject(MAT_DIALOG_DATA) public data:any, 
  public internForm: BaseFormIntern, 
  private userSvc:UsersService) { }

  ngOnInit(): void {
    if(this.data?.interns.hasOwnProperty('id')){
      this.actionTODO = Action.EDIT;
      this.patchFormData();
      this.internForm.baseForm.updateValueAndValidity();
      this.showCiPasswordField = false;
    }
  }

  
  onSavePasante():void{
    const formValue = this.internForm.baseForm.value;
    if(this.actionTODO === Action.NEW){
        this.userSvc.newPasante(formValue).subscribe(res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Intern Created',
            showConfirmButton: false,
            timer: 1000
          })
        });
    }else{
      //edit
      const internId = this.data?.interns?.id;
      this.userSvc.updatePasante(internId,formValue).subscribe(res=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Intern Update',
          showConfirmButton: false,
          timer: 1000
        })
        
      })
    }
  }


  checkField(field:string):boolean{
    return this.internForm.isValidField(field);
  }

  private patchFormData(): void {

    this.internForm.baseForm.patchValue({
        nombre: this.data?.interns?.nombre,
        ci: this.data?.interns?.ci,
        ingresoPracticas: this.data?.interns?.ingresoPracticas,
        egresoPracticas: this.data?.interns?.egresoPracticas,
        ingresoViamatica: this.data?.interns?.ingresoViamatica,
        lider: this.data?.interns?.lider,
        celular: this.data?.interns?.celular,
        correo: this.data?.interns?.correo,
        semestre: this.data?.interns?.semestre,
        sector: this.data?.interns?.sector,
        avance: this.data?.interns?.avance,
        disponibilidad: this.data?.interns?.disponibilidad,
        observacion: this.data?.interns?.observacion,
        almuerzo: this.data?.interns?.almuerzo,
        tecnologia: this.data?.interns?.tecnologia,
        universidad: this.data?.interns?.universidad,
        carrera: this.data?.interns?.carrera,
        tipoPasantias: this.data?.interns?.tipoPasantias,
        horario: this.data?.interns?.horario,
        proyecto: this.data?.interns?.proyecto,
    }
    );
  }

}
