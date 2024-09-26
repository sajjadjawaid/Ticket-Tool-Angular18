import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../Services/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css'; // PNotify core CSS
import '@pnotify/core/dist/BrightTheme.css'; // Optional: Bright theme

@Component({
  selector: 'app-child-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './child-category.component.html',
  styleUrl: './child-category.component.css',
})
export class ChildCategoryComponent implements OnInit {
  cList: any[] = [];
  pList: any[] = [];
  newObj: any = {
    childCategoryId: 0,
    categoryName: '',
    parentCategoryId: 0,
  };

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.getChildCategory();
    this.getParentCategory();
  }

  getChildCategory() {
    this.masterService.getChildCategory().subscribe((res: any) => {
      this.cList = res.data;
    });
  }

  getParentCategory() {
    this.masterService.getParentcategory().subscribe((res: any) => {
      this.pList = res.data;
    });
  }

  onEdit(data: any) {
    this.newObj = data;
  }

  updateChildCategory() {
    this.masterService
      .updateChildCategory(this.newObj)
      .subscribe((res: any) => {
        if (res.result) {
          success({
            text: 'Child Category Updated Successfully!',
            delay: 3000, // Notification stays for 3 seconds
            width: '300px', // Responsive width for all devices
          });
          this.getChildCategory();
        } else {
          error({
            text: res.message,
            delay: 3000,
            width: '300px',
          });
        }
      });
  }

  onDelete(id: number) {
    this.masterService.deleteChildCategory(id).subscribe((res: any) => {
      if (res.result) {
        alert('Deleted successfully');
        this.getChildCategory();
      } else {
        alert(res.message);
      }
    });
  }

  onSubmit() {
    this.masterService
      .createChildCategory(this.newObj)
      .subscribe((res: any) => {
        if (res.result) {
          // Show success notification using PNotify
          success({
            text: 'Chil Category Created Successfully!',
            delay: 3000, // Notification stays for 3 seconds
            width: '300px', // Responsive width for all devices
          });
          this.getChildCategory();
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
}
