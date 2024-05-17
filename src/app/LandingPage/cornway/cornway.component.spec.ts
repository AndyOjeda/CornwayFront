import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CornwayComponent } from './cornway.component';

describe('CornwayComponent', () => {
  let component: CornwayComponent;
  let fixture: ComponentFixture<CornwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CornwayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CornwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
