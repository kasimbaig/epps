import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-linked-equipment',
  standalone:false,
  templateUrl: './linked-equipment.component.html',
  styleUrl: './linked-equipment.component.css'
})
export class LinkedEquipmentComponent implements OnInit {
  displayDialog: boolean = false;
  isMaximized: boolean = false;
  sararMasterForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    ship: new FormControl(''),
    ship_name: new FormControl(''),
    ship_id: new FormControl(''),
    equipment_name: new FormControl(''),
    equipment_id: new FormControl(''),
    sarar_equipemnt: new FormControl(''),
    sarar_equipment_id: new FormControl(''),
    location_name: new FormControl(''),
    location_id: new FormControl(''),
    location_on_board: new FormControl(''),
    status: new FormControl(''),
    active: new FormControl(''),
  });
 // Table Columns Configuration
 tableColumns = [
  { field: 'ship_name', header: 'Ship Name', type: 'text', sortable: true, filterable: true },
  { field: 'equipment_code', header: 'Equipment Code', type: 'text', sortable: true, filterable: true },
  { field: 'equipment_name', header: 'Equipment Name', type: 'text', sortable: true, filterable: true },
  { field: 'srar_equipment_nomenclature', header: 'Nomenclature', type: 'text', sortable: true, filterable: true },
  { field: 'location_name', header: 'Location', type: 'text', sortable: true, filterable: true },
  { field: 'active', header: 'Active', type: 'status', sortable: true, filterable: true },
];

  


  // Static Ship Options (same as equipment component)
  shipOptions = [
    {
      id: 1,
      name: "INS Vikrant",
      code: "VIK001"
    },
    {
      id: 2,
      name: "INS Kolkata",
      code: "KOL001"
    },
    {
      id: 3,
      name: "INS Udaygiri",
      code: "NLG001"
    },
    {
      id: 4,
      name: "INS Kora",
      code: "KOR001"
    },
    {
      id: 5,
      name: "INS Sindhughosh",
      code: "KILO01"
    },
    {
      id: 6,
      name: "INS Jalashwa",
      code: "JAL001"
    },
    {
      id: 7,
      name: "INS Deepak",
      code: "DEE001"
    },
    {
      id: 8,
      name: "INS Sandhayak",
      code: "SAN001"
    },
    {
      id: 9,
      name: "INS Saksham",
      code: "SAK001"
    },
    {
      id: 10,
      name: "INS Karwar",
      code: "KAR001"
    }
  ];

  // Static Location Options
  locationOptions = [
    { id: 1, name: "Bridge" },
    { id: 2, name: "Navigation Bridge" },
    { id: 3, name: "Combat Information Centre" },
    { id: 4, name: "Engine Room" },
    { id: 5, name: "Sonar Room" },
    { id: 6, name: "Flight Deck" },
    { id: 7, name: "Fuel Station" },
    { id: 8, name: "Survey Room" },
    { id: 9, name: "Damage Control Centre" },
    { id: 10, name: "EW Operations Room" }
  ];

  // Static Equipment Options
  equipmentOptions = [
    { id: 1, name: "Main Engine" },
    { id: 2, name: "Auxiliary Engine" },
    { id: 3, name: "Generator Set" },
    { id: 4, name: "Pump System" },
    { id: 5, name: "Valve Assembly" },
    { id: 6, name: "Control Panel" },
    { id: 7, name: "Sensor Array" },
    { id: 8, name: "Actuator System" },
    { id: 9, name: "Hydraulic Unit" },
    { id: 10, name: "Electrical Panel" }
  ];

  // Static Equipment Type Options (SRAR Equipment)
  equipmentTypeOptions = [
    { id: 1, equipment_name: "RADAR SYSTEM", nomenclature: "Surveillance Radar" },
    { id: 2, equipment_name: "ENGINE CONTROL UNIT", nomenclature: "Engine ECU" },
    { id: 3, equipment_name: "COMMUNICATION SYSTEM", nomenclature: "SATCOM" },
    { id: 4, equipment_name: "NAVIGATION SYSTEM", nomenclature: "GPS Navigator" },
    { id: 5, equipment_name: "SONAR SYSTEM", nomenclature: "Active Sonar" },
    { id: 6, equipment_name: "HELICOPTER HANDLING SYSTEM", nomenclature: "Helipad Equipment" },
    { id: 7, equipment_name: "FUEL TRANSFER SYSTEM", nomenclature: "Fuel Pump System" },
    { id: 8, equipment_name: "HYDROGRAPHIC SURVEY SYSTEM", nomenclature: "Survey Equipment" },
    { id: 9, equipment_name: "DAMAGE CONTROL SYSTEM", nomenclature: "Fire Fighting System" },
    { id: 10, equipment_name: "ELECTRONIC WARFARE SYSTEM", nomenclature: "EW Suite" }
  ];

  // Static SRAR Equipment Details Data (for dropdown display)
  srar_equipment_details_data = [
    {
      "id": 1,
      "equipment_name": "RADAR SYSTEM",
      "nomenclature": "Surveillance Radar",
      "code": "RADAR001",
      "active": 1
    },
    {
      "id": 2,
      "equipment_name": "ENGINE CONTROL UNIT",
      "nomenclature": "Engine ECU",
      "code": "ECU001",
      "active": 1
    },
    {
      "id": 3,
      "equipment_name": "COMMUNICATION SYSTEM",
      "nomenclature": "SATCOM",
      "code": "SATCOM001",
      "active": 1
    },
    {
      "id": 4,
      "equipment_name": "NAVIGATION SYSTEM",
      "nomenclature": "GPS Navigator",
      "code": "GPS001",
      "active": 1
    },
    {
      "id": 5,
      "equipment_name": "SONAR SYSTEM",
      "nomenclature": "Active Sonar",
      "code": "SONAR001",
      "active": 1
    },
    {
      "id": 6,
      "equipment_name": "HELICOPTER HANDLING SYSTEM",
      "nomenclature": "Helipad Equipment",
      "code": "HELI001",
      "active": 1
    },
    {
      "id": 7,
      "equipment_name": "FUEL TRANSFER SYSTEM",
      "nomenclature": "Fuel Pump System",
      "code": "FUEL001",
      "active": 1
    },
    {
      "id": 8,
      "equipment_name": "HYDROGRAPHIC SURVEY SYSTEM",
      "nomenclature": "Survey Equipment",
      "code": "SURVEY001",
      "active": 1
    },
    {
      "id": 9,
      "equipment_name": "DAMAGE CONTROL SYSTEM",
      "nomenclature": "Fire Fighting System",
      "code": "FIRE001",
      "active": 1
    },
    {
      "id": 10,
      "equipment_name": "ELECTRONIC WARFARE SYSTEM",
      "nomenclature": "EW Suite",
      "code": "EW001",
      "active": 1
    }
  ];

  // Static Linked Equipment Data
  linked_equipment_data = [
    {
      "id": 4001,
      "ship_name": "INS Vikrant",
      "equipment_code": "EQP-001",
      "equipment_name": "Main Engine",
      "srar_equipment_nomenclature": "Surveillance Radar",
      "location_name": "Engine Room",
      "active": 1,
      "ship": 1,
      "equipment": 1,
      "srar_equipment": 1,
      "location": 4
    },
    {
      "id": 4002,
      "ship_name": "INS Kolkata",
      "equipment_code": "EQP-002",
      "equipment_name": "Auxiliary Engine",
      "srar_equipment_nomenclature": "Engine ECU",
      "location_name": "Engine Room",
      "active": 1,
      "ship": 2,
      "equipment": 2,
      "srar_equipment": 2,
      "location": 4
    },
    {
      "id": 4003,
      "ship_name": "INS Udaygiri",
      "equipment_code": "EQP-003",
      "equipment_name": "Generator Set",
      "srar_equipment_nomenclature": "SATCOM",
      "location_name": "Bridge",
      "active": 1,
      "ship": 3,
      "equipment": 3,
      "srar_equipment": 3,
      "location": 1
    },
    {
      "id": 4004,
      "ship_name": "INS Kora",
      "equipment_code": "EQP-004",
      "equipment_name": "Pump System",
      "srar_equipment_nomenclature": "GPS Navigator",
      "location_name": "Navigation Bridge",
      "active": 1,
      "ship": 4,
      "equipment": 4,
      "srar_equipment": 4,
      "location": 2
    },
    {
      "id": 4005,
      "ship_name": "INS Sindhughosh",
      "equipment_code": "EQP-005",
      "equipment_name": "Valve Assembly",
      "srar_equipment_nomenclature": "Active Sonar",
      "location_name": "Sonar Room",
      "active": 1,
      "ship": 5,
      "equipment": 5,
      "srar_equipment": 5,
      "location": 5
    },
    {
      "id": 4006,
      "ship_name": "INS Jalashwa",
      "equipment_code": "EQP-006",
      "equipment_name": "Control Panel",
      "srar_equipment_nomenclature": "Helipad Equipment",
      "location_name": "Flight Deck",
      "active": 1,
      "ship": 6,
      "equipment": 6,
      "srar_equipment": 6,
      "location": 6
    },
    {
      "id": 4007,
      "ship_name": "INS Deepak",
      "equipment_code": "EQP-007",
      "equipment_name": "Sensor Array",
      "srar_equipment_nomenclature": "Fuel Pump System",
      "location_name": "Fuel Station",
      "active": 1,
      "ship": 7,
      "equipment": 7,
      "srar_equipment": 7,
      "location": 7
    },
    {
      "id": 4008,
      "ship_name": "INS Sandhayak",
      "equipment_code": "EQP-008",
      "equipment_name": "Actuator System",
      "srar_equipment_nomenclature": "Survey Equipment",
      "location_name": "Survey Room",
      "active": 1,
      "ship": 8,
      "equipment": 8,
      "srar_equipment": 8,
      "location": 8
    },
    {
      "id": 4009,
      "ship_name": "INS Saksham",
      "equipment_code": "EQP-009",
      "equipment_name": "Hydraulic Unit",
      "srar_equipment_nomenclature": "Fire Fighting System",
      "location_name": "Damage Control Centre",
      "active": 1,
      "ship": 9,
      "equipment": 9,
      "srar_equipment": 9,
      "location": 9
    },
    {
      "id": 4010,
      "ship_name": "INS Karwar",
      "equipment_code": "EQP-010",
      "equipment_name": "Electrical Panel",
      "srar_equipment_nomenclature": "EW Suite",
      "location_name": "EW Operations Room",
      "active": 1,
      "ship": 10,
      "equipment": 10,
      "srar_equipment": 10,
      "location": 10
    }
  ];

  // Table Data
  tableData: any[]   = [];
  
  constructor(private apiService: ApiService, private toast: MessageService) {}
  ngOnInit(): void {
    // Don't load data initially - wait for ship selection
    console.log('Linked Equipment Component initialized - waiting for ship selection');
    // All options are now static data, no need for API call
  }
  currentPageApi(page: number, pageSize: number, shipId?: string){
    if (!shipId) {
      // If no ship is selected, clear the table
      this.tableData = [];
      return;
    }
    
    // Use static data instead of API call
    this.tableData = this.linked_equipment_data.filter(equipment => equipment.ship === parseInt(shipId));
    console.log('Linked Equipment Data loaded from static data for ship:', shipId, 'with', this.tableData.length, 'records');
  }
// apiCall method removed - all options are now static data

  crudName='Add'
  openDialog(): void {
    this.displayDialog = true;
    // Reset form when opening for new record (not for view mode)
    if (!this.isEdit && this.crudName !== 'View') {
      this.sararMasterForm.reset();
      this.sararMasterForm.patchValue({
        active: true
      });
      // Enable form for new record
      this.sararMasterForm.enable();
    }
  }

  closeDialog(): void {
    this.displayDialog = false;
    // Only reset form if not in view mode
    if (this.crudName !== 'View') {
      this.sararMasterForm.reset();
      this.sararMasterForm.enable();
    }
    this.crudName='Add'
  }


  // Event Handlers
  onView(data: any): void {
    this.crudName='View'
    // Find the SRAR equipment details for proper dropdown population
    const srarEquipmentDetails = this.srar_equipment_details_data.find(item => item.id === data.srar_equipment);
    
    // Map API data to form fields
    const formData = {
      id: data.id,
      ship: data.ship,
      ship_name: data.ship_name,
      ship_id: data.ship,
      equipment_name: data.equipment_name,
      equipment_id: data.equipment,
      sarar_equipemnt: srarEquipmentDetails ? srarEquipmentDetails.equipment_name : data.srar_equipment_nomenclature,
      sarar_equipment_id: data.srar_equipment,
      location_name: data.location_name,
      location_id: data.location,
      location_on_board: data.location_name,
      active: data.active
    };
    this.sararMasterForm.patchValue(formData);
    this.sararMasterForm.get('active')?.setValue(data.active == 1 ? true : false);
    // Disable form for view mode
    this.sararMasterForm.disable();
    this.openDialog();
  }
  isEdit: boolean = false;
  onEdit(data: any): void {
    this.isEdit = true;
    this.crudName='Edit'
    // Find the SRAR equipment details for proper dropdown population
    const srarEquipmentDetails = this.srar_equipment_details_data.find(item => item.id === data.srar_equipment);
    
    // Map API data to form fields
    const formData = {
      id: data.id,
      ship: data.ship,
      ship_name: data.ship_name,
      ship_id: data.ship,
      equipment_name: data.equipment_name,
      equipment_id: data.equipment,
      sarar_equipemnt: srarEquipmentDetails ? srarEquipmentDetails.equipment_name : data.srar_equipment_nomenclature,
      sarar_equipment_id: data.srar_equipment,
      location_name: data.location_name,
      location_id: data.location,
      location_on_board: data.location_name,
      active: data.active
    };
    this.sararMasterForm.patchValue(formData);
    this.sararMasterForm.get('active')?.setValue(data.active === 1 ? true : false);
    // Enable form for edit mode
    this.sararMasterForm.enable();
    this.openDialog();
  }

  // Delete confirmation modal properties
  showDeleteModal: boolean = false;
  itemToDelete: any = null;

  onDelete(data: any): void {
    console.log('Delete Linked Equipment:', data);
    this.itemToDelete = data;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.itemToDelete) {
      // Remove item from static data
      const index = this.linked_equipment_data.findIndex(item => item.id === this.itemToDelete.id);
      if (index > -1) {
        this.linked_equipment_data.splice(index, 1);
        this.toast.add({severity:'success', summary: 'Success', detail: 'Linked Equipment Deleted Successfully'});
        console.log('Linked equipment deleted from static data');
        // Refresh data for the currently selected ship
        const currentShipId = this.selectedShip?.id;
        if (currentShipId) {
          this.currentPageApi(0, 0, currentShipId);
        }
        this.showDeleteModal = false;
        this.itemToDelete = null;
      } else {
        this.toast.add({severity:'error', summary: 'Error', detail: 'Linked equipment not found'});
        this.showDeleteModal = false;
        this.itemToDelete = null;
      }
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.itemToDelete = null;
  }

  save(){
    console.log('Form values:', this.sararMasterForm.value);
    
    if (this.sararMasterForm.valid) {
      const formData = this.sararMasterForm.value;
      
      if (this.isEdit && this.sararMasterForm.value.id) {
        // Update existing linked equipment in static data
        const index = this.linked_equipment_data.findIndex(item => item.id === this.sararMasterForm.value.id);
        if (index > -1) {
          const selectedShip = this.shipOptions.find(ship => ship.id === formData.ship);
          const selectedEquipment = this.equipmentOptions.find(equipment => equipment.id === formData.equipment_id);
          const selectedLocation = this.locationOptions.find(location => location.id === formData.location_id);
          const selectedSRAREquipment = this.equipmentTypeOptions.find(equipment => equipment.id === formData.sarar_equipment_id);
          
          this.linked_equipment_data[index] = {
            ...this.linked_equipment_data[index],
            ship_name: selectedShip?.name || '',
            equipment_code: `EQP-${formData.equipment_id?.toString().padStart(3, '0')}`,
            equipment_name: selectedEquipment?.name || '',
            srar_equipment_nomenclature: selectedSRAREquipment?.nomenclature || '',
            location_name: selectedLocation?.name || '',
            active: formData.active ? 1 : 0
          };
          
          this.toast.add({severity:'success', summary: 'Success', detail: 'Linked Equipment Updated Successfully'});
          this.closeDialog();
          // Refresh data for the currently selected ship
          const currentShipId = this.selectedShip?.id || this.sararMasterForm.value.ship;
          if (currentShipId) {
            this.currentPageApi(0, 0, currentShipId);
          }
        } else {
          this.toast.add({severity:'error', summary: 'Error', detail: 'Linked equipment not found for update'});
        }
      } else {
        // Create new linked equipment in static data
        const newId = Math.max(...this.linked_equipment_data.map(item => item.id || 0)) + 1;
        
        const selectedShip = this.shipOptions.find(ship => ship.id === formData.ship);
        const selectedEquipment = this.equipmentOptions.find(equipment => equipment.id === formData.equipment_id);
        const selectedLocation = this.locationOptions.find(location => location.id === formData.location_id);
        const selectedSRAREquipment = this.equipmentTypeOptions.find(equipment => equipment.id === formData.sarar_equipment_id);
        
        const newLinkedEquipment = {
          id: newId,
          ship_name: selectedShip?.name || '',
          equipment_code: `EQP-${formData.equipment_id?.toString().padStart(3, '0')}`,
          equipment_name: selectedEquipment?.name || '',
          srar_equipment_nomenclature: selectedSRAREquipment?.nomenclature || '',
          location_name: selectedLocation?.name || '',
          active: formData.active ? 1 : 0,
          ship: formData.ship,
          equipment: formData.equipment_id,
          srar_equipment: formData.sarar_equipment_id,
          location: formData.location_id
        };
        
        this.linked_equipment_data.push(newLinkedEquipment);
        
        this.toast.add({severity:'success', summary: 'Success', detail: 'Linked Equipment Added Successfully'});
        this.closeDialog();
        // Refresh data for the currently selected ship
        const currentShipId = this.selectedShip?.id || this.sararMasterForm.value.ship;
        if (currentShipId) {
          this.currentPageApi(0, 0, currentShipId);
        }
      }
    } else {
      this.toast.add({severity:'warn', summary: 'Warning', detail: 'Please fill all required fields'});
    }
  }
  
     selectedShip: any;
  
  onShipChange(event: any): void {
    // Extract the ship ID from the selected ship object
    const shipId = event?.id || event;
    
    if (shipId) {
      // Find the selected ship object to get additional details
      const selectedShip = this.shipOptions.find(ship => ship.id === shipId);
      
      if (selectedShip) {
        // Update form with ship details
        this.sararMasterForm.patchValue({
          ship: shipId,
          ship_name: selectedShip.name,
          ship_id: shipId
        });
        
        // Equipment options are already static data, no need to fetch
        // Fetch linked equipment data for the selected ship
        this.currentPageApi(0, 0, shipId);
      }
    } else {
      // If no ship is selected (dropdown cleared), clear the table data
      this.selectedShip = null;
      this.clearTableData();
      // Also clear the form ship-related fields
      this.sararMasterForm.patchValue({
        ship: '',
        ship_name: '',
        ship_id: ''
      });
    }
  }

  // Method to clear table data and equipment options when no ship is selected
  clearTableData(): void {
    this.tableData = [];
    this.equipmentOptions = [];
    console.log('No ship selected - clearing table data and equipment options');
  }

  onLocationOnBoardChange(event: any): void {
    console.log('Location changed to:', event);
    if (event) {
      // Find the selected location object from the options array
      const selectedLocation = this.locationOptions.find(location => location.name === event);
      if (selectedLocation) {
        this.sararMasterForm.patchValue({
          location_name: selectedLocation.name,
          location_id: selectedLocation.id,
          location_on_board: selectedLocation.name
        });
      }
    }
  }

  onEquipmentChange(event: any): void {
    const selectedEquipment = this.equipmentOptions.find(equipment => equipment.name === event);
    if (selectedEquipment) {
      this.sararMasterForm.patchValue({
        equipment_id: selectedEquipment.id
      });
    }
  }

  onEquipmentTypeChange(event: any): void {
    // Handle equipment type selection change
    console.log('Equipment type changed:', event);
    
    // Find the selected equipment to get additional details if needed
    const selectedEquipment = this.srar_equipment_details_data.find(equipment => equipment.equipment_name === event);
    if (selectedEquipment) {
      // Store the equipment ID in the form
      this.sararMasterForm.patchValue({
        sarar_equipment_id: selectedEquipment.id
      });
      console.log('Selected equipment details:', selectedEquipment);
    }
  }

 
}

