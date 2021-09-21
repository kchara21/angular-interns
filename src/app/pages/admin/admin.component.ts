import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from './services/users.service';
import { ModalAdminComponent } from './components/modal-admin/modal-admin.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements  AfterViewInit, OnInit, OnDestroy {

 

  displayedColumns: string[] = ['actions','id', 'nombre', 'ci', 'ingresoPracticas', 'egresoPracticas', 'ingresoViamatica', 
  'lider','celular', 'correo', 'semestre', 'sector', 'avance', 
  'disponibilidad', 'observacion', 'almuerzo', 'tecnologia', 'universidad', 'carrera', 'tipoPasantias', 
  'horario', 'proyecto'];
  
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputFilter') inputFilter: ElementRef;

  constructor(private userSvc: UsersService, private dialog:MatDialog) {
   
  }

  private destroy$ = new Subject<any>();
  public filter = "";
  
  

  ngOnInit(): void {
    
    this.userSvc
    .getAllPasantes()
    .subscribe(
      (res)=>{
      this.dataSource.data = res;  
    },
    
        (err)=>{
          Swal.fire(err.error.message);
        });
  }


  filterByCi():void{
    this.userSvc
    .getByCiPasante(this.filter)
    .subscribe((res)=> {
      this.dataSource.data = res;
    },
    (err)=>{
      Swal.fire(err.statusText);
    }
    );
  }

  filterByName():void{
    this.userSvc
    .getByNamePasante(this.filter)
    .subscribe((res)=> {
      this.dataSource.data = res;
    },
    (err)=>{
      Swal.fire(err.statusText);
    }
    );
  }

  filterByProject():void{
    this.userSvc
    .getByProyectPasante(this.filter)
    .subscribe((res)=> {
      this.dataSource.data = res;
    },
    (err)=>{
      Swal.fire(err.statusText);
    }
    );
  }

 

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
  }

  
  title = 'angular-app';
  fileName= 'Pasantes.xlsx';
  exportExcel():void{
    let element = document.getElementById('tableInterns');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
  }


  onDelete(userId:number):void{
      if(window.confirm('Do you really want to remove this user?')){
        this.userSvc
        .deletePasantes(userId)
        .pipe(takeUntil(this.destroy$))
        
        .subscribe((res)=>{
          this.userSvc.getAllPasantes().subscribe((interns) => {
            this.dataSource.data = interns;
          });
        },
        (err)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:  err.error.message
          })
        }
        
        );

        
        
      }
  }




  onOpenModal(interns = {}):void{
    let dialogRef = this.dialog.open(ModalAdminComponent, {
      height: '650px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'New Interns', interns },
    });
    dialogRef.afterClosed().subscribe(result => {
      
      // Update result after adding new user.
      this.userSvc.getAllPasantes().subscribe((interns) => {
        this.dataSource.data = interns;
      },
      
      (err)=> {
        console.log(err);
       }
      );
    },
    
    err=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:  err.error.message
      });
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


  
  }


