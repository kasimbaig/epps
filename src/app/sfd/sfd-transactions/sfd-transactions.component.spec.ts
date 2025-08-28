import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfdTransactionsComponent } from './sfd-transactions.component';

describe('SfdTransactionsComponent', () => {
  let component: SfdTransactionsComponent;
  let fixture: ComponentFixture<SfdTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SfdTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfdTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
