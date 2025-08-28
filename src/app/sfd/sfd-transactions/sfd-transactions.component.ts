import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TableComponent } from "../../shared/components/table/table.component";

@Component({
  selector: 'app-sfd-transactions',
  imports: [TableComponent],
  templateUrl: './sfd-transactions.component.html',
  styleUrl: './sfd-transactions.component.css'
})
export class SfdTransactionsComponent {
  departments: any[] = []; // Store API response
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
      this.getDepartments()
  }

  getDepartments(): void {
    this.apiService.get<any[]>('master/department/') // Adjust endpoint
      .subscribe({
        next: (data) => {
          this.departments = data;
        },
        error: (error) => {
          console.error('Error fetching departments:', error);
        }
      });
  }
}
