import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickListComponent } from './tick-list.component';

describe('TickListComponent', () => {
  let component: TickListComponent;
  let fixture: ComponentFixture<TickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
