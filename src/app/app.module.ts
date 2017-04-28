import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler, AlertController} from 'ionic-angular';
import {MyApp} from './app.component';
import {NewEntryPage} from '../pages/new-entry/new-entry';
import {MomentModule} from 'angular2-moment';
import 'moment/locale/fr';
import {EntriesPage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {ImagePicker} from "@ionic-native/image-picker";
import {IonicStorageModule} from "@ionic/storage";
import {StoreService} from "../providers/storage";
import {FormsModule} from "@angular/forms";
import {DatePicker} from '@ionic-native/date-picker';
import {Contacts} from '@ionic-native/contacts';
import {Camera} from '@ionic-native/camera';
import {EntryPage} from "../pages/entry/entry";
import {Dotdotdot} from '../pipes/dotdotdot'
import {Base64ToGallery} from '@ionic-native/base64-to-gallery';
import {Geolocation} from "@ionic-native/geolocation";
import {GeoService} from "../providers/geo-service";
import {EditEntryPage} from "../pages/edit-entry/edit-entry";
import {ContactsPage} from "../pages/contacts/contacts";

@NgModule({
  declarations: [
    MyApp,
    NewEntryPage,
    ContactsPage,
    EntriesPage,
    TabsPage,
    EntryPage,
    EditEntryPage,
    Dotdotdot
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    FormsModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewEntryPage,
    ContactsPage,
    EntriesPage,
    EditEntryPage,
    TabsPage,
    EntryPage
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }, ImagePicker, StoreService, GeoService, Camera, DatePicker, Contacts, Geolocation, Base64ToGallery]
})
export class AppModule {
}
