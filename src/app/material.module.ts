import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatExpansionModule,
  MatTabsModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSortModule,
  MatSelectModule,
  MatSnackBarModule,
} from '@angular/material';

const materialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatExpansionModule,
  MatTabsModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSortModule,
  MatSelectModule,
  MatSnackBarModule,
]

@NgModule({
  imports: [materialModules],
  exports: [materialModules],
  declarations: []
})
export class MaterialModule { }
