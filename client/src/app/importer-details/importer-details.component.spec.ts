import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporterDetailsComponent } from './importer-details.component';

describe('ImporterDetailsComponent', () => {
  let component: ImporterDetailsComponent;
  let fixture: ComponentFixture<ImporterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImporterDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImporterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
