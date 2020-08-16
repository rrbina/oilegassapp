import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarcacoesFormComponent } from './embarcacao-form.component';

describe('EmbarcacoesFormComponent', () => {
  let component: EmbarcacoesFormComponent;
  let fixture: ComponentFixture<EmbarcacoesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbarcacoesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbarcacoesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
