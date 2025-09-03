import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';
import { ViewDetailsComponent } from '../../../shared/components/view-details/view-details.component';

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

interface ShipLocation {
  id?: number;
  name: string;
  status: string;
  ship_state: number;
  ship_state_name: string;
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
  results: any[];
}

@Component({
  selector: 'app-ship-location',
  standalone: false,
  templateUrl: './ship-location.component.html',
  styleUrl: './ship-location.component.css'
})
export class ShipLocationComponent implements OnInit {
  displayDialog: boolean = false;
  isMaximized: boolean = false;
  loading: boolean = false;
  isEdit: boolean = false;
  selectedShipLocationId: number | null = null;
  selectedShipStateId: number | null = null;

  sararMasterForm: FormGroup = new FormGroup({
    ship_location: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    ship_state: new FormControl('', [Validators.required]),
    status: new FormControl(false),
  });

  // Ship State Options for Dropdown
  shipStateOptions: ShipState[] = [];

  // Static Ship State Data for Dropdown
  ship_state_options_data = [
    {
        "id": 40,
        "active": 1,
        "code": "DCK",
        "name": "Docked at Base",
        "created_by": 1,
        "active_display": "Active"
    },
    {
        "id": 41,
        "active": 1,
        "code": "SRT",
        "name": "Sea Trials",
        "created_by": 2,
        "active_display": "Active"
    },
    {
        "id": 42,
        "active": 0,
        "code": "RSV",
        "name": "Under Reserve",
        "created_by": 3,
        "active_display": "Inactive"
    }
  ];

  // Static Ship Location Data
  ship_location_data = [
    {
        "id": 15,
        "name": "Dock Bay 3",
        "code": "DB3",
        "ship_state": 40,
        "ship_state_name": "Docked at Base",
        "ship_state_code": "DCK",
        "created_by_name": "EPPS",
        "modified_by_name": "NAVSUP",
        "active": 1,
        "active_display": "Active"
    },
    {
        "id": 16,
        "name": "Harbour Exit",
        "code": "HEX",
        "ship_state": 41,
        "ship_state_name": "Sea Trials",
        "ship_state_code": "SRT",
        "created_by_name": "EPPS",
        "modified_by_name": "SYSTEM",
        "active": 0,
        "active_display": "Inactive"
    }
  ];

  // Table Columns Configuration
  tableColumns = [
    { field: 'name', header: 'Ship Location', type: 'text', sortable: true, filterable: true },
    { field: 'code', header: 'Code', type: 'text', sortable: true, filterable: true },
    { field: 'ship_state_name', header: 'Ship State', type: 'text', sortable: true, filterable: true },
    { field: 'active', header: 'Status', type: 'status', sortable: true, filterable: true },
  ];

  // Table Data
  tableData: any[] = [];

  // Delete confirmation modal properties
  showDeleteModal: boolean = false;
  itemToDelete: ShipLocation | null = null;

  // View details properties
  isViewDetailsOpen: boolean = false;
  selectedDetails: any = null;
  viewDetailsTitle: string = 'Ship Location Details';
  viewDetailsHeaders: any[] = [
    { key: 'name', label: 'Location Name', type: 'text' },
    { key: 'code', label: 'Code', type: 'text' },
    { key: 'ship_state_name', label: 'Ship State', type: 'text' },
    { key: 'status', label: 'Status', type: 'text' },
    { key: 'active', label: 'Active Status', type: 'text' },
    { key: 'created_by_name', label: 'Created By', type: 'text' },
    { key: 'modified_by_name', label: 'Modified By', type: 'text' },
    { key: 'created_on', label: 'Created On', type: 'text' },
    { key: 'modified_on', label: 'Modified On', type: 'text' }
  ];

  constructor(private apiService: ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadShipStates();
    this.loadShipLocations();
  }

  // Load ship states for dropdown from static data
  loadShipStates(): void {
    this.loading = true;
    
    // Use static data instead of API call
    this.shipStateOptions = this.ship_state_options_data;
    this.loading = false;
    
    console.log('Ship states loaded from static data for dropdown:', this.shipStateOptions.length, 'records');
  }

  // Load ship locations from static data
  loadShipLocations(): void {
    this.loading = true;
    
    // Use static data instead of API call
    this.tableData = this.ship_location_data;
    this.loading = false;
    
    console.log('Ship locations loaded from static data:', this.tableData.length, 'records');
  }

  // Helper method to get ship state name by ID
  getShipStateName(shipStateId: number): string {
    const shipState = this.shipStateOptions.find(state => state.id === shipStateId);
    return shipState ? shipState.name : 'Unknown';
  }

  // Helper method to get ship state ID by name
  getShipStateId(shipStateName: string): number | null {
    const shipState = this.shipStateOptions.find(state => state.name === shipStateName);
    return shipState ? shipState.id || null : null;
  }

  crudName = 'Add';

  openDialog(): void {
    this.isEdit = false;
    this.selectedShipLocationId = null;
    this.selectedShipStateId = null;
    this.sararMasterForm.reset();
    this.sararMasterForm.enable();
    this.crudName = 'Add';
    this.displayDialog = true;
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.sararMasterForm.reset();
    this.sararMasterForm.enable();
    this.crudName = 'Add';
    this.isEdit = false;
    this.selectedShipLocationId = null;
    this.selectedShipStateId = null;
  }

  // Event Handlers
  onView(data: ShipLocation): void {
    this.selectedDetails = data;
    this.isViewDetailsOpen = true;
  }

  onEdit(data: ShipLocation): void {
    this.isEdit = true;
    this.crudName = 'Edit';
    this.selectedShipLocationId = data.id || null;
    this.selectedShipStateId = data.ship_state;
    
    // Reset form first, then set values
    this.sararMasterForm.reset();
    this.sararMasterForm.patchValue({
      ship_location: data.name,
      code: data.code,
      ship_state: data.ship_state_name, // Use the API's ship_state_name directly
      status: data.active === 1
    });
    this.sararMasterForm.enable();
    this.displayDialog = true;
  }

  onDelete(data: ShipLocation): void {
    console.log('Delete Ship Location:', data);
    this.itemToDelete = data;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.itemToDelete && this.itemToDelete.id) {
      this.loading = true;
      
      // Remove item from static data
      const index = this.ship_location_data.findIndex(item => item.id === this.itemToDelete!.id);
      if (index > -1) {
        this.ship_location_data.splice(index, 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ship location deleted successfully'
        });
        this.loadShipLocations(); // Reload data
        this.showDeleteModal = false;
        this.itemToDelete = null;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ship location not found'
        });
        this.loading = false;
        this.showDeleteModal = false;
        this.itemToDelete = null;
      }
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.itemToDelete = null;
  }

  save(): void {
    if (this.sararMasterForm.valid) {
      const formValue = this.sararMasterForm.value;
      const selectedShipStateId = this.getShipStateId(formValue.ship_state);
      
      if (!selectedShipStateId) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please select a valid ship state'
        });
        return;
      }

      const payload = {
        name: formValue.ship_location,
        code: formValue.code,
        status: formValue.status ? 'active' : 'inactive',
        ship_state: selectedShipStateId
      };

      // No loading needed for static data operations

      if (this.isEdit && this.selectedShipLocationId) {
        // Update existing ship location in static data
        const index = this.ship_location_data.findIndex(item => item.id === this.selectedShipLocationId);
        if (index > -1) {
          const shipState = this.shipStateOptions.find(state => state.id === selectedShipStateId);
          this.ship_location_data[index] = {
            ...this.ship_location_data[index],
            name: formValue.ship_location,
            code: formValue.code,
            ship_state: selectedShipStateId,
            ship_state_name: shipState?.name || '',
            ship_state_code: shipState?.code || '',
            active: formValue.status ? 1 : 0,
            active_display: formValue.status ? 'Active' : 'Inactive'
          };
          
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ship location updated successfully'
          });
          this.closeDialog();
          this.loadShipLocations(); // Reload data
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ship location not found for update'
          });
        }
      } else {
        // Create new ship location in static data
        const shipState = this.shipStateOptions.find(state => state.id === selectedShipStateId);
        const newId = Math.max(...this.ship_location_data.map(item => item.id || 0)) + 1;
        
        const newLocation = {
          id: newId,
          name: formValue.ship_location,
          code: formValue.code,
          ship_state: selectedShipStateId,
          ship_state_name: shipState?.name || '',
          ship_state_code: shipState?.code || '',
          created_by_name: 'EPPS',
          modified_by_name: 'EPPS',
          active: formValue.status ? 1 : 0,
          active_display: formValue.status ? 'Active' : 'Inactive'
        };
        
        this.ship_location_data.push(newLocation);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ship location created successfully'
        });
        this.closeDialog();
        this.loadShipLocations(); // Reload data
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

