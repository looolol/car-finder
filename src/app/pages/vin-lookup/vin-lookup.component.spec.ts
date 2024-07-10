import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinLookupComponent } from './vin-lookup.component';

describe('VinLookupComponent', () => {
  let component: VinLookupComponent;
  let fixture: ComponentFixture<VinLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinLookupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
