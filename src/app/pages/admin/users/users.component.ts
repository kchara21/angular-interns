import { takeUntil } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort) sort: MatSort;
  constructor(private userSvc: UsersService, private dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.userSvc.getAll().subscribe((users) => {
      this.dataSource.data = users;
    },
    (err)=>{
      Swal.fire(err.error.message);
      
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  onDelete(userId: number): void {
    if (window.confirm('Do you really want remove this user')) {
      this.userSvc
        .delete(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          // Update result after deleting the user.
          this.userSvc.getAll().subscribe((users) => {
            this.dataSource.data = users;
          },
          (err)=>{Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:  err.error.message
          });
        }
          );
        });
    }
  }

  

  onOpenModal(user = {}): void {
   
    let dialogRef = this.dialog.open(ModalComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'New user', user },
    });
    dialogRef.afterClosed().subscribe(result => {
     
      // Update result after adding new user.
      this.userSvc.getAll().subscribe((users) => {
        this.dataSource.data = users;
      },
      
      (err)=>{Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:  err.error.message
      })
    }
      );
    });
  }
  

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
