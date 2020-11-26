import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamplePageComponent } from './example-page.component';


describe('GrpcWebExampleComponent', () => {
  let component: ExamplePageComponent;
  let fixture: ComponentFixture<ExamplePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamplePageComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
