  import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { MessageService } from 'primeng/api';
import { DeleteConfirmationModalComponent } from '../../../shared/components/delete-confirmation-modal/delete-confirmation-modal.component';

// Interfaces for type safety
interface UnitOption {
  id: number;
  name: string;
}

interface ShipOption {
  id: number;
  name: string;
  unit_type: number;
}

interface DepartmentOption {
  id: number;
  name: string;
}

interface SfdDetail {
  id: number;
  active: number;
  ship_name: string;
  ship_code: string;
  equipment_name: string;
  equipment_code: string;
  location_name: string;
  location_code: string;
  nomenclature: string;
  department: string;
  ship: number;
  unit_type: number;
  [key: string]: any; // For other properties
}

// Static data constants
const STATIC_SFD_DETAILS: SfdDetail[] = [
  {
    "id": 4001,
    "active": 1,
    "ship_name": "INS KALINGA",
    "ship_code": "K23",
    "equipment_name": "RADAR SYSTEM",
    "equipment_code": "RAD-45231",
    "location_name": "Combat Information Centre",
    "location_code": "LOC-01-CIC",
    "nomenclature": "SURVEILLANCE RADAR",
    "oem_part_number": "OEM-45231-A",
    "no_of_fits": 2,
    "installation_date": "2021-06-15",
    "removal_date": null,
    "service_life": "15 YEARS",
    "authority_of_removal": null,
    "authority_of_installation": "NAVAL HQ",
    "is_srar_equipment": true,
    "removal_remarks": null,
    "included_in_dl": true,
    "created_by": 2,
    "ship": 11,
    "equipment": 5101,
    "location": 201,
    "supplier": 301,
    "parent_equipment": null,
    "child_equipment": null,
    "department": "WEAPONS",
    "manufacturer_name": "BHARAT ELECTRONICS LTD.",
    "manufacturer_address": "Bangalore, India",
    "supplier_name": "Naval Systems Supply",
    "supplier_address": "Dockyard Road, Mumbai",
    "image": null,
    "model": "BEL-XR-21",
    "obsolete": "No",
    "authority": "",
    "generic_code": null,
    "ilms_equipment_code": null,
    "acquaint_issued": null,
    "maintop_number": null,
    "country": "India",
    "manufacturer": 11,
    "supplier_id": 21,
    "parent": null,
    "type": "Electronic",
    "unit_type": 1
  },
  {
    "id": 4002,
    "active": 1,
    "ship_name": "INS SHAKTI",
    "ship_code": "S45",
    "equipment_name": "DIESEL GENERATOR",
    "equipment_code": "GEN-99872",
    "location_name": "Engine Room",
    "location_code": "LOC-05-ENGINE",
    "nomenclature": "GENERATOR",
    "oem_part_number": "OEM-DG-998",
    "no_of_fits": 4,
    "installation_date": "2019-11-20",
    "removal_date": null,
    "service_life": "20 YEARS",
    "authority_of_removal": null,
    "authority_of_installation": "E-IN-C BRANCH",
    "is_srar_equipment": false,
    "removal_remarks": null,
    "included_in_dl": false,
    "created_by": 1,
    "ship": 12,
    "equipment": 5102,
    "location": 202,
    "supplier": 302,
    "parent_equipment": null,
    "child_equipment": null,
    "department": "ENGINEERING",
    "manufacturer_name": "CATERPILLAR INC.",
    "manufacturer_address": "Illinois, USA",
    "supplier_name": "MarineTech Supplies",
    "supplier_address": "Chennai Port, India",
    "image": null,
    "model": "CAT-DG-4000",
    "obsolete": "No",
    "authority": "",
    "generic_code": null,
    "ilms_equipment_code": null,
    "acquaint_issued": null,
    "maintop_number": null,
    "country": "USA",
    "manufacturer": 12,
    "supplier_id": 22,
    "parent": null,
    "type": "Mechanical",
    "unit_type": 1
  },
  {
    "id": 4003,
    "active": 1,
    "ship_name": "INS VARUNA",
    "ship_code": "V77",
    "equipment_name": "SONAR SYSTEM",
    "equipment_code": "SON-66789",
    "location_name": "Sonar Room",
    "location_code": "LOC-07-SONAR",
    "nomenclature": "UNDERWATER SONAR",
    "oem_part_number": "OEM-SON-667",
    "no_of_fits": 1,
    "installation_date": "2020-03-10",
    "removal_date": null,
    "service_life": "12 YEARS",
    "authority_of_removal": null,
    "authority_of_installation": "NAVAL DOCKYARD",
    "is_srar_equipment": true,
    "removal_remarks": null,
    "included_in_dl": true,
    "created_by": 3,
    "ship": 13,
    "equipment": 5103,
    "location": 203,
    "supplier": 303,
    "parent_equipment": null,
    "child_equipment": null,
    "department": "OPERATIONS",
    "manufacturer_name": "THALES",
    "manufacturer_address": "Paris, France",
    "supplier_name": "Oceanic Systems Pvt Ltd",
    "supplier_address": "Kochi Naval Base",
    "image": null,
    "model": "THL-SON-900",
    "obsolete": "No",
    "authority": "",
    "generic_code": null,
    "ilms_equipment_code": null,
    "acquaint_issued": null,
    "maintop_number": null,
    "country": "France",
    "manufacturer": 13,
    "supplier_id": 23,
    "parent": null,
    "type": "Electronic",
    "unit_type": 1
  }
];

// Static options for dropdowns
const STATIC_UNIT_OPTIONS: UnitOption[] = [
  { id: 1, name: 'SHIP' },
  { id: 2, name: 'SUBMARINE' }
];

const STATIC_SHIP_OPTIONS: ShipOption[] = [
  { id: 11, name: 'INS KALINGA', unit_type: 1 },
  { id: 12, name: 'INS SHAKTI', unit_type: 1 },
  { id: 13, name: 'INS VARUNA', unit_type: 1 }
];

const STATIC_DEPARTMENT_OPTIONS: DepartmentOption[] = [
  { id: 1, name: 'WEAPONS' },
  { id: 2, name: 'ENGINEERING' },
  { id: 3, name: 'OPERATIONS' }
];

const STATIC_SUPPLIER_OPTIONS = [
  { id: 301, name: 'Naval Systems Supply' },
  { id: 302, name: 'MarineTech Supplies' },
  { id: 303, name: 'Oceanic Systems Pvt Ltd' }
];

const STATIC_LOCATION_OPTIONS = [
  { id: 201, name: 'Combat Information Centre', code: 'LOC-01-CIC' },
  { id: 202, name: 'Engine Room', code: 'LOC-05-ENGINE' },
  { id: 203, name: 'Sonar Room', code: 'LOC-07-SONAR' }
];

const STATIC_SUB_DEPARTMENT_OPTIONS = [
  { id: 1, name: 'Missile Systems' },
  { id: 2, name: 'Power Generation' },
  { id: 3, name: 'Underwater Systems' }
];

const STATIC_MANUFACTURER_OPTIONS = [
  { id: 11, name: 'BHARAT ELECTRONICS LTD.' },
  { id: 12, name: 'CATERPILLAR INC.' },
  { id: 13, name: 'THALES' }
];

const STATIC_EQUIPMENT_OPTIONS = [
  { id: 5101, name: 'RADAR SYSTEM', model: 'BEL-XR-21', manufacturer: 11, supplier: 301 },
  { id: 5102, name: 'DIESEL GENERATOR', model: 'CAT-DG-4000', manufacturer: 12, supplier: 302 },
  { id: 5103, name: 'SONAR SYSTEM', model: 'THL-SON-900', manufacturer: 13, supplier: 303 }
];

@Component({
  selector: 'app-sfd-list',
  standalone:false,
  templateUrl: './sfd-list.component.html',
  styleUrl: './sfd-list.component.css'
})
export class SfdListComponent implements OnInit {
  @Input() tableName: string = 'SFD Details';
  isChecked: boolean = false;
  displayDialog: boolean = false;
  isMaximized: boolean = false;
  isFormOpen: boolean = false;
  
  // Delete confirmation modal properties
  isDeleteConfirmationVisible: boolean = false;
  selectedSfd: any = null;
  
  // View details modal properties
  viewDisplayModal: boolean = false;
  
  // Form configuration for view details
  viewFormConfig = [
    // { label: 'Ship Name', key: 'ship_name', type: 'text' },
    { label: 'Equipment Name', key: 'equipment_name', type: 'text' },
    { label: 'Equipment Code', key: 'equipment_code', type: 'text' },
    { label: 'Location Name', key: 'location_name', type: 'text' },
    { label: 'Location Code', key: 'location_code', type: 'text' },
    { label: 'Nomenclature', key: 'nomenclature', type: 'text' },
    // { label: 'Model', key: 'model', type: 'text' },
    // { label: 'OEM Part Number', key: 'oem_part_number', type: 'text' },
    // { label: 'Manufacturer', key: 'manufacturer_name', type: 'text' },
    // { label: 'Supplier', key: 'supplier_name', type: 'text' },
    // { label: 'Installation Date', key: 'installation_date', type: 'text' },
    // { label: 'Removal Date', key: 'removal_date', type: 'text' },
    // { label: 'Service Life', key: 'service_life', type: 'text' },
    { label: 'No Of Fits', key: 'no_of_fits', type: 'text' },
    { label: 'Maintop Number', key: 'maintop_number', type: 'text' },
    { label: 'Active', key: 'active', type: 'status' },
    // { label: 'Department', key: 'department_name', type: 'text' },
    // { label: 'Parent Equipment', key: 'parent_equipment_name', type: 'text' },
    // { label: 'Sub Department', key: 'sub_department_name', type: 'text' },
    // { label: 'Authority Of Installation', key: 'authority_of_installation', type: 'text' },
    // { label: 'Authority Of Removal', key: 'authority_of_removal', type: 'text' },
    // { label: 'Included In DL', key: 'included_in_dl', type: 'text' },
    // { label: 'Installation Remarks', key: 'installation_remarks', type: 'textarea' },
    // { label: 'Removal Remarks', key: 'removal_remarks', type: 'textarea' }
  ];

// 

  sfdReferenceForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    ship: new FormControl(''),
    equipment: new FormControl(''),
    model: new FormControl({value:'',disabled:true}),
    nomenclature: new FormControl(''),
    oem_part_number: new FormControl(''),
    manufacturer: new FormControl({value:'',disabled:true}),
    supplier: new FormControl({value:'',disabled:true}),
    location_code: new FormControl({value:'',disabled:true}),
    location: new FormControl(''),
    installation_date: new FormControl(''),
    removal_date: new FormControl(''),
    service_life: new FormControl(''),
    no_of_fits: new FormControl(''),
    department: new FormControl(''),
    parent_equipment: new FormControl(''),
    sub_department: new FormControl(''),
    installation_remarks: new FormControl(''),
    authority_of_installation: new FormControl(''),
    authority_of_removal: new FormControl(''),
    removal_remarks: new FormControl(''),
    included_in_dl: new FormControl(true)
  });
  equipmentOptions: any[] = [];
  supplierOptions: any[] = [];
  locationOnBoardOptions: any[] = [];
  
  subDepartmentOptions: any[] = [];
  manufacturerOptions: any[] = [];

  // Table Columns Configuration
  tableColumns = [
    { field: 'ship_name', header: 'Ship Name', type: 'text', sortable: true, filterable: true },
    { field: 'equipment_code', header: 'Equipment Code', type: 'text', sortable: true, filterable: true },
    { field: 'equipment_name', header: 'Equipment Name', type: 'text', sortable: true, filterable: true },
    { field: 'location_name', header: 'Location Name', type: 'text', sortable: true, filterable: true },
    { field: 'location_code', header: 'Location Code', type: 'text', sortable: true, filterable: true },
    { field: 'nomenclature', header: 'Nomenclature', type: 'text', sortable: true, filterable: true },
    { field: 'no_of_fits', header: 'No. Of Fits', type: 'number', sortable: true, filterable: true },
    { field: 'active', header: 'Status', type: 'status', sortable: true, filterable: true },
  ];
  

  // Dropdown Options
  unitOptions: UnitOption[] = []

  shipOptions: ShipOption[] = []

  departmentOptions: DepartmentOption[] = []

  // Selected Values
  selectedUnit: UnitOption | null = null;
  selectedShip: ShipOption | null = null;
  selectedDepartment: DepartmentOption | null = null;

  // Table Data
  tableData: SfdDetail[] = [];
  
  constructor(private apiService: ApiService, private toast: MessageService) {}
  ngOnInit(): void {
    this.loadStaticData();
    // Don't load all data initially - wait for filters
    //console.log('SFD Component initialized - waiting for filter selection');
  }
  
  loadStaticData(): void {
    // Load static options for dropdowns
    this.unitOptions = [...STATIC_UNIT_OPTIONS];
    this.departmentOptions = [...STATIC_DEPARTMENT_OPTIONS];
    this.supplierOptions = [...STATIC_SUPPLIER_OPTIONS];
    this.locationOnBoardOptions = [...STATIC_LOCATION_OPTIONS];
    this.subDepartmentOptions = [...STATIC_SUB_DEPARTMENT_OPTIONS];
    this.manufacturerOptions = [...STATIC_MANUFACTURER_OPTIONS];
    this.equipmentOptions = [...STATIC_EQUIPMENT_OPTIONS];
  }
  
  currentPageApi(page: number, pageSize: number){
    // Only load data if both unit and ship are selected
    if (this.selectedUnit && this.selectedShip) {
      this.loadTableData(this.selectedUnit.id, this.selectedShip.id, this.selectedDepartment?.id);
    }
  }

  apiCall(){
    // Commented out API calls - using static data
    // Only load unit types initially - ships will be loaded when unit is selected
    // this.apiService.get('master/unit-type/').subscribe((res: any) => {
    //   this.unitOptions = res.results;
    // });
    
    // Load other independent dropdowns
    // this.apiService.get('master/department/?is_dropdown=true').subscribe((res: any) => {
    //   this.departmentOptions = res.results || res;
    // });
    // this.apiService.get('master/supplier/?is_dropdown=true').subscribe((res: any) => {
    //   this.supplierOptions = res.results || res;
    // });
    // this.apiService.get('master/locations/?is_dropdown=true').subscribe((res: any) => {
    //   this.locationOnBoardOptions = res.data || res;
    // });
    // Equipment will be loaded when ship is selected - removed from here
    
    // this.apiService.get('master/sub-department/?is_dropdown=true').subscribe((res: any) => {
    //   this.subDepartmentOptions = res.results || res;
    // });
    // this.apiService.get('master/manufacturers/?is_dropdown=true').subscribe((res: any) => {
    //   this.manufacturerOptions = res.data || res;
    // });
  }

  openDialog(): void {
    this.displayDialog = true;
    this.isEdit=false;
    this.sfdReferenceForm.reset();
    
    // Auto-fill the ship field with the currently selected ship from the outside filters
    if (this.selectedShip) {
      this.sfdReferenceForm.patchValue({
        ship: this.selectedShip.id,
        included_in_dl: true
      });
      
      // Load equipment options for the selected ship
      this.loadEquipmentOptions(this.selectedShip.id);
    } else {
      this.sfdReferenceForm.patchValue({
        included_in_dl: true
      });
    }
    
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.isDeleteConfirmationVisible = false;
    this.selectedSfd = null;
    this.isFormOpen = false;
    this.viewDisplayModal = false;
    this.sfdReferenceForm.reset();
  }

  saveReference(): void {
    // Commented out API calls - using static response
    this.sfdReferenceForm.enable()
    //console.log('Form values:', this.sfdReferenceForm.value);
    
    // Prepare the payload with proper data transformation
    const payload = {
      ...this.sfdReferenceForm.value,
      removal_date: this.sfdReferenceForm.value.removal_date,
      installation_date: this.sfdReferenceForm.value.installation_date,
      // Ensure all required fields are included with proper values
      ship: this.sfdReferenceForm.value.ship || null,
      equipment: this.sfdReferenceForm.value.equipment || null,
      department: this.sfdReferenceForm.value.department || null,
      supplier: this.sfdReferenceForm.value.supplier || null,
      parent_equipment: this.sfdReferenceForm.value.parent_equipment || null,
      // Replace location_onboard with location
      location: this.sfdReferenceForm.value.location || null,
      // Ensure service_life is included
      service_life: this.sfdReferenceForm.value.service_life || null,
      no_of_fits: this.sfdReferenceForm.value.no_of_fits || null,
    };

    //console.log('Form values:', this.sfdReferenceForm.value);
    //console.log('Sending payload:', payload);

    if(this.isEdit){
      // Commented out API call - using static response
      // this.apiService.put(`sfd/sfd-details/${this.sfdReferenceForm.value.id}/`, payload).subscribe((res: any) => {
      //   // this.toast.add({severity:'success', summary: 'Success', detail: 'SFD Updated Successfully'});
      //   //console.log(res);
      //   this.isEdit=false;
      //   // Refresh filtered data instead of all data
      //   if (this.selectedUnit && this.selectedShip) {
      //     this.loadTableData(this.selectedUnit.id, this.selectedShip.id, this.selectedDepartment?.id);
      //   }
      // }, (error) => {
      //   this.toast.add({severity:'error', summary: 'Error', detail: 'Failed to update SFD record'});
      //   console.error('Update error:', error);
      // });
      
      // Static success response
      this.toast.add({severity:'success', summary: 'Success', detail: 'SFD Updated Successfully'});
      this.isEdit=false;
      // Refresh filtered data instead of all data
      if (this.selectedUnit && this.selectedShip) {
        this.loadTableData(this.selectedUnit.id, this.selectedShip.id, this.selectedDepartment?.id);
      }
    }else{
      // Commented out API call - using static response
      // this.apiService.post('sfd/sfd-details/', payload).subscribe((res: any) => {
      //   // this.toast.add({severity:'success', summary: 'Success', detail: 'SFD Added Successfully'});
      //   //console.log(res);
      //   // Refresh filtered data instead of all data
      //   if (this.selectedUnit && this.selectedShip) {
      //     this.loadTableData(this.selectedUnit.id, this.selectedShip.id, this.selectedDepartment?.id);
      //   }
      // }, (error) => {
      //   this.toast.add({severity:'error', summary: 'Error', detail: 'Failed to add SFD record'});
      //   console.error('Create error:', error);
      // });
      
      // Static success response
      this.toast.add({severity:'success', summary: 'Success', detail: 'SFD Added Successfully'});
      // Refresh filtered data instead of all data
      if (this.selectedUnit && this.selectedShip) {
        this.loadTableData(this.selectedUnit.id, this.selectedShip.id, this.selectedDepartment?.id);
      }
    }
   
    this.closeDialog();
  }

  // Event Handlers
  onView(event : any) {
    //console.log('View SFD:', event);
    
    // Transform the data to match the viewFormConfig field names
    const transformedData = {
      ...event,
      // Map API response fields to view display fields
      ship_name: event.ship_name || event.ship?.name || 'N/A',
      equipment_code: event.equipment_code || event.equipment?.code || 'N/A',
      equipment_name: event.equipment_name || event.equipment?.name || 'N/A',
      location_name: event.location_name || event.location?.name || 'N/A',
      location_code: event.location_code || event.location?.code || 'N/A',
      nomenclature: event.nomenclature || 'N/A',
      model: event.model || 'N/A',
      oem_part_number: event.oem_part_number || 'N/A',
      manufacturer_name: event.manufacturer_name || event.manufacturer?.name || 'N/A',
      supplier_name: event.supplier_name || event.supplier?.name || 'N/A',
      installation_date: event.installation_date ? new Date(event.installation_date).toLocaleDateString() : 'N/A',
      removal_date: event.removal_date ? new Date(event.removal_date).toLocaleDateString() : 'N/A',
      service_life: event.service_life || 'N/A',
      no_of_fits: event.no_of_fits || 'N/A',
      department_name: event.department_name || event.department?.name || 'N/A',
      parent_equipment_name: event.parent_equipment_name || event.parent_equipment?.name || 'N/A',
      sub_department_name: event.sub_department_name || event.sub_department?.name || 'N/A',
      authority_of_installation: event.authority_of_installation || 'N/A',
      authority_of_removal: event.authority_of_removal || 'N/A',
      included_in_dl: event.included_in_dl ? 'Yes' : 'No',
      installation_remarks: event.installation_remarks || 'N/A',
      removal_remarks: event.removal_remarks || 'N/A'
    };
    
    this.selectedSfd = transformedData;
    this.viewDisplayModal = true;
  }
isEdit: boolean = false;
  onEdit(data: any): void {
    //console.log('Edit SFD:', data);
    this.isEdit = true;
    // Create a copy of data with properly formatted dates
    const formData = {
      ...data,
      manufacturer: data.equipment_details?.manufacturer || data.manufacturer,
      department: data.equipment_details?.department || data.department,
      supplier: data.equipment_details?.supplier || data.supplier,
      model: data.equipment_details?.model || data.model || '',
      removal_date: data.removal_date,
      installation_date: data.installation_date 
    };

    this.sfdReferenceForm.patchValue(formData);
    this.displayDialog = true;

    // Implement edit logic
  }



  onDelete(data: any): void {
    //console.log('Delete SFD:', data);
    this.selectedSfd = data; // Assign data to selectedSfd
    this.isDeleteConfirmationVisible = true; // Set visibility to true
  }

  confirmDelete(): void {
    if (this.selectedSfd) {
      // Commented out API call - using static response
      // this.apiService.delete(`sfd/sfd-details/${this.selectedSfd.id}/`).subscribe((res: any) => {
      //   this.toast.add({severity:'success', summary: 'Success', detail: 'SFD Deleted Successfully'});
      //   //console.log(res);
      //   // Refresh filtered data instead of all data
      //   if (this.selectedUnit && this.selectedShip) {
      //     this.loadTableData(this.selectedUnit.id, this.selectedShip.id, this.selectedDepartment?.id);
      //   }
      //   this.isDeleteConfirmationVisible = false;
      //   this.selectedSfd = null;
      // }, (error) => {
      //   this.toast.add({severity:'error', summary: 'Error', detail: 'Failed to delete SFD record'});
      //   console.error('Delete error:', error);
      //   this.isDeleteConfirmationVisible = false;
      //   this.selectedSfd = null;
      // });
      
      // Static success response
      this.toast.add({severity:'success', summary: 'Success', detail: 'SFD Deleted Successfully'});
      // Refresh filtered data instead of all data
      if (this.selectedUnit && this.selectedShip) {
        this.loadTableData(this.selectedUnit.id, this.selectedShip.id, this.selectedDepartment?.id);
      }
      this.isDeleteConfirmationVisible = false;
      this.selectedSfd = null;
    }
  }

  cancelDelete(): void {
    this.isDeleteConfirmationVisible = false;
    this.selectedSfd = null;
  }

  // Filter Methods
  onUnitChange(): void {
    //console.log('Unit changed to:', this.selectedUnit);
    if (!this.selectedUnit) return;
    
    let id = this.selectedUnit.id;
    //console.log("idCheck", id);
    
    // Filter ships for selected unit from static data
    this.shipOptions = STATIC_SHIP_OPTIONS.filter(ship => ship.unit_type === id);
    //console.log("response is ", this.shipOptions);
    //console.log("shipOption data", this.shipOptions);
    
    // Clear ship selection and table data when unit changes
    this.selectedShip = null;
    this.selectedDepartment = null;
    this.tableData = [];
  }

  onShipChange(): void {
    //console.log('Ship changed to:', this.selectedShip);
    // Clear table data when ship changes
    this.tableData = [];
    
    // Load equipment options for the selected ship
    if (this.selectedShip) {
      this.loadEquipmentOptions(this.selectedShip.id);
    }
    
    // Automatically load data if both unit and ship are selected
    if (this.selectedUnit && this.selectedShip) {
      //console.log('Both unit and ship selected, loading data...');
      this.loadTableData(this.selectedUnit.id, this.selectedShip.id, this.selectedDepartment?.id);
    }
  }

  onDepartmentChange(): void {
    // Only load data if both unit and ship are selected
    if (this.selectedUnit && this.selectedShip) {
      this.loadTableData(this.selectedUnit.id, this.selectedShip.id, this.selectedDepartment?.id);
    }
  }

  onSearch(): void {
    // Only show data when both unit and ship are selected
    if (this.selectedUnit && this.selectedShip) {
      this.loadTableData(this.selectedUnit.id, this.selectedShip.id, this.selectedDepartment?.id);
    } else {
      this.tableData = []; // Clear table if filters not selected
      // Show message to user
      this.toast.add({
        severity: 'info',
        summary: 'Selection Required',
        detail: 'Please select both Unit Type and Ship to view data.'
      });
    }
  }

  // Load table data for selected Unit + Ship + Department
  loadTableData(unitId: number, shipId: number, departmentId?: number) {
    //console.log('Loading table data for Unit ID:', unitId, 'Ship ID:', shipId, 'Department ID:', departmentId);
    
    // Filter static data based on selected criteria
    let filteredData = STATIC_SFD_DETAILS.filter(item => item.ship === shipId);
    
    if (departmentId) {
      // Filter by department if selected
      const selectedDept = this.departmentOptions.find(dept => dept.id === departmentId);
      if (selectedDept) {
        filteredData = filteredData.filter(item => item.department === selectedDept.name);
      }
    }
    
    if (filteredData.length > 0) {
      this.tableData = filteredData;
      //console.log('Table data loaded:', this.tableData.length, 'records');
    } else {
      this.tableData = [];
      this.toast.add({
        severity: 'info',
        summary: 'No Data',
        detail: 'No data found for the selected filters.'
      });
    }
  }

  onLocationOnBoardChange(event: any): void {
    //console.log('Location On Board changed to:', event);
    if (event) {
      // Find the selected location object from the options array
      const selectedLocation = this.locationOnBoardOptions.find(location => location.id === event);
      if (selectedLocation && selectedLocation.code) {
        this.sfdReferenceForm.patchValue({
          location_code: selectedLocation.code
        });
      }
    }
  }

  onEquipmentChange(event: any): void {
   const eqp = this.equipmentOptions.find((equipment: any) => equipment.id === event);
   //console.log(eqp);
   this.sfdReferenceForm.patchValue({
    model: eqp.model,
    manufacturer: eqp.manufacturer,
    supplier: eqp.supplier,
    // Removed department auto-fill - user must manually select department
    
   });
  }

  // Load equipment options based on selected ship
  loadEquipmentOptions(shipId: number): void {
    // Commented out API call - using static data
    // this.apiService.get(`master/equipment/?is_dropdown=true&ship=${shipId}`).subscribe((res: any) => {
    //   this.equipmentOptions = res.results || res;
    // }, (error) => {
    //   console.error('Error loading equipment options:', error);
    //   this.equipmentOptions = [];
    // });
    
    // Use static equipment options
    this.equipmentOptions = [...STATIC_EQUIPMENT_OPTIONS];
  }
}