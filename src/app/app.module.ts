import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DbService } from 'src/services/db.service';
import { CreateNewComponent } from './create-new/create-new.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatButtonModule, MatCardModule, MatSlideToggleModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ReviseComponent } from './revise/revise.component';
import { RoteVocabComponent } from './rote-vocab/rote-vocab.component';
import { RootComponent } from './root/root.component';
import { OxfordComponent } from './oxford/oxford.component';
import { UnitWordsComponent } from './unit-words/unit-words.component';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbCheckboxModule, NbButtonModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ReviseAcrossUnitsComponent } from './revise-across-units/revise-across-units.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateNewComponent,
    ReviseComponent,
    RoteVocabComponent,
    RootComponent,
    OxfordComponent,
    UnitWordsComponent,
    ReviseAcrossUnitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbCheckboxModule,
    NbButtonModule
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
