import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { DepartmentComponent } from './Pages/department/department.component';
import { EmployeeComponent } from './Pages/employee/employee.component';
import { ParentcategoryComponent } from './Pages/parentcategory/parentcategory.component';
import { ChildCategoryComponent } from './Pages/child-category/child-category.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'department',
        component: DepartmentComponent,
      },
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'parent-category',
        component: ParentcategoryComponent,
      },
      {
        path: 'child-category',
        component: ChildCategoryComponent,
      },
      {
        path: 'employee',
        component: EmployeeComponent,
      },
    ],
  },
];
