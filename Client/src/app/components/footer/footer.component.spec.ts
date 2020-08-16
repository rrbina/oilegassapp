import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    ,
    imports: [
      CommonModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule        
    ],
    providers: [
      {provide: APP_BASE_HREF, useValue : '/' }
    ]
  })
    
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('criou footer', () => {
    expect(component).toBeTruthy();
  });
});
