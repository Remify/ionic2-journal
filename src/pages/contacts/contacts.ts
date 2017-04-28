import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {EntryContact} from "../../model/contact.class";
import {ContactService} from "../../providers/contact";

@Component({
  selector: 'page-contact',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  contacts: EntryContact[] = [];
  constructor(public navCtrl: NavController, private  contactService : ContactService) {
    this.contacts = this.contactService.contacts;

  }

}
