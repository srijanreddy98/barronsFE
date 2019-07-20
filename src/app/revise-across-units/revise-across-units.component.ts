import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/services/db.service';

@Component({
  selector: 'app-revise-across-units',
  templateUrl: './revise-across-units.component.html',
  styleUrls: ['./revise-across-units.component.scss']
})
export class ReviseAcrossUnitsComponent implements OnInit {

  constructor(private dbservice: DbService) { }
  words = [];
  word = '';
  meaning = '';
  showGoogle = false;
  unit = 1;
  unit2 = 10;
  itera = 0;
  correct = 0;
  showing = false;
  timeInMS = 1000;
  autoincrement = false;
  markedWords = false;
  mummyMode = false;
  pronounce: Howl;
  Object = Object;
  proPresent = true;
  shuffleWords = true;
  synth = window.speechSynthesis;
  speak = false;
  doubleMarked = false;
  num1 = 1;
  num2 = 10;
  voices = [];
  colors = ['primary', 'success', 'info', 'warning', 'danger'];
  ngOnInit() {
    this.synth.onvoiceschanged = function() {
      this.voices = window.speechSynthesis.getVoices();
  }.bind(this);
    this.getWord();
  }
  getWord() {
    let query = {
      update: false,
      markedWords: this.markedWords,
      doubleMarked: this.doubleMarked,
      unit: this.fillRange(this.unit, this.unit2)
    };
    this.dbservice.query(query).subscribe(
      res => {
        this.colors = this.shuffle(this.colors);
        this.itera = 0;
        let body = JSON.parse(JSON.stringify(res));
        body.forEach(element => {
          if (element.google) element.google = JSON.parse(element.google);
        });
        if (this.markedWords && this.num2 !== -1) {
          console.log(this.num1-1, this.num2);
          body = body.slice(this.num1-1, this.num2);
        }
        this.words = this.shuffleWords ? this.shuffle(body) : body;
        if (this.words && this.words[0] && this.words[0].google && this.words[0].google[0] && this.words[0].google[0].pronunciation) {
          this.pronounce = new Howl({src:[this.words[0].google[0].pronunciation]});
          this.proPresent = true;
         } else {
          this.proPresent = false;
         }
         this.startVoice();
      },
      err => console.log(err)
    );
  }
  startVoice() {
    if (this.speak && this.unit < 81) {
      let w = new SpeechSynthesisUtterance(`${this.words[this.itera].word} .`);
      this.synth.speak(w);
      // console.log(`${this.words[this.itera].word.google[0].meaning[Object.keys(this.words[this.itera].word.google[0].meaning)[0]].example}`)
      w.onend = function(event) {
        let b = new SpeechSynthesisUtterance(`${this.words[this.itera].meaning} .`);
        setTimeout(function() {
          this.synth.speak(b);
          b.onend = function(event) {
            this.clicked();
            return;
          }.bind(this);
        }.bind(this),200);
        return;
      }.bind(this);
    }
    return;
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
        this.startVoice();
        if (
          this.words[this.itera].google && 
          this.words[this.itera].google[0] && 
          this.words[this.itera].google[0].pronunciation) {
            this.pronounce = new Howl({src:[this.words[this.itera].google[0].pronunciation]});
            this.proPresent = true;
          } else {
            this.pronounce = new Howl({src:['']});
            this.proPresent = false;
          }
      }
    }, this.mummyMode ? 20 :this.timeInMS);
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
  marked2(e, id, mark2) {
    let q = {
      update: true,
      mark2,
      id: id
    };
    // let q = `update words set mark1=${e.checked} where id = ${id}`;
    this.dbservice.query(q).subscribe();
  }
  back(){
    this.itera -= 1;
  }
  fillRange = (start, end) => {
    const n = end - start + 1;
    return Array(n).fill(0).map((item, index) => start + index);
  }
}
