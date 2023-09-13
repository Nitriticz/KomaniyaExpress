import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NewPaquetePage } from './new-paquete.page';

describe('NewPaquetePage', () => {
  let component: NewPaquetePage;
  let fixture: ComponentFixture<NewPaquetePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewPaquetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
