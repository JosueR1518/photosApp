import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageAlertService {

  constructor(
    private alertController:AlertController,
    private toastCtrl:ToastController) { }


  async presentAlert(message:string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentToast(message:string,duration:number=2000) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position:'top'
    });
    toast.present();
  }




}
