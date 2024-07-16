import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {EmpAddEditComponent} from './emp-add-edit/emp-add-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { DBConfig, NgxIndexedDBModule  } from 'ngx-indexed-db';
import { ServiceWorkerModule } from '@angular/service-worker';


// Ahead of time compiles requires an exported function for factories
// export function migrationFactory() {
//   // The animal table was added with version 2 but none of the existing tables or data needed
//   // to be modified so a migrator for that version is not included.
//   return {
//     1: (db, transaction) => {
//       const store = transaction.objectStore('employee');
//       store.createIndex('employee', 'employee', { unique: false });
//     },
//     3: (db, transaction) => {
//       const store = transaction.objectStore('people');
//       store.createIndex('age', 'age', { unique: false });
//     }
//   };
// }

const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'employee',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'position', keypath: 'position', options: { unique: false }, },
      { name: 'fromDate', keypath: 'fromDate', options: { unique: false }, },
      { name: 'toDate', keypath: 'toDate', options: { unique: false }, }
    ]
  }],
  // provide the migration factory to the DBConfig
  // migrationFactory
};

@NgModule({
  declarations: [
    AppComponent,
    EmpAddEditComponent,
  ],
  imports: [
    NgxIndexedDBModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }