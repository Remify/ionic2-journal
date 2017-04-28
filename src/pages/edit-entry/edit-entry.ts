import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Entry } from "../../model/entry.class";
import { StoreService } from "../../providers/storage";
/*
  Generated class for the EditEntry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-entry',
  templateUrl: 'edit-entry.html'
})
export class EditEntryPage {

  entry: Entry;
  // Index de l'entrée dans la liste
  dbIndex: number;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private store: StoreService,
              public actionSheetCtrl: ActionSheetController) {
    this.entry = this.navParams.data.entry;
    this.dbIndex = this.store.getIndexOfEntry(this.entry);
  }

  ionViewDidLoad() {

  }

  update() {
    console.log('updating ' + this.entry.title)
    if (this.store.update(this.dbIndex, this.entry)) {
      this.navCtrl.pop();
    } else {
      // TODO : show error
    }
  }

  showOptions() {
    // Instance du action sheet
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Supprimer',
          role: 'destructive',
          icon: 'delete',
          handler: () => {
            console.log('Supprimer option')
          }
        },
        {
          text: 'Partager sur Facebook',
          icon: 'facebook',
          handler: () => {
            console.log('partager option')
          }
        }
      ]
    });


    // Affichage
    actionSheet.present();
  }

}
