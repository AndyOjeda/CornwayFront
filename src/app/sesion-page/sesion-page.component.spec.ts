import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';

import { SesionPageComponent } from './sesion-page.component';

describe('SesionPageComponent', () => {
  let component: SesionPageComponent;
  let fixture: ComponentFixture<SesionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SesionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SesionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
