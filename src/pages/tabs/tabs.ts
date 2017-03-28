import { Component } from '@angular/core';

import { EntriesPage} from '../home/home';
import { ContactPage } from '../contact/contact';
import { NewEntryPage } from "../new-entry/new-entry";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = EntriesPage;
  tab2Root: any = NewEntryPage;
  tab3Root: any = ContactPage;

  constructor() {

  }
}
