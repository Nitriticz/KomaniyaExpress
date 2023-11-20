import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { IonModal } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnDestroy {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  profile!: any;
  credentials!: FormGroup;
  show = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      aUser?.uid && this.setProfile(aUser.uid);
    });
  }

  ngDoCheck() {
    if (
      window.location.href.includes('login') ||
      window.location.href.includes('register')
    ) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  logOut() {
    this.authService.logOut().then(() => {
      window.location.reload();
    });
  }

  async setProfile(uid: string) {
    this.profile = await this.profileService.getProfile(uid);
    let phoneCode = '';
    let phoneNumber = '';
    if (String(this.profile.phone).substring(0, 5) === '+56 9') {
      phoneCode = '+56 9';
      phoneNumber = String(this.profile.phone).substring(5);
    } else {
      phoneCode = '+377 6';
      phoneNumber = String(this.profile.phone).substring(6);
    }
    this.credentials = this.formBuilder.group({
      name: [this.profile.name, [Validators.required]],
      age: [this.profile.age, [Validators.required, Validators.min(18)]],
      phoneCode: [phoneCode, [Validators.required]],
      phone: [phoneNumber, [Validators.required]],
    });
  }
  @ViewChild(IonModal) modal!: IonModal;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    await this.profileService.updateProfile(
      this.profile.id,
      this.credentials.value
    );
    this.modal.dismiss(null, 'confirm');
    location.reload();
  }
}
