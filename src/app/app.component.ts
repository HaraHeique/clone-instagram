import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';

  ngOnInit(): void {
    // web app Firebase configuration
    // POSSUI TRÊS SERVIÇOS PRINCIPAIS: AUTHETICATION, DATABASE (GUARDAR DADOS), STORAGE (DOCUMENTOS BINÁRIOS (BLOB))
    const FIREBASE_CONFIG = {
      apiKey: "AIzaSyC2PvDkHL1wkoCPfkLKixotTM2INPRcupc",
      authDomain: "angular-instagram-clone-575cd.firebaseapp.com",
      databaseURL: "https://angular-instagram-clone-575cd.firebaseio.com",
      projectId: "angular-instagram-clone-575cd",
      storageBucket: "angular-instagram-clone-575cd.appspot.com",
      messagingSenderId: "582111429678",
      appId: "1:582111429678:web:c6c5772f24f3dd0a9c4bbf",
      measurementId: "G-7YQXELTB15"
    };

    // Initialize Firebase
    firebase.initializeApp(FIREBASE_CONFIG);
    firebase.analytics();
  }
}
