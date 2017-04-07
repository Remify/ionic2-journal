import {Component,} from '@angular/core';
import {NavController, ActionSheetController, AlertController} from 'ionic-angular';
import {ImagePicker} from "@ionic-native/image-picker";
import {StoreService} from "../../providers/storage";
import {Entry} from "../../model/entry.class";
import * as moment from 'moment';
import {DatePicker} from '@ionic-native/date-picker';
import {Contacts} from "@ionic-native/contacts";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Base64ToGallery} from '@ionic-native/base64-to-gallery';
import {Geolocation} from "@ionic-native/geolocation";
import {GeoService} from "../../providers/geo-service";


@Component({
  selector: 'new-entry-page',
  templateUrl: 'newEntry.html'
})
export class NewEntryPage {

  currentDate: String;
  time: Date;
  entry: Entry;
  spinning :boolean = false;

  constructor(public navCtrl: NavController,
              private imagePicker: ImagePicker,
              private storeService: StoreService,
              private contacts: Contacts,
              private datePicker: DatePicker,
              private geolocation: Geolocation,
              private camera: Camera,
              public alertCtrl: AlertController,
              private geoService: GeoService,
              private base64ToGallery: Base64ToGallery,
              public actionSheetCtrl: ActionSheetController) {
    this.currentDate = new Date().toISOString();
    this.time = new Date();
    this.entry = new Entry();


    // Mise à jour de l'heure
    setInterval(() => {
      this.currentDate = new Date().toISOString();
    }, 1000);

    // Si l'application n'a pas la permission (elle est utilisé pour la premiere fois, la demander)
    this.imagePicker.hasReadPermission().then(
      (res) => {
        if (!res) {
          this.imagePicker.requestReadPermission()
        }
      }
    )
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
            this.openCamera();
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

  getGeoPos() {
    this.spinning = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geoService.getLocation(resp.coords.latitude, resp.coords.longitude).subscribe(
        (json: any)  => {

          this.spinning = false;
          // Récupération du nom de la ville à partir de la réponse de google maps
          let ville = "";
          json.results.forEach(
            AddressPart => {
              if(AddressPart.types.indexOf('locality') >= 0) {
                ville = AddressPart.address_components[0].short_name;
              }
            }
          )

          // Affichage d'une alerte box pour valider la position
          let confirm = this.alertCtrl.create({
            title: 'Votre position',
            message: 'Vous êtes à ' + ville,
            buttons: [
              {
                text: 'Annuler',
                handler: () => {
                  console.log('Position annulée');
                }
              },
              {
                text: 'Valider',
                handler: () => {
                  this.entry.ville = ville;
                }
              }
            ]
          });
          confirm.present();

        }
      )
    }).catch((error) => {

      this.spinning = false;
      console.log('Error getting location', error);
    });
  }

  openAlbum() {
    this.imagePicker.getPictures({}).then((results) => {
      for (var i = 0; i < results.length; i++) {

        // TODO: add if filePath image exist
        if (results[i] != "") {
          this.entry.addImage(results[i])
        }
      }
    }, (err) => console.log(err));
  }

  openCamera() {
    console.log('opening camera')

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }


    this.camera.getPicture(options).then((imageData) => {
      this.entry.addImage(imageData);
    }, (err) => {
      // Handle error
    });
  }

  openContacts() {

  }


  pickContact() {
    console.log('opening contacts');

    this.contacts.pickContact().then(
      contact => {
        console.log(contact);
        if (contact) {
          this.entry.addContact(contact);
        }
      })
      .catch(err => console.log(err))
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
    this.navCtrl.parent.select(0);

    // Return false pour pas que le form submit (effet de rechargement de la page)
    return false
  }


}
