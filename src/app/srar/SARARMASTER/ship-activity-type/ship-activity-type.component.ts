import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';
import { ViewDetailsComponent } from '../../../shared/components/view-details/view-details.component';

interface ShipLocation {
  id?: number;
  name: string;
  code: string;
  ship_state: number;
  ship_state_name: string;
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

interface ShipActivityType {
  id?: number;
  name: string;
  status: string;
  ship_location: number;
  ship_location_name: string;
  active: number;
  code?: string;
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
  selector: 'app-ship-activity-type',
  standalone:false,
  templateUrl: './ship-activity-type.component.html',
  styleUrl: './ship-activity-type.component.css'
})
export class ShipActivityTypeComponent  implements OnInit {
  displayDialog: boolean = false;
  isMaximized: boolean = false;
  loading: boolean = false;
  isEdit: boolean = false;
  selectedShipActivityTypeId: number | null = null;
  selectedShipLocationId: number | null = null;
  
  sararMasterForm: FormGroup = new FormGroup({
    ship_location: new FormControl('', [Validators.required]),
    ship_activity_type: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    status: new FormControl(false),
  });

  // Ship Location Options for Dropdown
  shipLocationOptions: ShipLocation[] = [];

  // Static Ship Location Data for Dropdown (reusing from ship-location component)
  ship_location_options_data = [
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

  // Static Ship Activity Data
  ship_activity_data = [
    {
        "id": 5,
        "name": "DRILL-OPS",
        "code": "DOPS",
        "ship_location": 15,
        "ship_location_name": "Dock Bay 3",
        "ship_location_code": "DB3",
        "status": "active",
        "created_by_name": "EPPS",
        "modified_by_name": "NAVSUP",
        "active": 1,
        "active_display": "Active"
    },
    {
        "id": 6,
        "name": "MAINT-CHECK",
        "code": "MCHK",
        "ship_location": 16,
        "ship_location_name": "Harbour Exit",
        "ship_location_code": "HEX",
        "status": "inactive",
        "created_by_name": "EPPS",
        "modified_by_name": "SYSTEM",
        "active": 0,
        "active_display": "Inactive"
    }
  ];

  // Table Columns Configuration
  tableColumns = [
    { field: 'name', header: 'Ship Activity Type', type: 'text', sortable: true, filterable: true },
    { field: 'code', header: 'Code', type: 'text', sortable: true, filterable: true },
    { field: 'ship_location_name', header: 'Ship Location', type: 'text', sortable: true, filterable: true },
    { field: 'active', header: 'Status', type: 'status', sortable: true, filterable: true },
  ];

  // Table Data
  tableData: ShipActivityType[] = [];

  // Delete confirmation modal properties
  showDeleteModal: boolean = false;
  itemToDelete: ShipActivityType | null = null;

  // View details properties
  isViewDetailsOpen: boolean = false;
  selectedDetails: any = null;
  viewDetailsTitle: string = 'Ship Activity Type Details';
  viewDetailsHeaders: any[] = [
    { key: 'name', label: 'Activity Type Name', type: 'text' },
    { key: 'status', label: 'Status', type: 'text' },
    { key: 'ship_location_name', label: 'Ship Location', type: 'text' },
    { key: 'active', label: 'Active Status', type: 'text' },
    { key: 'created_by_name', label: 'Created By', type: 'text' },
    { key: 'modified_by_name', label: 'Modified By', type: 'text' },
    { key: 'created_on', label: 'Created On', type: 'text' },
    { key: 'modified_on', label: 'Modified On', type: 'text' }
  ];

  constructor(private apiService: ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadShipLocations();
    this.loadShipActivityTypes();
  }

  // Load ship locations for dropdown from static data
  loadShipLocations(): void {
    this.loading = true;
    
    // Use static data instead of API call
    this.shipLocationOptions = this.ship_location_options_data;
    this.loading = false;
    
    console.log('Ship locations loaded from static data for dropdown:', this.shipLocationOptions.length, 'records');
  }

  // Load ship activity types from static data
  loadShipActivityTypes(): void {
    this.loading = true;
    
    // Use static data instead of API call
    this.tableData = this.ship_activity_data;
    this.loading = false;
    
    console.log('Ship activity types loaded from static data:', this.tableData.length, 'records');
  }

  // Helper method to get ship location ID by name
  getShipLocationId(shipLocationName: string): number | null {
    const shipLocation = this.shipLocationOptions.find(location => location.name === shipLocationName);
    return shipLocation ? shipLocation.id || null : null;
  }

  // Helper method to get ship location name by ID
  getShipLocationName(shipLocationId: number): string {
    const shipLocation = this.shipLocationOptions.find(location => location.id === shipLocationId);
    return shipLocation ? shipLocation.name : 'Unknown';
  }

  crudName='Add'
  
  openDialog(): void {
    this.isEdit = false;
    this.selectedShipActivityTypeId = null;
    this.selectedShipLocationId = null;
    this.sararMasterForm.reset();
    this.sararMasterForm.enable();
    this.crudName = 'Add';
    this.displayDialog = true;
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.sararMasterForm.reset();
    this.sararMasterForm.enable();
    this.crudName='Add';
    this.isEdit = false;
    this.selectedShipActivityTypeId = null;
    this.selectedShipLocationId = null;
  }

  // Event Handlers
  onView(data: ShipActivityType): void {
    this.selectedDetails = data;
    this.isViewDetailsOpen = true;
  }

  onEdit(data: ShipActivityType): void {
    this.isEdit = true;
    this.crudName='Edit';
    this.selectedShipActivityTypeId = data.id || null;
    this.selectedShipLocationId = data.ship_location;
    
    // Reset form first, then set values
    this.sararMasterForm.reset();
    this.sararMasterForm.patchValue({
      ship_activity_type: data.name,
      ship_location: data.ship_location_name,
      code: data.code,
      status: data.active === 1
    });
    this.sararMasterForm.enable();
    this.displayDialog = true;
  }

  onDelete(data: ShipActivityType): void {
    console.log('Delete Ship Activity Type:', data);
    this.itemToDelete = data;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.itemToDelete && this.itemToDelete.id) {
      this.loading = true;
      
      // Remove item from static data
      const index = this.ship_activity_data.findIndex(item => item.id === this.itemToDelete!.id);
      if (index > -1) {
        this.ship_activity_data.splice(index, 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ship activity type deleted successfully'
        });
        this.loadShipActivityTypes(); // Reload data
        this.showDeleteModal = false;
        this.itemToDelete = null;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ship activity type not found'
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
      const selectedShipLocationId = this.getShipLocationId(formValue.ship_location);
      
      if (!selectedShipLocationId) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please select a valid ship location'
        });
        return;
      }

      const payload = {
        name: formValue.ship_activity_type,
        status: formValue.status ? 'active' : 'inactive',
        ship_location: selectedShipLocationId,
        code: formValue.code
      };

      // No loading needed for static data operations

      if (this.isEdit && this.selectedShipActivityTypeId) {
        // Update existing ship activity type in static data
        const index = this.ship_activity_data.findIndex(item => item.id === this.selectedShipActivityTypeId);
        if (index > -1) {
          const shipLocation = this.shipLocationOptions.find(location => location.id === selectedShipLocationId);
          this.ship_activity_data[index] = {
            ...this.ship_activity_data[index],
            name: formValue.ship_activity_type,
            code: formValue.code,
            ship_location: selectedShipLocationId,
            ship_location_name: shipLocation?.name || '',
            ship_location_code: shipLocation?.code || '',
            active: formValue.status ? 1 : 0,
            active_display: formValue.status ? 'Active' : 'Inactive'
          };
          
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ship activity type updated successfully'
          });
          this.closeDialog();
          this.loadShipActivityTypes(); // Reload data
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ship activity type not found for update'
          });
        }
      } else {
        // Create new ship activity type in static data
        const shipLocation = this.shipLocationOptions.find(location => location.id === selectedShipLocationId);
        const newId = Math.max(...this.ship_activity_data.map(item => item.id || 0)) + 1;
        
                 const newActivity = {
           id: newId,
           name: formValue.ship_activity_type,
           code: formValue.code,
           ship_location: selectedShipLocationId,
           ship_location_name: shipLocation?.name || '',
           ship_location_code: shipLocation?.code || '',
           status: formValue.status ? 'active' : 'inactive',
           created_by_name: 'EPPS',
           modified_by_name: 'EPPS',
           active: formValue.status ? 1 : 0,
           active_display: formValue.status ? 'Active' : 'Inactive'
         };
        
        this.ship_activity_data.push(newActivity);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ship activity type created successfully'
        });
        this.closeDialog();
        this.loadShipActivityTypes(); // Reload data
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
