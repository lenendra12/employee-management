import { NumberFormatStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
declare var db:any;
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public storagename = 'employeeDb';
  baseUrl: string = "http://localhost:3000/";
  
  constructor(private httpClient: HttpClient, private dbService: NgxIndexedDBService) {}

  addEmployee(data: any, id: number) {
    return new Promise(async(resolve, reject) => {
      if(db != undefined) {
        const request = await db.transaction([this.storagename], 'readwrite')
        .objectStore(this.storagename).put(data);

        request.onsuccess = await function(event: { target: { result: any; }; }) {
          if(event.target.result) {
            console.log('success');
            resolve(event.target.result);
          } else{
            console.log('error', event.target.result);
            resolve(false);
          }
        }
      }
    })
  }

  getEmployeeList() {
    return new Promise(async(resolve, reject) => {
      if(db != undefined) {
        const request = await db.transaction([this.storagename], 'readwrite')
        .objectStore(this.storagename).getAll()

        request.onsuccess = await function(event: { target: { result: any; }; }) {
          if(event.target.result) {
            console.log('success');
            resolve(event.target.result);
          } else{
            console.log('error');
            resolve(false);
          }
        }
      }
    })
  }

  deleteEmployee(id: number) {
    return new Promise((resolve, reject) => {
      if(db != undefined) {
        const transaction = db.transaction([this.storagename], 'readwrite')
        const store = transaction.objectStore(this.storagename);
        let request = store.delete(id)

        request.onsuccess = function(event: any) {
         console.log("successfully deleted an object")
         resolve(event.target.result);
        }

        request.onerror = function(err: any) {
          console.log("Error in request to delete")
          reject(false);
        }
      }
    })
  }
}