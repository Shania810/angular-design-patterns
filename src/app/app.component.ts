import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiaryComponent } from './diary/diary/diary.component';
import { HttpClientModule } from '@angular/common/http';
import { NewEntryFormTemplateComponent } from './diary/new-entry-form-template/new-entry-form-template.component';
import { NewEntryFormReactiveComponent } from './diary/new-entry-form-reactive/new-entry-form-reactive.component';
import { LoadService } from './loading/overlay/load.service';
import { OverlayComponent } from './loading/overlay/overlay.component';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DiaryComponent,HttpClientModule,NewEntryFormTemplateComponent,NewEntryFormReactiveComponent,OverlayComponent, BrowserModule,ToastrModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loadService = inject(LoadService)
  title = 'gym-diary';
}
