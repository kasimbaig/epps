import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-equipment',
standalone:false,
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.css'
})
export class EquipmentComponent 
implements OnInit {
  displayDialog: boolean = false;
  isMaximized: boolean = false;
     sararMasterForm: FormGroup = new FormGroup({
     id: new FormControl(''),
     ship: new FormControl(''),
     ship_name: new FormControl(''),
     ship_id: new FormControl(''),
     equipment_code: new FormControl(''),
     equipment_name: new FormControl(''),
     equipment_id: new FormControl(''),
     nomenclature: new FormControl(''),
     oem_part_number: new FormControl(''),
     no_of_fits: new FormControl(''),
     location_name: new FormControl(''),
     location_id: new FormControl(''),
     equipment_type: new FormControl(''),
     active: new FormControl(''),
   });
       // Table Columns Configuration
   tableColumns = [
    { field: 'ship_name', header: 'Ship Name', type: 'text', sortable: true, filterable: true },
    { field: 'equipment_code', header: 'Equipment Code', type: 'text', sortable: true, filterable: true },
    { field: 'equipment_name', header: 'Equipment Name', type: 'text', sortable: true, filterable: true },
    { field: 'nomenclature', header: 'Nomenclature', type: 'text', sortable: true, filterable: true },
    { field: 'location_name', header: 'Location', type: 'text', sortable: true, filterable: true },
    { field: 'active', header: 'Active', type: 'status', sortable: true, filterable: true },
    // { field: '', header: 'Link Equipment', type: 'text', sortable: true, filterable: true },
    { field: 'removal_date', header: 'Removal Date', type: 'text', sortable: true, filterable: true },
  ];

  


     // Static Ship Options (reusing from ship-master component)
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

      // Static SRAR Equipment Data
   srar_equipment_data = [
     {
         "id": 3101,
         "ship_name": "INS Vikrant",
         "ship_code": "VIK001",
         "equipment_name": "RADAR SYSTEM",
         "equipment_code": "EQP-918273",
         "location_name": "Combat Information Centre",
         "location_code": "LOC-05-CIC",
         "equipment_details": {
             "id": 2890,
             "group": null,
             "manufacturer_name": "Bharat Electronics Ltd",
             "manufacturer_address": "Bengaluru, India",
             "supplier_name": "Mazagon Dock Shipbuilders",
             "supplier_address": "Dockyard Road, Mumbai",
             "active": 1,
             "code": "EQP-918273",
             "name": "RADAR SYSTEM",
             "image": null,
             "model": "RDR-X120",
             "obsolete": "",
             "authority": "",
             "generic_code": null,
             "ilms_equipment_code": null,
             "acquaint_issued": null,
             "maintop_number": null,
             "created_by": 1,
             "country": "India",
             "manufacturer": 12,
             "supplier": 22,
             "parent": null,
             "type": null
         },
         "active": 1,
         "nomenclature": "SURVEILLANCE RADAR",
         "oem_part_number": null,
         "no_of_fits": 2,
         "installation_date": "2021-07-15",
         "removal_date": null,
         "service_life": "15 years",
         "authority_of_removal": null,
         "authority_of_installation": "Naval Dockyard",
         "is_srar_equipment": true,
         "removal_remarks": null,
         "included_in_dl": false,
         "created_by": 1,
         "ship": 1,
         "equipment": 2890,
         "location": 5,
         "supplier": null,
         "parent_equipment": null,
         "child_equipment": null,
         "department": "Operations"
     },
     {
         "id": 3102,
         "ship_name": "INS Kolkata",
         "ship_code": "KOL001",
         "equipment_name": "ENGINE CONTROL UNIT",
         "equipment_code": "EQP-826451",
         "location_name": "Engine Room",
         "location_code": "LOC-12-ENGINE-ROOM",
         "equipment_details": {
             "id": 2891,
             "group": null,
             "manufacturer_name": "Kirloskar Electric Co",
             "manufacturer_address": "Hubballi, India",
             "supplier_name": "Cochin Shipyard Ltd",
             "supplier_address": "Kochi, India",
             "active": 1,
             "code": "EQP-826451",
             "name": "ENGINE CONTROL UNIT",
             "image": null,
             "model": "ECU-M900",
             "obsolete": "",
             "authority": "",
             "generic_code": null,
             "ilms_equipment_code": null,
             "acquaint_issued": null,
             "maintop_number": null,
             "created_by": 1,
             "country": "India",
             "manufacturer": 18,
             "supplier": 33,
             "parent": null,
             "type": null
         },
         "active": 1,
         "nomenclature": "ENGINE ECU",
         "oem_part_number": null,
         "no_of_fits": 4,
         "installation_date": "2020-11-20",
         "removal_date": null,
         "service_life": "12 years",
         "authority_of_removal": null,
         "authority_of_installation": "Cochin Shipyard",
         "is_srar_equipment": true,
         "removal_remarks": null,
         "included_in_dl": false,
         "created_by": 1,
         "ship": 2,
         "equipment": 2891,
         "location": 12,
         "supplier": null,
         "parent_equipment": null,
         "child_equipment": null,
         "department": "Engineering"
     },
     {
         "id": 3103,
         "ship_name": "INS Udaygiri",
         "ship_code": "NLG001",
         "equipment_name": "COMMUNICATION SYSTEM",
         "equipment_code": "EQP-445672",
         "location_name": "Bridge",
         "location_code": "LOC-01-BRIDGE",
         "equipment_details": {
             "id": 2892,
             "group": null,
             "manufacturer_name": "Hindustan Aeronautics Ltd",
             "manufacturer_address": "Bangalore, India",
             "supplier_name": "Garden Reach Shipbuilders",
             "supplier_address": "Kolkata, India",
             "active": 1,
             "code": "EQP-445672",
             "name": "COMMUNICATION SYSTEM",
             "image": null,
             "model": "COMSAT-500",
             "obsolete": "",
             "authority": "",
             "generic_code": null,
             "ilms_equipment_code": null,
             "acquaint_issued": null,
             "maintop_number": null,
             "created_by": 1,
             "country": "India",
             "manufacturer": 25,
             "supplier": 41,
             "parent": null,
             "type": null
         },
         "active": 1,
         "nomenclature": "SATCOM",
         "oem_part_number": null,
         "no_of_fits": 3,
         "installation_date": "2022-02-10",
         "removal_date": null,
         "service_life": "10 years",
         "authority_of_removal": null,
         "authority_of_installation": "Naval Communications",
         "is_srar_equipment": true,
         "removal_remarks": null,
         "included_in_dl": false,
         "created_by": 1,
         "ship": 3,
         "equipment": 2892,
         "location": 1,
         "supplier": null,
         "parent_equipment": null,
         "child_equipment": null,
         "department": "Communications"
     },
     {
         "id": 3104,
         "ship_name": "INS Kora",
         "ship_code": "KOR001",
         "equipment_name": "NAVIGATION SYSTEM",
         "equipment_code": "EQP-334455",
         "location_name": "Navigation Bridge",
         "location_code": "LOC-02-NAV",
         "equipment_details": {
             "id": 2893,
             "group": null,
             "manufacturer_name": "Larsen & Toubro",
             "manufacturer_address": "Mumbai, India",
             "supplier_name": "Garden Reach Shipbuilders",
             "supplier_address": "Kolkata, India",
             "active": 1,
             "code": "EQP-334455",
             "name": "NAVIGATION SYSTEM",
             "image": null,
             "model": "NAV-2000",
             "obsolete": "",
             "authority": "",
             "generic_code": null,
             "ilms_equipment_code": null,
             "acquaint_issued": null,
             "maintop_number": null,
             "created_by": 1,
             "country": "India",
             "manufacturer": 30,
             "supplier": 41,
             "parent": null,
             "type": null
         },
         "active": 1,
         "nomenclature": "GPS NAVIGATOR",
         "oem_part_number": null,
         "no_of_fits": 1,
         "installation_date": "2019-05-12",
         "removal_date": null,
         "service_life": "8 years",
         "authority_of_removal": null,
         "authority_of_installation": "Naval Dockyard Visakhapatnam",
         "is_srar_equipment": true,
         "removal_remarks": null,
         "included_in_dl": false,
         "created_by": 1,
         "ship": 4,
         "equipment": 2893,
         "location": 2,
         "supplier": null,
         "parent_equipment": null,
         "child_equipment": null,
         "department": "Navigation"
     },
     {
         "id": 3105,
         "ship_name": "INS Sindhughosh",
         "ship_code": "KILO01",
         "equipment_name": "SONAR SYSTEM",
         "equipment_code": "EQP-778899",
         "location_name": "Sonar Room",
         "location_code": "LOC-08-SONAR",
         "equipment_details": {
             "id": 2894,
             "group": null,
             "manufacturer_name": "Bharat Electronics Ltd",
             "manufacturer_address": "Pune, India",
             "supplier_name": "NSRY Kochi",
             "supplier_address": "Kochi, India",
             "active": 1,
             "code": "EQP-778899",
             "name": "SONAR SYSTEM",
             "image": null,
             "model": "SONAR-5000",
             "obsolete": "",
             "authority": "",
             "generic_code": null,
             "ilms_equipment_code": null,
             "acquaint_issued": null,
             "maintop_number": null,
             "created_by": 1,
             "country": "India",
             "manufacturer": 12,
             "supplier": 50,
             "parent": null,
             "type": null
         },
         "active": 1,
         "nomenclature": "ACTIVE SONAR",
         "oem_part_number": null,
         "no_of_fits": 2,
         "installation_date": "2018-09-20",
         "removal_date": null,
         "service_life": "12 years",
         "authority_of_removal": null,
         "authority_of_installation": "NSRY Kochi",
         "is_srar_equipment": true,
         "removal_remarks": null,
         "included_in_dl": false,
         "created_by": 1,
         "ship": 5,
         "equipment": 2894,
         "location": 8,
         "supplier": null,
         "parent_equipment": null,
         "child_equipment": null,
         "department": "Anti-Submarine Warfare"
     },
     {
         "id": 3106,
         "ship_name": "INS Jalashwa",
         "ship_code": "JAL001",
         "equipment_name": "HELICOPTER HANDLING SYSTEM",
         "equipment_code": "EQP-112233",
         "location_name": "Flight Deck",
         "location_code": "LOC-15-FLIGHT",
         "equipment_details": {
             "id": 2895,
             "group": null,
             "manufacturer_name": "Hindustan Aeronautics Ltd",
             "manufacturer_address": "Bangalore, India",
             "supplier_name": "Cochin Shipyard Ltd",
             "supplier_address": "Kochi, India",
             "active": 1,
             "code": "EQP-112233",
             "name": "HELICOPTER HANDLING SYSTEM",
             "image": null,
             "model": "HEL-HS300",
             "obsolete": "",
             "authority": "",
             "generic_code": null,
             "ilms_equipment_code": null,
             "acquaint_issued": null,
             "maintop_number": null,
             "created_by": 1,
             "country": "India",
             "manufacturer": 25,
             "supplier": 33,
             "parent": null,
             "type": null
         },
         "active": 1,
         "nomenclature": "HELIPAD EQUIPMENT",
         "oem_part_number": null,
         "no_of_fits": 1,
         "installation_date": "2020-03-15",
         "removal_date": null,
         "service_life": "15 years",
         "authority_of_removal": null,
         "authority_of_installation": "Cochin Shipyard",
         "is_srar_equipment": true,
         "removal_remarks": null,
         "included_in_dl": false,
         "created_by": 1,
         "ship": 6,
         "equipment": 2895,
         "location": 15,
         "supplier": null,
         "parent_equipment": null,
         "child_equipment": null,
         "department": "Aviation"
     },
     {
         "id": 3107,
         "ship_name": "INS Deepak",
         "ship_code": "DEE001",
         "equipment_name": "FUEL TRANSFER SYSTEM",
         "equipment_code": "EQP-556677",
         "location_name": "Fuel Station",
         "location_code": "LOC-20-FUEL",
         "equipment_details": {
             "id": 2896,
             "group": null,
             "manufacturer_name": "Bharat Heavy Electricals Ltd",
             "manufacturer_address": "Bhopal, India",
             "supplier_name": "Mazagon Dock Ltd",
             "supplier_address": "Mumbai, India",
             "active": 1,
             "code": "EQP-556677",
             "name": "FUEL TRANSFER SYSTEM",
             "image": null,
             "model": "FTS-1000",
             "obsolete": "",
             "authority": "",
             "generic_code": null,
             "ilms_equipment_code": null,
             "acquaint_issued": null,
             "maintop_number": null,
             "created_by": 1,
             "country": "India",
             "manufacturer": 35,
             "supplier": 22,
             "parent": null,
             "type": null
         },
         "active": 1,
         "nomenclature": "FUEL PUMP SYSTEM",
         "oem_part_number": null,
         "no_of_fits": 3,
         "installation_date": "2019-11-08",
         "removal_date": null,
         "service_life": "10 years",
         "authority_of_removal": null,
         "authority_of_installation": "Mazagon Dock",
         "is_srar_equipment": true,
         "removal_remarks": null,
         "included_in_dl": false,
         "created_by": 1,
         "ship": 7,
         "equipment": 2896,
         "location": 20,
         "supplier": null,
         "parent_equipment": null,
         "child_equipment": null,
         "department": "Logistics"
     },
     {
         "id": 3108,
         "ship_name": "INS Sandhayak",
         "ship_code": "SAN001",
         "equipment_name": "HYDROGRAPHIC SURVEY SYSTEM",
         "equipment_code": "EQP-889900",
         "location_name": "Survey Room",
         "location_code": "LOC-25-SURVEY",
         "equipment_details": {
             "id": 2897,
             "group": null,
             "manufacturer_name": "National Institute of Oceanography",
             "manufacturer_address": "Goa, India",
             "supplier_name": "Garden Reach Shipbuilders",
             "supplier_address": "Kolkata, India",
             "active": 1,
             "code": "EQP-889900",
             "name": "HYDROGRAPHIC SURVEY SYSTEM",
             "image": null,
             "model": "HSS-2000",
             "obsolete": "",
             "authority": "",
             "generic_code": null,
             "ilms_equipment_code": null,
             "acquaint_issued": null,
             "maintop_number": null,
             "created_by": 1,
             "country": "India",
             "manufacturer": 40,
             "supplier": 41,
             "parent": null,
             "type": null
         },
         "active": 1,
         "nomenclature": "SURVEY EQUIPMENT",
         "oem_part_number": null,
         "no_of_fits": 1,
         "installation_date": "2021-01-20",
         "removal_date": null,
         "service_life": "12 years",
         "authority_of_removal": null,
         "authority_of_installation": "Garden Reach Shipbuilders",
         "is_srar_equipment": true,
         "removal_remarks": null,
         "included_in_dl": false,
         "created_by": 1,
         "ship": 8,
         "equipment": 2897,
         "location": 25,
         "supplier": null,
         "parent_equipment": null,
         "child_equipment": null,
         "department": "Hydrography"
     },
     {
         "id": 3109,
         "ship_name": "INS Saksham",
         "ship_code": "SAK001",
         "equipment_name": "DAMAGE CONTROL SYSTEM",
         "equipment_code": "EQP-223344",
         "location_name": "Damage Control Centre",
         "location_code": "LOC-30-DC",
         "equipment_details": {
             "id": 2898,
             "group": null,
             "manufacturer_name": "Bharat Electronics Ltd",
             "manufacturer_address": "Hyderabad, India",
             "supplier_name": "NSRY Kochi",
             "supplier_address": "Kochi, India",
             "active": 1,
             "code": "EQP-223344",
             "name": "DAMAGE CONTROL SYSTEM",
             "image": null,
             "model": "DCS-1500",
             "obsolete": "",
             "authority": "",
             "generic_code": null,
             "ilms_equipment_code": null,
             "acquaint_issued": null,
             "maintop_number": null,
             "created_by": 1,
             "country": "India",
             "manufacturer": 12,
             "supplier": 50,
             "parent": null,
             "type": null
         },
         "active": 1,
         "nomenclature": "FIRE FIGHTING SYSTEM",
         "oem_part_number": null,
         "no_of_fits": 2,
         "installation_date": "2020-08-14",
         "removal_date": null,
         "service_life": "10 years",
         "authority_of_removal": null,
         "authority_of_installation": "NSRY Kochi",
         "is_srar_equipment": true,
         "removal_remarks": null,
         "included_in_dl": false,
         "created_by": 1,
         "ship": 9,
         "equipment": 2898,
         "location": 30,
         "supplier": null,
         "parent_equipment": null,
         "child_equipment": null,
         "department": "Damage Control"
     },
     {
         "id": 3110,
         "ship_name": "INS Karwar",
         "ship_code": "KAR001",
         "equipment_name": "ELECTRONIC WARFARE SYSTEM",
         "equipment_code": "EQP-667788",
         "location_name": "EW Operations Room",
         "location_code": "LOC-35-EW",
         "equipment_details": {
             "id": 2899,
             "group": null,
             "manufacturer_name": "Defence Research & Development Organisation",
             "manufacturer_address": "Delhi, India",
             "supplier_name": "Mazagon Dock Ltd",
             "supplier_address": "Mumbai, India",
             "active": 1,
             "code": "EQP-667788",
             "name": "ELECTRONIC WARFARE SYSTEM",
             "image": null,
             "model": "EWS-3000",
             "obsolete": "",
             "authority": "",
             "generic_code": null,
             "ilms_equipment_code": null,
             "acquaint_issued": null,
             "maintop_number": null,
             "created_by": 1,
             "country": "India",
             "manufacturer": 45,
             "supplier": 22,
             "parent": null,
             "type": null
         },
         "active": 1,
         "nomenclature": "EW SUITE",
         "oem_part_number": null,
         "no_of_fits": 1,
         "installation_date": "2022-06-30",
         "removal_date": null,
         "service_life": "15 years",
         "authority_of_removal": null,
         "authority_of_installation": "Mazagon Dock",
         "is_srar_equipment": true,
         "removal_remarks": null,
         "included_in_dl": false,
         "created_by": 1,
         "ship": 10,
         "equipment": 2899,
         "location": 35,
         "supplier": null,
         "parent_equipment": null,
         "child_equipment": null,
         "department": "Electronic Warfare"
     }
   ];

     // Table Data
   tableData: any[] = [];
  constructor(private apiService: ApiService, private toast: MessageService) {}
  ngOnInit(): void {
    // Don't load data initially - wait for ship selection
    console.log('SRAR Equipment Component initialized - waiting for ship selection');
    // Ship options are now static data, no need for API call
  }
  
  currentPageApi(page: number, pageSize: number, shipId?: number){
    if (!shipId) {
      // If no ship is selected, clear the table
      this.tableData = [];
      return;
    }
    
    // Use static data instead of API call
    this.tableData = this.srar_equipment_data.filter(equipment => equipment.ship === shipId);
    console.log('SRAR Equipment Data loaded from static data for ship:', shipId, 'with', this.tableData.length, 'records');
  }
  
 // apiCall method removed - ship options are now static data

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
      // Initially disable auto-fill fields
      this.sararMasterForm.get('equipment_code')?.disable();
      this.sararMasterForm.get('nomenclature')?.disable();
      this.sararMasterForm.get('oem_part_number')?.disable();
      this.sararMasterForm.get('location_name')?.disable();
      this.sararMasterForm.get('equipment_type')?.disable();
    }
  }

  closeDialog(): void {
    this.displayDialog = false;
    // Only reset form if not in view mode
    if (this.crudName !== 'View') {
      this.sararMasterForm.reset();
      this.sararMasterForm.enable();
    }
    // Reset equipment options when closing
    this.equipmentOptions = [];
    this.crudName='Add'
  }


  // Event Handlers
  onView(data: any): void {
    this.crudName='View'
    
    // Use static data for equipment options
    if (data.ship) {
      const equipmentData = this.srar_equipment_data.filter(equipment => equipment.ship === data.ship);
        // Format equipment options to show "Equipment Code - Equipment Name" in dropdown
        this.equipmentOptions = equipmentData.map((equipment: any) => ({
          ...equipment,
          displayName: `${equipment.equipment_code} - ${equipment.equipment_name}`
        }));
        
        // Now set the form values after equipment options are loaded
        this.setViewFormData(data);
    } else {
      // If no ship data, set form directly
      this.setViewFormData(data);
    }
  }

  private setViewFormData(data: any): void {
    // Map API data to form fields
    const formData = {
      id: data.id,
      ship: data.ship,
      ship_name: data.ship_name,
      ship_id: data.ship,
      equipment_code: data.equipment_code,
      equipment_name: data.equipment_name,
      equipment_id: data.equipment,
      nomenclature: data.nomenclature,
      oem_part_number: data.oem_part_number,
      no_of_fits: data.no_of_fits,
      location_name: data.location_name,
      location_id: data.location,
      equipment_type: data.type || '',
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
    
    // Use static data for equipment options
    if (data.ship) {
      const equipmentData = this.srar_equipment_data.filter(equipment => equipment.ship === data.ship);
        // Format equipment options to show "Equipment Code - Equipment Name" in dropdown
        this.equipmentOptions = equipmentData.map((equipment: any) => ({
          ...equipment,
          displayName: `${equipment.equipment_code} - ${equipment.equipment_name}`
        }));
        
        // Now set the form values after equipment options are loaded
        this.setEditFormData(data);
    } else {
      // If no ship data, set form directly
      this.setEditFormData(data);
    }
  }

  private setEditFormData(data: any): void {
    // Map API data to form fields
    const formData = {
      id: data.id,
      ship: data.ship,
      ship_name: data.ship_name,
      ship_id: data.ship,
      equipment_code: data.equipment_code,
      equipment_name: data.equipment_name,
      equipment_id: data.equipment,
      nomenclature: data.nomenclature,
      oem_part_number: data.oem_part_number,
      no_of_fits: data.no_of_fits,
      location_name: data.location_name,
      location_id: data.location,
      equipment_type: data.type || '',
      active: data.active
    };
    this.sararMasterForm.patchValue(formData);
    this.sararMasterForm.get('active')?.setValue(data.active === 1 ? true : false);
    // Enable form for edit mode
    this.sararMasterForm.enable();
    // Keep auto-fill fields disabled even in edit mode
    this.sararMasterForm.get('equipment_code')?.disable();
    this.sararMasterForm.get('nomenclature')?.disable();
    this.sararMasterForm.get('oem_part_number')?.disable();
    this.sararMasterForm.get('location_name')?.disable();
    this.sararMasterForm.get('equipment_type')?.disable();
    this.openDialog();
  }

  // Delete confirmation modal properties
  showDeleteModal: boolean = false;
  itemToDelete: any = null;

  onDelete(data: any): void {
    console.log('Delete Equipment:', data);
    this.itemToDelete = data;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.itemToDelete) {
      // Remove item from static data
      const index = this.srar_equipment_data.findIndex(item => item.id === this.itemToDelete.id);
      if (index > -1) {
        this.srar_equipment_data.splice(index, 1);
        this.toast.add({severity:'success', summary: 'Success', detail: 'Equipment Deleted Successfully'});
        console.log('Equipment deleted from static data');
        // Refresh data for the currently selected ship
        this.currentPageApi(0, 0, this.selectedShip?.id);
        this.showDeleteModal = false;
        this.itemToDelete = null;
      } else {
        this.toast.add({severity:'error', summary: 'Error', detail: 'Equipment not found'});
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
          // Update existing equipment in static data
          const index = this.srar_equipment_data.findIndex(item => item.id === this.sararMasterForm.value.id);
          if (index > -1) {
            this.srar_equipment_data[index] = {
              ...this.srar_equipment_data[index],
              ship_name: formData.ship_name,
              equipment_code: formData.equipment_code,
              equipment_name: formData.equipment_name,
              nomenclature: formData.nomenclature,
              oem_part_number: formData.oem_part_number,
              no_of_fits: formData.no_of_fits,
              location_name: formData.location_name,
              active: formData.active ? 1 : 0
            };
            
        this.toast.add({severity:'success', summary: 'Success', detail: 'Equipment Updated Successfully'});
            this.closeDialog();
        // Refresh data for the currently selected ship
        this.currentPageApi(0, 0, this.selectedShip?.id);
          } else {
            this.toast.add({severity:'error', summary: 'Error', detail: 'Equipment not found for update'});
          }
    } else {
           // Create new equipment in static data
           const newId = Math.max(...this.srar_equipment_data.map(item => item.id || 0)) + 1;
           
           const newEquipment = {
             id: newId,
             ship_name: formData.ship_name,
             ship_code: this.shipOptions.find(ship => ship.id === formData.ship)?.code || '',
             equipment_name: formData.equipment_name,
             equipment_code: formData.equipment_code,
             location_name: formData.location_name,
             location_code: `LOC-${formData.location_id || 'NEW'}`,
             equipment_details: {
               id: formData.equipment_id || newId,
               group: null,
               manufacturer_name: "Default Manufacturer",
               manufacturer_address: "Default Address",
               supplier_name: "Default Supplier",
               supplier_address: "Default Address",
               active: 1,
               code: formData.equipment_code,
               name: formData.equipment_name,
               image: null,
               model: "Default Model",
               obsolete: "",
               authority: "",
               generic_code: null,
               ilms_equipment_code: null,
               acquaint_issued: null,
               maintop_number: null,
               created_by: 1,
               country: "India",
               manufacturer: 1,
               supplier: 1,
               parent: null,
               type: null
             },
             active: formData.active ? 1 : 0,
             nomenclature: formData.nomenclature,
             oem_part_number: formData.oem_part_number,
             no_of_fits: formData.no_of_fits,
             installation_date: new Date().toISOString().split('T')[0],
             removal_date: null,
             service_life: "10 years",
             authority_of_removal: null,
             authority_of_installation: "Default Authority",
             is_srar_equipment: true,
             removal_remarks: null,
             included_in_dl: false,
             created_by: 1,
             ship: formData.ship,
             equipment: formData.equipment_id || newId,
             location: formData.location_id || 1,
             supplier: null,
             parent_equipment: null,
             child_equipment: null,
             department: "Default Department"
           };
           
           this.srar_equipment_data.push(newEquipment);
          
        this.toast.add({severity:'success', summary: 'Success', detail: 'Equipment Added Successfully'});
          this.closeDialog();
        // Refresh data for the currently selected ship
        this.currentPageApi(0, 0, this.selectedShip?.id);
        }
      } else {
        this.toast.add({severity:'warn', summary: 'Warning', detail: 'Please fill all required fields'});
      }
  }
  
   equipmentOptions: any[] = [];
   selectedShip: any;
onShipChange(): void {
  // Get ship ID from either the filter dropdown or the form
  const shipId = this.selectedShip?.id || this.sararMasterForm.value.ship;
  
  if (shipId) {
    // Use static data for equipment options
    const equipmentData = this.srar_equipment_data.filter(equipment => equipment.ship === shipId);
      // Format equipment options to show "Equipment Code - Equipment Name" in dropdown
      this.equipmentOptions = equipmentData.map((equipment: any) => ({
        ...equipment,
        displayName: `${equipment.equipment_code} - ${equipment.equipment_name}`
      }));
    console.log('Equipment options loaded from static data:', this.equipmentOptions);
    
    console.log('Selected Ship:', shipId);
    
    // Find the selected ship object from the options array
    const selectedShip = this.shipOptions.find(ship => ship.id === shipId);
    if (selectedShip) {
      // Update form with ship details
      this.sararMasterForm.patchValue({
        ship: shipId,
        ship_name: selectedShip.name,
        ship_id: selectedShip.id
      });
      console.log('Updated ship_name to:', selectedShip.name);
      console.log('Updated ship_id to:', selectedShip.id);
    }
    
    // Load equipment data for the selected ship
    this.currentPageApi(0, 0, shipId);
  } else {
    // If no ship is selected, clear the table and equipment options
    this.tableData = [];
    this.equipmentOptions = [];
    console.log('No ship selected - clearing table data');
    
    // Clear the form when no ship is selected
    this.clearForm();
  }
}

// Method to clear the form when ship selection changes
private clearForm(): void {
  this.sararMasterForm.patchValue({
    ship: '',
    ship_name: '',
    ship_id: '',
    equipment_code: '',
    equipment_name: '',
    equipment_id: '',
    nomenclature: '',
    oem_part_number: '',
    no_of_fits: '',
    location_name: '',
    location_id: '',
    equipment_type: '',
    active: true
  });
  
  // Re-enable all fields when clearing
  this.sararMasterForm.get('equipment_code')?.enable();
  this.sararMasterForm.get('nomenclature')?.enable();
  this.sararMasterForm.get('oem_part_number')?.enable();
  this.sararMasterForm.get('location_name')?.enable();
  this.sararMasterForm.get('equipment_type')?.enable();
}

// Method to clear ship selection (can be called from template if needed)
clearShipSelection(): void {
  this.selectedShip = null;
  this.tableData = [];
  this.equipmentOptions = [];
  this.clearForm();
  console.log('Ship selection cleared');
}

  onEquipmentChange(event: any): void {
  console.log('Equipment changed to:', event);
  if (event) {
    // Find the selected equipment object from the options array by equipment_name
    const selectedEquipment = this.equipmentOptions.find(equipment => equipment.equipment_name === event);
    if (selectedEquipment) {
             // Auto-fill all the required fields
       this.sararMasterForm.patchValue({
         equipment_name: selectedEquipment.equipment_name,
         equipment_code: selectedEquipment.equipment_code,
         equipment_id: selectedEquipment.equipment,
         nomenclature: selectedEquipment.nomenclature,
         oem_part_number: selectedEquipment.oem_part_number,
         location_name: selectedEquipment.location_name,
         location_id: selectedEquipment.location,
         equipment_type: selectedEquipment.type || ''
       });
      
             console.log('Auto-filled equipment details:', {
         equipment_name: selectedEquipment.equipment_name,
         equipment_code: selectedEquipment.equipment_code,
         nomenclature: selectedEquipment.nomenclature,
         oem_part_number: selectedEquipment.oem_part_number,
         location_name: selectedEquipment.location_name,
         equipment_type: selectedEquipment.type
       });
      
      // Disable the auto-filled fields to make them read-only
      this.sararMasterForm.get('equipment_code')?.disable();
      this.sararMasterForm.get('nomenclature')?.disable();
      this.sararMasterForm.get('oem_part_number')?.disable();
      this.sararMasterForm.get('location_name')?.disable();
      this.sararMasterForm.get('equipment_type')?.disable();
    }
  } else {
    // Clear the fields if no equipment is selected
    this.sararMasterForm.patchValue({
      equipment_name: '',
      equipment_code: '',
      equipment_id: '',
      nomenclature: '',
      oem_part_number: '',
      location_name: '',
      location_id: '',
      equipment_type: ''
    });
    
    // Re-enable the fields when clearing
    this.sararMasterForm.get('equipment_code')?.enable();
    this.sararMasterForm.get('nomenclature')?.enable();
    this.sararMasterForm.get('oem_part_number')?.enable();
    this.sararMasterForm.get('location_name')?.enable();
    this.sararMasterForm.get('equipment_type')?.enable();
  }
}



 
}

