import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../Services/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  isModalOpen = false;
  isEditMode = false;

  newEmployee: any = {
    employeeId: 0,
    employeeName: '',
    contactNo: '',
    emailId: '',
    deptId: 0,
    password: '',
    gender: '',
    role: '',
  };

  openModal() {
    this.isModalOpen = true;
    this.isEditMode = false;
    this.getDept();
    this.getRoles();
    this.resetForm();
  }

  openEditModal(employee: any) {
    this.isModalOpen = true;
    this.isEditMode = true;
    this.newEmployee = { ...employee };
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }
  resetForm() {
    this.newEmployee = {
      employeeId: 0,
      employeeName: '',
      contactNo: '',
      emailId: '',
      password: '',
      deptId: 0,
      gender: '',
      role: '',
    };
  }

  ngOnInit(): void {
    this.getEmployee();
    this.getDept();
    this.getRoles();
  }

  currentPage: number = 1;
  itemsPerPage: number = 6;

  get totalPages(): number {
    return Math.ceil(this.employeeList.length / this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  employeeList: any[] = [];
  deptList: any[] = [];
  roleList: any[] = [];

  masterService = inject(MasterService);

  getEmployee() {
    this.masterService.getEmployees().subscribe((res: any) => {
      this.employeeList = res.data;
    });
  }

  getDept() {
    this.masterService.getAllDepartments().subscribe((res: any) => {
      this.deptList = res.data;
    });
  }

  getRoles() {
    this.masterService.getAllRoles().subscribe((res: any) => {
      this.roleList = res.data;
      console.log(this.roleList);
    });
  }

  onHandle() {
    if (this.isEditMode) {
      this.updateEmployee();
    } else {
      this.onSubmit();
    }
  }

  updateEmployee() {
    this.masterService
      .updateEmployee(this.newEmployee)
      .subscribe((res: any) => {
        if (res.result) {
          alert('Employee Updated Successfully!');
          this.getEmployee();
          this.resetForm();
        } else {
          alert(res.message);
        }
      });
  }

  onDeleteEmployee(id: number) {
    this.masterService.deleteEmployee(id).subscribe((res: any) => {
      if (res.result) {
        alert(res.message);
        console.log(id);

        this.getEmployee();
      } else {
        alert(res.message);
      }
    });
  }

  onSubmit() {
    this.masterService
      .createEmployee(this.newEmployee)
      .subscribe((res: any) => {
        if (res.result) {
          alert('Employee Created Successfully!');
          this.getEmployee();
          this.resetForm();
        } else {
          alert(res.messages);
        }
      });
  }
}
