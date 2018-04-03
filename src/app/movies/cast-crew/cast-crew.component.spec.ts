import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastCrewComponent } from './cast-crew.component';

describe('CastCrewComponent', () => {
  let component: CastCrewComponent;
  let fixture: ComponentFixture<CastCrewComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CastCrewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CastCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
