import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SockitClintComponent } from './sockit-clint.component';

describe('SockitClintComponent', () => {
  let component: SockitClintComponent;
  let fixture: ComponentFixture<SockitClintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SockitClintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SockitClintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
