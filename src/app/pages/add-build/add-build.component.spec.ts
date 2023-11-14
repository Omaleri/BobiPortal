import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildComponent } from './add-build.component';

describe('AddBuildComponent', () => {
  let component: BuildComponent;
  let fixture: ComponentFixture<BuildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildComponent]
    });
    fixture = TestBed.createComponent(BuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
