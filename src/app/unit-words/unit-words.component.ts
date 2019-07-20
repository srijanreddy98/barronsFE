import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/services/db.service';

@Component({
  selector: 'app-unit-words',
  templateUrl: './unit-words.component.html',
  styleUrls: ['./unit-words.component.scss']
})
export class UnitWordsComponent implements OnInit {

  constructor(private dbservice: DbService) { }
  words = [];
  word = '';
  meaning = '';
  showGoogle = true;
  unit = 1;
  showing = false;
  timeInMS = 1000;
  markedWords = false;
  mummyMode = false;
  Object = Object;
  showSynonyms = true;
  colors = ['primary', 'success', 'info', 'warning', 'danger'];
  ngOnInit() {
    this.getWord();
  }
  getWord() {
    let query = {
      update: false,
      markedWords: this.markedWords,
      unit: [this.unit]
    };
    this.dbservice.query(query).subscribe(
      res => {
        this.colors = this.shuffle(this.colors);        
        const body = JSON.parse(JSON.stringify(res));
        body.forEach(element => {
          if (element.google) element.google = JSON.parse(element.google);
        });
        this.words = body;
      },
      err => console.log(err)
    );
  }
  clicked() {
    this.getWord();
  }
  marked(e, id, mark1) {
    let q = {
      update: true,
      mark1,
      id: id
    };
    // let q = `update words set mark1=${e.checked} where id = ${id}`;
    this.dbservice.query(q).subscribe();
  }
  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
