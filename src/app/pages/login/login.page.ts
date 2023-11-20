import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseError } from '@angular/fire/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  async login() {
    const user = await this.authService.login(this.credentials.value);
    if (user) {
      if (user instanceof FirebaseError) {
        this.presentAlert(user.code);
      } else {
        this.router.navigateByUrl('home');
      }
    }
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'No fue posible iniciar sesión',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
