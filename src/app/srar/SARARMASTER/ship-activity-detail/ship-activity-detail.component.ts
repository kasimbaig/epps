import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';

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

interface ShipActivityDetail {
  id?: number;
  name: string;
  code: string;
  ship_activity_type: number;
  ship_activity_type_name: string;
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
  selector: 'app-ship-activity-detail',
  standalone:false,
  templateUrl: './ship-activity-detail.component.html',
  styleUrl: './ship-activity-detail.component.css'
})
export class ShipActivityDetailComponent implements OnInit {
  displayDialog: boolean = false;
  isMaximized: boolean = false;
  loading: boolean = false;
  isEdit: boolean = false;
  selectedShipActivityDetailId: number | null = null;
  selectedShipActivityTypeId: number | null = null;
  
  sararMasterForm: FormGroup = new FormGroup({
    ship_activity_detail: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    ship_activity_type: new FormControl('', [Validators.required]),
    status: new FormControl(false),
  });

  // Ship Activity Type Options for Dropdown
  shipActivityTypeOptions: ShipActivityType[] = [];

  // Static Ship Activity Type Data for Dropdown (reusing from ship-activity-type component)
  ship_activity_type_options_data = [
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

  // Static Ship Activity Details Data
  ship_activity_details_data = [
    {
        "id": 7,
        "name": "Navigation Drill",
        "code": "NAV_DRILL",
        "ship_activity_type": 5,
        "ship_activity_type_name": "DRILL-OPS",
        "ship_activity_type_code": "DOPS",
        "created_by_name": "EPPS",
        "modified_by_name": "RELAZA",
        "active": 1,
        "active_display": "Active"
    },
    {
        "id": 8,
        "name": "Damage Control Exercise",
        "code": "DC_EX",
        "ship_activity_type": 6,
        "ship_activity_type_name": "MAINT-CHECK",
        "ship_activity_type_code": "MCHK",
        "created_by_name": "EPPS",
        "modified_by_name": "EPPS",
        "active": 1,
        "active_display": "Active"
    },
    {
        "id": 9,
        "name": "Communication Check",
        "code": "COMM_CHK",
        "ship_activity_type": 5,
        "ship_activity_type_name": "DRILL-OPS",
        "ship_activity_type_code": "DOPS",
        "created_by_name": "EPPS",
        "modified_by_name": "EPPS",
        "active": 1,
        "active_display": "Active"
    }
  ];

  // Table Columns Configuration
  tableColumns = [
    { field: 'name', header: 'Ship Activity Detail', type: 'text', sortable: true, filterable: true },
    { field: 'code', header: 'Code', type: 'text', sortable: true, filterable: true },
    { field: 'ship_activity_type_name', header: 'Ship Activity Type', type: 'text', sortable: true, filterable: true },
    { field: 'active', header: 'Status', type: 'status', sortable: true, filterable: true },
  ];

  // Table Data
  tableData: ShipActivityDetail[] = [];

  // Delete confirmation modal properties
  showDeleteModal: boolean = false;
  itemToDelete: ShipActivityDetail | null = null;

  constructor(private apiService: ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadShipActivityTypes();
    this.loadShipActivityDetails();
  }

  // Load ship activity types for dropdown from static data
  loadShipActivityTypes(): void {
    this.loading = true;
    
    // Use static data instead of API call
    this.shipActivityTypeOptions = this.ship_activity_type_options_data;
    this.loading = false;
    
    console.log('Ship activity types loaded from static data for dropdown:', this.shipActivityTypeOptions.length, 'records');
  }

  // Load ship activity details from static data
  loadShipActivityDetails(): void {
    this.loading = true;
    
    // Use static data instead of API call
    this.tableData = this.ship_activity_details_data;
    this.loading = false;
    
    console.log('Ship activity details loaded from static data:', this.tableData.length, 'records');
  }

  // Helper method to get ship activity type ID by name
  getShipActivityTypeId(shipActivityTypeName: string): number | null {
    const shipActivityType = this.shipActivityTypeOptions.find(type => type.name === shipActivityTypeName);
    return shipActivityType ? shipActivityType.id || null : null;
  }

  // Helper method to get ship activity type name by ID
  getShipActivityTypeName(shipActivityTypeId: number): string {
    const shipActivityType = this.shipActivityTypeOptions.find(type => type.id === shipActivityTypeId);
    return shipActivityType ? shipActivityType.name : 'Unknown';
  }

  crudName='Add'
  
  openDialog(): void {
    this.isEdit = false;
    this.selectedShipActivityDetailId = null;
    this.selectedShipActivityTypeId = null;
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
    this.selectedShipActivityDetailId = null;
    this.selectedShipActivityTypeId = null;
  }

  // Event Handlers
  onView(data: ShipActivityDetail): void {
    this.crudName='View';
    this.isEdit = false;
    this.selectedShipActivityDetailId = data.id || null;
    this.selectedShipActivityTypeId = data.ship_activity_type;
    
    // Reset form first, then set values
    this.sararMasterForm.reset();
    this.sararMasterForm.patchValue({
      ship_activity_detail: data.name,
      code: data.code,
      ship_activity_type: data.ship_activity_type_name,
      status: data.active === 1
    });
    this.sararMasterForm.disable();
    this.displayDialog = true;
  }

  onEdit(data: ShipActivityDetail): void {
    this.isEdit = true;
    this.crudName='Edit';
    this.selectedShipActivityDetailId = data.id || null;
    this.selectedShipActivityTypeId = data.ship_activity_type;
    
    // Reset form first, then set values
    this.sararMasterForm.reset();
    this.sararMasterForm.patchValue({
      ship_activity_detail: data.name,
      code: data.code,
      ship_activity_type: data.ship_activity_type_name,
      status: data.active === 1
    });
    this.sararMasterForm.enable();
    this.displayDialog = true;
  }

  onDelete(data: ShipActivityDetail): void {
    console.log('Delete Ship Activity Detail:', data);
    this.itemToDelete = data;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.itemToDelete && this.itemToDelete.id) {
      // No loading needed for static data operations
      
      // Remove item from static data
      const index = this.ship_activity_details_data.findIndex(item => item.id === this.itemToDelete!.id);
      if (index > -1) {
        this.ship_activity_details_data.splice(index, 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ship activity detail deleted successfully'
        });
        this.loadShipActivityDetails(); // Reload data
        this.showDeleteModal = false;
        this.itemToDelete = null;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ship activity detail not found'
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
      const selectedShipActivityTypeId = this.getShipActivityTypeId(formValue.ship_activity_type);
      
      if (!selectedShipActivityTypeId) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please select a valid ship activity type'
        });
        return;
      }

      const payload = {
        name: formValue.ship_activity_detail,
        code: formValue.code,
        ship_activity_type: selectedShipActivityTypeId,
        status: formValue.status ? 'active' : 'inactive'
      };

      this.loading = true;

      if (this.isEdit && this.selectedShipActivityDetailId) {
        // Update existing ship activity detail in static data
        const index = this.ship_activity_details_data.findIndex(item => item.id === this.selectedShipActivityDetailId);
        if (index > -1) {
          const shipActivityType = this.shipActivityTypeOptions.find(type => type.id === selectedShipActivityTypeId);
          this.ship_activity_details_data[index] = {
            ...this.ship_activity_details_data[index],
            name: formValue.ship_activity_detail,
            code: formValue.code,
            ship_activity_type: selectedShipActivityTypeId,
            ship_activity_type_name: shipActivityType?.name || '',
            ship_activity_type_code: shipActivityType?.code || '',
            active: formValue.status ? 1 : 0,
            active_display: formValue.status ? 'Active' : 'Inactive'
          };
          
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ship activity detail updated successfully'
          });
          this.closeDialog();
          this.loadShipActivityDetails(); // Reload data
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ship activity detail not found for update'
          });
          this.loading = false;
        }
      } else {
        // Create new ship activity detail in static data
        const shipActivityType = this.shipActivityTypeOptions.find(type => type.id === selectedShipActivityTypeId);
        const newId = Math.max(...this.ship_activity_details_data.map(item => item.id || 0)) + 1;
        
        const newActivityDetail = {
          id: newId,
          name: formValue.ship_activity_detail,
          code: formValue.code,
          ship_activity_type: selectedShipActivityTypeId,
          ship_activity_type_name: shipActivityType?.name || '',
          ship_activity_type_code: shipActivityType?.code || '',
          created_by_name: 'EPPS',
          modified_by_name: 'EPPS',
          active: formValue.status ? 1 : 0,
          active_display: formValue.status ? 'Active' : 'Inactive'
        };
        
        this.ship_activity_details_data.push(newActivityDetail);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ship activity detail created successfully'
        });
        this.closeDialog();
        this.loadShipActivityDetails(); // Reload data
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

