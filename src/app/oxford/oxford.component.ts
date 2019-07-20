import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/services/db.service';
import { Howl, Howler } from 'howler';
@Component({
  selector: 'app-oxford',
  templateUrl: './oxford.component.html',
  styleUrls: ['./oxford.component.scss']
})
export class OxfordComponent implements OnInit {
  words = [];
  word = '';
  meaning = '';
  unit = 1;
  itera = 0;
  correct = 0;
  showing = false;
  timeInMS = 1000;
  autoincrement = false;
  markedWords = false;
  mummyMode = false;
  pronounce: any;
  constructor(private dbservice: DbService){ }

  ngOnInit() {
    this.getWord();
  }
  getWord() {
    let query = {
      update: false,
      markedWords: this.markedWords,
      unit: [this.unit]
    };
    this.dbservice.queryOx(query).subscribe(
      res => {
        this.itera = 0;
        const body = JSON.parse(JSON.stringify(res));
        this.words = this.shuffle(body);
        this.pronounce = new Howl({src:[this.words[0].pronunciation.link ? this.words[0].pronunciation.link : '']})
      },
      err => console.log(err)
    );
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
  clicked() {
    this.showing = true;
    setTimeout(() => {
      if (this.itera === this.words.length - 1) {
        if (this.autoincrement) { this.unit++; }
        this.getWord();
        this.showing = false;
      } else {
        this.showing = false;
        this.itera += 1;
      }
      this.pronounce = new Howl({src:[this.words[this.itera].pronunciation.link ? this.words[this.itera].pronunciation.link : '']});
    }, this.mummyMode ? 20 :this.timeInMS);
  }
  marked(e, id) {
    let q = {
      update: true,
      mark1: e.checked,
      id: id
    };
    // let q = `update words set mark1=${e.checked} where id = ${id}`;
    this.dbservice.queryOx(q).subscribe();
  }
  play() {
    this.pronounce.play();
  }
}
