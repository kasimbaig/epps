import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

interface DropdownItem {
  label: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss'],
  standalone: false
})
export class MastersComponent implements OnInit, AfterViewInit {
  @ViewChild('tabsContainer', { static: false }) tabsContainer!: ElementRef;
  
  activeTab: string = '';
  expandedTabs: Set<string> = new Set();

  dropdownPosition: { top: string; left: string; width: string } | null = null;

 


  constructor(private router: Router, private activatedRoute: ActivatedRoute,private apiService:ApiService) {}
  ngAfterViewInit(): void {
    // no-op
  }

  ngOnInit() {
   
  }


  shipDropdownItems: DropdownItem[] = [
    { label: 'Ship Master', icon: '', path: '/masters/ship-group/ship-master' },
    { label: 'Ship Category', icon: '', path: '/masters/ship-group/ship-category' },
    { label: 'Departments', icon: '', path: '/masters/ship-group/departments' },
    { label: 'Section', icon: '', path: '/masters/ship-group/section' },
    { label: 'Group', icon: '', path: '/masters/ship-group/group' },
    { label: 'Class', icon: '', path: '/masters/ship-group/class' }
  ];
  equipmentDropdownItems: DropdownItem[] = [
    { label: 'Equipments', icon: '', path: '/masters/equipment-group/equipments' },
    { label: 'Equipment Specification', icon: '', path: '/masters/equipment-group/equipments-specification' },
    { label: 'Equipment Type', icon: '', path: '/masters/equipment-group/equipment-type' },
    { label: 'Equipment Diff', icon: '', path: '/masters/equipment-group/equipment-diff' },
    { label: 'Generic', icon: '', path: '/masters/equipment-group/generic' },
    { label: 'Supplier', icon: '', path: '/masters/equipment-group/supplier' }
  ];
  unitDropdownItems: DropdownItem[] = [
    { label: 'Commands', icon: '', path: '/masters/unit-group/commands' },
    { label: 'Units', icon: '', path: '/masters/unit-group/units' },
    { label: 'Ops Authority', icon: '', path: '/masters/unit-group/ops-authority' },
    // { label: 'Frequency Master', icon: 'fa-solid fa-clock', path: '/masters/unit-group/frequency' }
  ];

  showShipDropdownDropdown: boolean = false;
  showUnitDropdownDropdown: boolean = false;
  showEquipmentDropdownDropdown: boolean = false;
  activeSubPath: string = '';

  shipDropdown(){
    const willOpen = !this.showShipDropdownDropdown;
    this.showShipDropdownDropdown = willOpen;
    this.showUnitDropdownDropdown = false;
    this.showEquipmentDropdownDropdown = false;
    if (willOpen) {
      this.activeSubPath = 'ship-group';
    }
  }
  unitDropdown(){
    const willOpen = !this.showUnitDropdownDropdown;
    this.showShipDropdownDropdown = false;
    this.showUnitDropdownDropdown = willOpen;
    this.showEquipmentDropdownDropdown = false;
    if (willOpen) {
      this.activeSubPath = 'unit-group';
    }
  }
  equipmentDropdown(){
    const willOpen = !this.showEquipmentDropdownDropdown;
    this.showShipDropdownDropdown = false;
    this.showUnitDropdownDropdown = false;
    this.showEquipmentDropdownDropdown = willOpen;
    if (willOpen) {
      this.activeSubPath = 'equipment-group';
    }
  }


  navigateTo(subPath: string) {
    if (subPath === 'ship-group') {
      this.shipDropdown();
    } else if (subPath === 'equipment-group') {
      this.equipmentDropdown();
    }else if(subPath === 'unit-group'){
      this.unitDropdown();
    }
    else {
      this.showShipDropdownDropdown = false;
      this.showUnitDropdownDropdown = false;
      this.showEquipmentDropdownDropdown = false;
      this.activeSubPath = subPath;
     
      this.router.navigate([subPath], { relativeTo: this.activatedRoute });
    }
  }

  navigateToShipSubItem(subPath: string) {
    this.showShipDropdownDropdown = false;
    this.activeSubPath='ship-group';
    this.router.navigate([subPath],{ relativeTo: this.activatedRoute });
  }
  navigateToEquipmentSubItem(subPath: string) {
    this.showEquipmentDropdownDropdown = false;
    this.activeSubPath='equipment-group';
    this.router.navigate([subPath],{ relativeTo: this.activatedRoute });
  }
  navigateToUnitSubItem(subPath: string) {
    this.showUnitDropdownDropdown = false;
    this.activeSubPath='unit-group';
    this.router.navigate([subPath],{ relativeTo: this.activatedRoute });
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.masters-dropdown-container') && !target.closest('.transactions-dropdown-container')) {
      this.showShipDropdownDropdown = false;
      this.showUnitDropdownDropdown = false;
      this.showEquipmentDropdownDropdown = false;
    }
  }
} 