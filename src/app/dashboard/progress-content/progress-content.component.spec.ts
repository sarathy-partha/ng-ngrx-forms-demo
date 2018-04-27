import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProgressContentComponent } from './progress-content.component';

describe('ProgressContentComponent', () => {
  let comp: ProgressContentComponent;
  let fixture: ComponentFixture<ProgressContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressContentComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProgressContentComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(comp, 'showProgressContent');
      comp.ngOnInit();
      expect(comp.showProgressContent).toHaveBeenCalled();
    });
  });
});
