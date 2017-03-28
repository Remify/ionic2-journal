import {Component,} from '@angular/core';
import {NavController, ActionSheetController} from 'ionic-angular';
import {ImagePicker} from "@ionic-native/image-picker";
import {StoreService} from "../../providers/storage";
import {Entry} from "../../model/entry.class";
import * as moment from 'moment';
import {EntriesPage} from  "../home/home";
import { DatePicker } from '@ionic-native/date-picker';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


@Component({
  selector: 'new-entry-page',
  templateUrl: 'newEntry.html'
})
export class NewEntryPage {

  currentDate: String;
  time: Date;
  entry: Entry;

  constructor(
    public navCtrl: NavController,
    private imagePicker: ImagePicker,
    private storeService: StoreService,
    private contacts: Contacts,
    private datePicker: DatePicker,
    public actionSheetCtrl: ActionSheetController) {
    this.currentDate = new Date().toISOString();
    this.time = new Date();
    this.entry = new Entry();
  }

  openImagesOptions() {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Ajouter des photos',
      buttons: [
        {
          text: 'Ouvrir l\'album',
          role: 'destructive',
          icon: 'albums',
          handler: () => {
            this.openAlbum();
          }
        },
        {
          text: 'Prendre une Photo',
          icon: 'camera',
          handler: () => {
            console.log('prendre une photo');
          }
        }
      ]
    });


    actionSheet.present();
  }

  displayTimePicker() {

    this.datePicker.show({
      date: new Date(),
      mode: 'time'
    }).then(
      date => this.time = date,
      err => console.log('Une errreur est survenue en tentant de récupérer l\'heure: ', err)
    );
  }

  openAlbum() {
    this.imagePicker.getPictures({}).then((results) => {
      for (var i = 0; i < results.length; i++) {

        // TODO: add if filePath image exist
        this.entry.addImage(results[i])
      }
    }, (err) => {
    });
  }

  openCamera() {


  }

  pickContact() {
    //
    // this.contacts.pickContact().then(
    //   cArr => console.log(cArr)
    // );

  }

  SubmitNewEntry() {

    this.entry.date = moment(this.currentDate).add().toDate();
    console.log(this.time);
    console.log(this.entry);
    // Sauvegarde l'entrée
    this.storeService.saveEntry(this.entry);
    // Change l'entrée courante par defaut
    this.entry = new Entry();
    // Redirection
    this.navCtrl.push(EntriesPage)

    // Return false pour pas que le form submit (pb de rechargement de la page)
    return false
  }


}
