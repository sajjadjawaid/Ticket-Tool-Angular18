import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../Services/master.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [DatePipe, FormsModule, CommonModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent implements OnInit {
  deptList: any[] = [];
  newDeptObj: any = {
    deptId: 0,
    deptName: '',
    createdDate: '',
  };
  masterService = inject(MasterService);

  ngOnInit(): void {
    this.getDept();
  }

  getDept() {
    this.masterService.getAllDepartments().subscribe((res: any) => {
      this.deptList = res.data;
    });
  }

  onSubmit() {
    this.masterService
      .createDepartment(this.newDeptObj)
      .subscribe((res: any) => {
        if (res.result) {
          this.showAlert('Success', 'Department Created!!', 'success');
          this.getDept();
        } else {
          this.showAlert('Error', res.message, 'error');
        }
      });
  }

  onEdit(data: any) {
    this.newDeptObj = data;
  }

  updateDept() {
    this.masterService
      .updateDepartment(this.newDeptObj)
      .subscribe((res: any) => {
        if (res.result) {
          this.showAlert('Success', 'Department Updated!!', 'success');
          this.getDept();
        } else {
          this.showAlert('Error', res.message, 'error');
        }
      });
  }

  deleteDept(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this department?',
      icon: 'warning',
      showCancelButton: true, // Enable cancel button
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      customClass: {
        title: 'text-lg font-semibold', // Custom styles for the title
        popup: 'custom-popup-class', // Add custom styles for the entire popup
      },
      buttonsStyling: false, // To allow custom button styles
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with delete operation
        this.masterService.deleteDepartment(id).subscribe((res: any) => {
          if (res.result) {
            this.showAlert('Success', 'Department Deleted!!', 'success');
            this.getDept();
          } else {
            this.showAlert('Error', res.message, 'error');
          }
        });
      } else if (result.isDismissed) {
        this.showAlert('Cancelled', 'Department was not deleted.', 'error');
      }
    });
  }

  showAlert(title: string, text: string, icon: 'success' | 'error') {
    Swal.fire({
      title: title,
      text: text, // The standard way to show the text
      icon: icon,
      confirmButtonText: 'OK',
      customClass: {
        title: 'text-lg font-semibold', // Custom styles for the title
        popup: 'custom-popup-class', // Add your custom styles for the entire popup here if needed
      },
      buttonsStyling: false, // To allow custom button styles
    });
  }
}
