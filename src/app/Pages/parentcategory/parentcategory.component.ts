import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../Services/master.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css'; // PNotify core CSS
import '@pnotify/core/dist/BrightTheme.css'; // Optional: Bright theme

@Component({
  selector: 'app-parentcategory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './parentcategory.component.html',
  styleUrl: './parentcategory.component.css',
})
export class ParentcategoryComponent implements OnInit {
  pList: any[] = [];
  deptList: any[] = [];
  newObj: any = {
    categoryId: 0,
    categoryName: '',
    deptId: 0,
  };
  masterService = inject(MasterService);

  ngOnInit(): void {
    this.getParentCategory();
    this.getDept();
  }

  getParentCategory() {
    this.masterService.getParentcategory().subscribe((res: any) => {
      this.pList = res.data;
    });
  }

  getDept() {
    this.masterService.getAllDepartments().subscribe((res: any) => {
      this.deptList = res.data;
    });
  }

  onEdit(data: any) {
    this.newObj = data;
  }

  updateParentCategory() {
    this.masterService
      .updateParentCategory(this.newObj)
      .subscribe((res: any) => {
        if (res.result) {
          success({
            text: 'Parent Category is Updated!',
            delay: 3000, // Notification stays for 3 seconds
            width: '300px', // Responsive width
          });
          this.getParentCategory();
        } else {
          error({
            text: res.message,
            delay: 3000,
            width: '300px',
          });
        }
      });
  }

  deleteParentCategory(id: number) {
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
        this.masterService.deleteParentCategory(id).subscribe((res: any) => {
          if (res.result) {
            this.showAlert('Success', 'Department Deleted!!', 'success');
            this.getParentCategory();
          } else {
            this.showAlert('Error', res.message, 'error');
          }
        });
      } else if (result.isDismissed) {
        this.showAlert('Cancelled', 'Department was not deleted.', 'error');
      }
    });
  }

  onSubmit() {
    this.masterService
      .createParentCategory(this.newObj)
      .subscribe((res: any) => {
        if (res.result) {
          // Show success notification using PNotify
          success({
            text: 'Parent Category Created Successfully!',
            delay: 3000, // Notification stays for 3 seconds
            width: '300px', // Responsive width for all devices
          });
          this.getParentCategory();
        } else {
          // Show error notification using PNotify
          error({
            text: res.message,
            delay: 3000,
            width: '300px',
          });
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
