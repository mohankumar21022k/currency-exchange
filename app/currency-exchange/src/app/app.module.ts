import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { OverlayComponent } from './overlay/overlay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    OverlayComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    NgChartsModule ,
],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
