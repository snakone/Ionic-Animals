import { Component } from '@angular/core';
import { NavController,
         Refresher,
         reorderArray } from 'ionic-angular';
import {  } from 'ionic-angular';

import { ANIMALS } from '../../data/data.animals';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  animals:Animal[] = [];
  audio = new Audio();
  playTime: any;
  ordering: boolean = false;

  constructor(public navCtrl: NavController) {
    this.animals = ANIMALS.slice(0);  // Create New Copy
  }

  play(animal:Animal){

    this.stopAudio(animal);

    if (animal.play){
      animal.play = false;
      return;
    }

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.play = true;

    this.playTime = setTimeout(()=> {
      animal.play = false;
    }, animal.duration * 1000)
  }

  private stopAudio(selectedAnimal:Animal){
    clearTimeout(this.playTime);

    this.audio.pause();
    this.audio.currentTime = 0;

    this.animals.forEach(x => {
      if (x.name != selectedAnimal.name){
        x.play = false;
      }
    });
  }

  deleteAnimal(index:number){
    this.animals.splice(index,1);
  }

  doRefresh(refresher:Refresher){
    setTimeout(()=> {
      this.animals = ANIMALS.slice(0);  // Create New Copy
      refresher.complete();
    }, 1000)
  }

  reorderList(index:any){
    this.animals = reorderArray(this.animals, index);
  }

}
