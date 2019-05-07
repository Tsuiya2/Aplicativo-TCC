import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Sim } from '@ionic-native/sim/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public NavController: NavController, public  sim: Sim, public geolocation: Geolocation, public emailComposer: EmailComposer,  public androidPermissions: AndroidPermissions) { }
  
  public simInfo: any;
  public cards: any;
  mensagem: string;
  subject='Denuncia';
  body='';
  to='tsuiya.hachiman@gmail.com';
  public lat: number;
  public long: number;


  local(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    }

  enviar(){
    let email = {
      to: this.to,
      subject: this.subject,
      body: this.mensagem,
      isHtml: true
    }
    this.emailComposer.open(email);
  }

  async getSimData() {
    try {
      let simPermission = await this.sim.requestReadPermission();
      if (simPermission == "OK") {
        let simData = await this.sim.getSimInfo();
        this.simInfo = simData;
        this.cards = simData.cards;
        console.log(simData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  catar(){
    this.mensagem = this.body + '<br> <br>' + this.lat + '<br>' + this.long + '<br>' + this.cards;
  }


}
  