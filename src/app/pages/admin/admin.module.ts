import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ModalComponent } from './components/modal/modal.component';
import { MaterialModule } from '@app/material.module';
import { ModalAdminComponent } from './components/modal-admin/modal-admin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AdminComponent, ModalComponent, ModalAdminComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatRippleModule,
    MatDatepickerModule,
    AdminRoutingModule,
    MaterialModule,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
