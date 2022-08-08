import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarModule } from 'primeng/sidebar';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DockModule } from 'primeng/dock';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TabViewModule } from 'primeng/tabview';
import { TransferComponent } from './modals/transfer/transfer.component'
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RegisterComponent } from './register/register.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './modals/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransferComponent,
    RegisterComponent,
    SigninComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    BrowserAnimationsModule,
    ConfirmPopupModule,
    ButtonModule,
    DockModule,
    InputTextModule,
    FormsModule,
    MenubarModule,
    CardModule,
    DividerModule,
    VirtualScrollerModule,
    ChartModule,
    DynamicDialogModule,
    DialogModule,
    TabViewModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    PasswordModule,
    BlockUIModule,
    ProgressSpinnerModule,
    ToastModule,
    ConfirmDialogModule,
    CalendarModule,
    FileUploadModule,
    HttpClientModule

  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
