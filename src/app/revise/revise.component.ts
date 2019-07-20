import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/services/db.service';
// declare function vibrateFor(timeArr: any): any;

import { Howl, Howler } from 'howler';
@Component({
  selector: 'app-revise',
  templateUrl: './revise.component.html',
  styleUrls: ['./revise.component.scss']
})
export class ReviseComponent implements OnInit {

  constructor(private dbservice: DbService) { }
  autoincrement = false;
  show = false;
  timeInMS = 800;
  id = 0;
  options = [];
  clickedHistory = [];
  correct = {meaning: ''};
  words = [];
  option = 4;
  unit = 1;
  unitwise = false;
  sound: Howl;
  ngOnInit() {
    this.sound = new Howl({
      src: ['/assets/wrong_3.wav']
    });
    this.getWord();
  }
  populateOptions(correct, id) {
    this.clickedHistory = [];
    // tslint:disable-next-line:curly
    for (let i = 0; i < 8; i++) this.clickedHistory.push(false);
    this.correct = correct;
    const query = `select meaning from words where id <> ${id} order by rand() limit ${this.option - 1}`;
    this.dbservice.query(query).subscribe(
      res => {
        this.options = this.shuffle([correct, ...JSON.parse(JSON.stringify(res))]);
        this.show = true;
      }
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
  clicked(ind) {
    this.clickedHistory[ind] = true;
    if (this.options[ind].meaning === this.correct.meaning) {
      window.navigator.vibrate(150);
      if (this.id === 9) {
        this.id = 0;
        // tslint:disable-next-line:curly
        if (this.autoincrement)this.unit += 1;
        this.getWord();
      } else {
        setTimeout(() => {
          this.id += 1;
          this.show = false;
          this.populateOptions({ meaning: this.words[this.id].meaning }, this.words[this.id].id);
        }, this.timeInMS);
      }
    } else {
      // vibrateFor(300);
      this.sound.play();
      window.navigator.vibrate(300);
    }
  }
  getWord() {
    this.id = 0;
    const query = `select * from words where unit = ${this.unit} order by rand()`;
    this.dbservice.query(query).subscribe(
      res => {
        this.words = this.shuffle(JSON.parse(JSON.stringify(res)));
        this.populateOptions({meaning: this.words[this.id].meaning}, this.words[this.id].id);
      }
    );
  }
  getColor(ind) {
    if (this.clickedHistory[ind]) {
      if (this.options[ind].meaning === this.correct.meaning) {
        return 'green';
      } else {
        return 'red';
      }
    } else {
      return 'black';
    }
  }
}
