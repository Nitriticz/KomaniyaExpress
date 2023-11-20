import { Component, OnDestroy, inject } from '@angular/core';
import { Paquete } from 'src/app/models/paquete.model';
import { Repartidor } from 'src/app/models/repartidor.model';
import { PaqueteService } from 'src/app/services/paquete-service.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnDestroy {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  profile!: any;

  ultPaquete!: Paquete;
  mejRepartidor!: Repartidor;

  constructor(
    private paqueteService: PaqueteService,
    private profileService: ProfileService
  ) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      aUser?.uid && this.setProfile(aUser.uid);
    });
    this.paqueteService.getPaquetes().then(() => {
      this.ultPaquete = this.paqueteService.getUltPaquete();
      this.mejRepartidor = this.paqueteService.getMejRepartidor();
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  ngDoCheck() {
    if (this.ultPaquete !== this.paqueteService.getUltPaquete()) {
      this.ultPaquete = this.paqueteService.getUltPaquete();
    }
    if (this.mejRepartidor !== this.paqueteService.getMejRepartidor()) {
      this.mejRepartidor = this.paqueteService.getMejRepartidor();
    }
  }

  getCantDelivs() {
    return this.paqueteService.getCantDelivs(this.mejRepartidor.id);
  }

  async setProfile(uid: string) {
    this.profile = await this.profileService.getProfile(uid);
  }
}
