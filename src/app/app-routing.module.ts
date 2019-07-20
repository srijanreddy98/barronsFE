import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewComponent } from './create-new/create-new.component';
import { ReviseComponent } from './revise/revise.component';
import { RoteVocabComponent } from './rote-vocab/rote-vocab.component';
import { RootComponent } from './root/root.component';
import { OxfordComponent } from './oxford/oxford.component';
import { UnitWordsComponent } from './unit-words/unit-words.component';
import { ReviseAcrossUnitsComponent } from './revise-across-units/revise-across-units.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateNewComponent
  },
  {
    path: 'revise',
    component: ReviseComponent
  },
  {
    path: 'rote',
    component: RoteVocabComponent
  },
  {
    path: 'unit',
    component: UnitWordsComponent
  },
  {
    path: 'oxford',
    component: OxfordComponent
  },
  {
    path: 'across-units',
    component: ReviseAcrossUnitsComponent
  },
  {
    path: '',
    component: RootComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
