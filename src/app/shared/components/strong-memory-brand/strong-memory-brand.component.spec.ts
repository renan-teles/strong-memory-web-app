import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrongMemoryBrandComponent } from './strong-memory-brand.component';

describe('StrongMemoryBrandComponent', () => {
  let component: StrongMemoryBrandComponent;
  let fixture: ComponentFixture<StrongMemoryBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrongMemoryBrandComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StrongMemoryBrandComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
