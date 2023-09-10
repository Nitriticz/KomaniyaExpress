import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaquetesDetailPage } from './paquetes-detail.page';

describe('PaquetesDetailPage', () => {
  let component: PaquetesDetailPage;
  let fixture: ComponentFixture<PaquetesDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaquetesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
