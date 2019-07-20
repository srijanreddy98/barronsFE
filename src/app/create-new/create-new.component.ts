import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DbService } from 'src/services/db.service';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {
  newWordForm: FormGroup;
  constructor(private dbService: DbService) { }
  word = 0;
  ngOnInit() {
    this.dbService.wordCount().subscribe(
      res => {
        this.word = JSON.parse(JSON.stringify(res)).count;
        // this.word += 1;
        this.newWordForm.reset({ unit: this.word % 10 == 0 ? Math.ceil((this.word ) / 10) + 1 :  Math.ceil((this.word ) / 10)});
      },
      err => console.log(err)
    );
    this.newWordForm = new FormGroup({
      'word': new FormControl(null, null),
      'meaning': new FormControl(null, null),
      'unit': new FormControl(Math.ceil((this.word) / 10), null)
    });
  }
  onNewWord() {
    this.word += 1;
    // tslint:disable-next-line:max-line-length
    const body = {
    id: this.word,
    word: this.newWordForm.value.word,
    meaning: this.newWordForm.value.meaning,
    unit: +this.newWordForm.value.unit,
    mark1: false,
    mark2: false
    };
    this.dbService.createWord(body).subscribe(
      res => this.newWordForm.reset({unit: this.word % 10 == 0 ? Math.ceil((this.word ) / 10) + 1 :  Math.ceil((this.word ) / 10)}),
      err => console.log(err)
    )
  }
}
