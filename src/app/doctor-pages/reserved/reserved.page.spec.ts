import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedPage } from './reserved.page';

describe('ReservedPage', () => {
  let component: ReservedPage;
  let fixture: ComponentFixture<ReservedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
