import { Component, SimpleChanges } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Entry } from "../../model/entry.class";
import { StoreService } from "../../providers/storage";
import { ContactService } from "../../providers/contact";

/*
  Edition d'une entité

*/
@Component({
  selector: 'page-edit-entry',
  templateUrl: 'edit-entry.html'
})
export class EditEntryPage {

  needToUpdate = false;
  entry: Entry;

  // Index de l'entrée dans la liste
  dbIndex: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private store: StoreService,
              private contactService: ContactService ,
              public actionSheetCtrl: ActionSheetController) {
    this.entry = this.navParams.data.entry;
    this.dbIndex = this.store.getIndexOfEntry(this.entry);
  }

  ionViewDidLoad() {

  }

   ngOnChanges(changes: SimpleChanges) {
    this.needToUpdate = true;
  }

  update() {
    if (this.store.update(this.dbIndex, this.entry)) {
      this.navCtrl.pop();
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
            this.deleteEntry();
          }
        }
      ]
    });


    // Affichage
    actionSheet.present();
  }

  pressImageOptions(uri :string) {

    // Instance du action sheet
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Supprimer',
      buttons: [
        {
          text: 'Supprimer l\'image',
          role: 'destructive',
          icon: 'delete',
          handler: () => {
            this.deleteImageInEntry(uri);
          }
        }
      ]
    });


    // Affichage
    actionSheet.present();

  }

  deleteImageInEntry(uri :string) {
    this.entry.deleteImage(uri);
    this.needToUpdate = true;
  }

  deleteEntry() {
      this.store.delete(this.entry);
      this.navCtrl.pop();
  }

  clearPos() {
    this.entry.clearPos();
    this.needToUpdate = true;
  }

  pressClearContact(id :string) {
    this.entry.clearContact(id);
    this.needToUpdate = true;
  }


  getContactName(id:string) {
    let res = "";
    let contact = this.contactService.get(id);
    if(contact) {
      res = contact.displayName;
    }
    return res;
  }

}
