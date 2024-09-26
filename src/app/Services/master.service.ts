import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';
  constructor(private http: HttpClient) {}
  login(obj: any) {
    return this.http.post(this.apiUrl + 'Login', obj);
  }

  //department category
  getAllDepartments() {
    return this.http.get(`${this.apiUrl}GetDepartments`);
  }

  createDepartment(obj: any) {
    return this.http.post(`${this.apiUrl}CreateDepartment`, obj);
  }

  updateDepartment(obj: any) {
    return this.http.put(`${this.apiUrl}UpdateDepartment`, obj);
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${this.apiUrl}DeleteDepartment?id=${id}`);
  }

  //Parent Category
  getParentcategory() {
    return this.http.get(`${this.apiUrl}GetParentCategory`);
  }

  createParentCategory(obj: any) {
    return this.http.post(`${this.apiUrl}CreateParentCategory`, obj);
  }

  updateParentCategory(obj: any) {
    return this.http.put(`${this.apiUrl}UpdateParentCategory`, obj);
  }

  deleteParentCategory(id: number) {
    return this.http.delete(`${this.apiUrl}DeleteParentCategory?id=${id}`);
  }

  //child category
  getChildCategory() {
    return this.http.get(`${this.apiUrl}GetChildCategory`);
  }

  createChildCategory(obj: any) {
    return this.http.post(`${this.apiUrl}CreateChildCategory`, obj);
  }

  updateChildCategory(obj: any) {
    return this.http.put(`${this.apiUrl}UpdateChildCategory`, obj);
  }

  deleteChildCategory(id: number) {
    return this.http.delete(`${this.apiUrl}DeleteChildCategory?id=${id}`);
  }

  //employee
  getEmployees() {
    return this.http.get(`${this.apiUrl}GetEmployees`);
  }

  createEmployee(obj: any) {
    return this.http.post(`${this.apiUrl}CreateEmployee`, obj);
  }

  updateEmployee(obj: any) {
    return this.http.put(`${this.apiUrl}UpdateEmployee`, obj);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}DeleteEmployee?id=${id}`);
  }

  //roles
  getAllRoles() {
    return this.http.get(`${this.apiUrl}GetAllRoles`);
  }
}
