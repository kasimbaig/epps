import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';

interface ShipState {
  id?: number;
  name: string;
  code: string;
  active: number;
  created_by_name?: string;
  modified_by_name?: string;
  active_display?: string;
  created_on?: string;
  modified_on?: string;
  created_ip?: string;
  modified_ip?: string;
  created_by?: number;
  modified_by?: number;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ShipState[];
}

@Component({
  selector: 'app-ship-state',
  standalone: false,
  templateUrl: './ship-state.component.html',
  styleUrl: './ship-state.component.css'
})
export class ShipStateComponent implements OnInit {
  displayDialog: boolean = false;
  isMaximized: boolean = false;
  loading: boolean = false;
  crudName: string = 'Add'; // Add the missing crudName property
  sararMasterForm: FormGroup = new FormGroup({
    ship_state: new FormControl(''),
    code: new FormControl(''),
    status: new FormControl(true),
  });

  // Static Ship State Data
  ship_state_data = [
    {
        "id": 40,
        "active": 1,
        "code": "DCK",
        "description": "Docked at Base",
        "created_by": "SYSTEM",
        "active_display": "Active"
    },
    {
        "id": 41,
        "active": 1,
        "code": "SRT",
        "description": "Sea Trials",
        "created_by": "NAVSUP",
        "active_display": "Active"
    },
    {
        "id": 42,
        "active": 0,
        "code": "RSV",
        "description": "Under Reserve",
        "created_by": "EPPS",
        "active_display": "Inactive"
    }
  ];

  // Table Columns Configuration
  tableColumns = [
    { field: 'name', header: 'Ship State', type: 'text', sortable: true, filterable: true },
    { field: 'code', header: 'Code', type: 'text', sortable: true, filterable: true },
    { field: 'active', header: 'Status', type: 'status', sortable: true, filterable: true },
  ];

  // Table Data
  tableData: any[] = [];

  // Pagination properties for server-side pagination
  totalRecords: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;

  // Delete confirmation modal properties
  showDeleteModal: boolean = false;
  itemToDelete: ShipState | null = null;

  constructor(private apiService: ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadShipStates();
    console.log('Ship State Component initialized with', this.tableData.length, 'records');
  }

  // Load all ship states from static data with pagination
  loadShipStates(page: number = 1, pageSize: number = this.pageSize): void {
    this.loading = true;
    this.currentPage = page;
    this.pageSize = pageSize;
    
    // Use static data instead of API call
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    // Map static data to match the expected interface
    const mappedData = this.ship_state_data.map(item => ({
      id: item.id,
      name: item.description,
      code: item.code,
      active: item.active,
      created_by_name: item.created_by,
      active_display: item.active_display
    }));
    
    this.tableData = mappedData.slice(startIndex, endIndex);
    this.totalRecords = mappedData.length;
    this.loading = false;
    
    console.log(`Ship states loaded from static data: page ${page}, ${this.tableData.length} records, total: ${this.totalRecords}`);
  }

  // Pagination event handlers
  onPageChange(event: any): void {
    console.log('Page changed:', event);
    const newPage = event.page + 1; // PrimeNG uses 0-based indexing
    const newPageSize = event.rows;
    
    // Hit the API again with new page parameters
    this.loadShipStates(newPage, newPageSize);
  }

  onRowsPerPageChange(event: any): void {
    console.log('Rows per page changed:', event);
    const newPageSize = event.rows;
    
    // Reset to first page and fetch new data
    this.currentPage = 1;
    this.loadShipStates(1, newPageSize);
  }

  openDialog(operation: string = 'Add'): void {
    this.crudName = operation;
    this.displayDialog = true;
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.crudName = 'Add';
    this.isEdit = false;
    this.selectedShipStateId = null;
    this.sararMasterForm.reset();
    this.sararMasterForm.enable();
  }

  // Event Handlers
  onView(data: ShipState): void {
    this.sararMasterForm.patchValue({
      ship_state: data.name,
      code: data.code,
      status: data.active === 1
    });
    this.openDialog('View');
    this.sararMasterForm.disable();
  }

  isEdit: boolean = false;
  selectedShipStateId: number | null = null;

  onEdit(data: ShipState): void {
    this.isEdit = true;
    this.selectedShipStateId = data.id || null;
    this.sararMasterForm.patchValue({
      ship_state: data.name,
      code: data.code,
      status: data.active === 1
    });
    this.openDialog('Edit');
  }

  onDelete(data: ShipState): void {
    console.log('Delete Ship State:', data);
    this.itemToDelete = data;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.itemToDelete && this.itemToDelete.id) {
      this.loading = true;
      this.apiService.delete(`srar/ship-states/${this.itemToDelete.id}/`).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ship state deleted successfully'
          });
                      this.loadShipStates(this.currentPage, this.pageSize); // Reload data with current pagination
            this.showDeleteModal = false;
            this.itemToDelete = null;
        },
        error: (error) => {
          console.error('Error deleting ship state:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete ship state'
          });
          this.loading = false;
          this.showDeleteModal = false;
          this.itemToDelete = null;
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.itemToDelete = null;
  }

  save(): void {
    if (this.sararMasterForm.valid) {
      const formValue = this.sararMasterForm.value;
      const payload = {
        name: formValue.ship_state,
        code: formValue.code,
        status: formValue.status ? 'active' : 'inactive'
      };

      this.loading = true;

      if (this.isEdit && this.selectedShipStateId) {
        // Update existing ship state
        this.apiService.put(`srar/ship-states/${this.selectedShipStateId}/`, payload).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Ship state updated successfully'
            });
            this.closeDialog();
            this.loadShipStates(this.currentPage, this.pageSize); // Reload data with current pagination
          },
          error: (error) => {
            console.error('Error updating ship state:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update ship state'
            });
            this.loading = false;
          }
        });
      } else {
        // Create new ship state
        this.apiService.post('srar/ship-states/', payload).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Ship state created successfully'
            });
            this.closeDialog();
            this.loadShipStates(this.currentPage, this.pageSize); // Reload data with current pagination
          },
          error: (error) => {
            console.error('Error creating ship state:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to create ship state'
            });
            this.loading = false;
          }
        });
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields'
      });
    }
  }
}
