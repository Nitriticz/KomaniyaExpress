import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepartidoresDetailPage } from './repartidores-detail.page';

describe('RepartidoresDetailPage', () => {
  let component: RepartidoresDetailPage;
  let fixture: ComponentFixture<RepartidoresDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RepartidoresDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
