import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      aUser?.uid && this.setProfile(aUser.uid);
    });
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
    this.profile = (await this.profileService.getProfile(uid)).data();
  }
}
