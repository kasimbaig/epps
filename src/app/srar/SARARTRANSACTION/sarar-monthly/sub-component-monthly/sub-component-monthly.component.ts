import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-sub-component-monthly',
 standalone:false,
  templateUrl: './sub-component-monthly.component.html',
  styleUrl: './sub-component-monthly.component.css'
})
export class SubComponentMonthlyComponent implements OnInit {
  Operation = [
    { id: 1,name: 'Ship Running Detail', icon: 'fa-ship', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 2,name: 'Boiler Steaming Detail', icon: 'fa-fire', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 3,name: 'Ship Activity', icon: 'fa-anchor', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 4,name: 'Fuel/AVCAT/Torsionmeter', icon: 'fa-gas-pump', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 5,name: 'ICCP/H2S Sensor/MFFS', icon: 'fa-shield-alt', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 6,name: 'Test Kits/Centrifuge', icon: 'fa-flask', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 7,name: 'Diesel Engine & SDC', icon: 'fa-bolt', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 8,name: 'DGUF', icon: 'fa-bolt', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 9,name: 'Full Power Trials', icon: 'fa-bolt', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 10,name: 'G T Parameter', icon: 'fa-bolt', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 11,name: 'GT/RG Exploitation', icon: 'fa-oil-can', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 12,name: 'GTG Exploitation', icon: 'fa-wrench', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 13,name: 'GTG Parameter', icon: 'fa-comment-alt', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 14,name: 'Lubricant Consumption', icon: 'fa-calendar-check', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 15,name: 'R/H Extension', icon: 'fa-expand-arrows-alt', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 16,name: 'EO Remark', icon: 'fa-comment-dots', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 17,name: 'Equipment Next Roution Due', icon: 'fa-calendar-alt', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'},
    { id: 18,name: 'Final Page', icon: 'fa-file-alt', colorClass: 'text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-teal-600 shadow-md'}
  ]
  activeOperation=this.Operation[0];
  srarEquipmentData: any[] = [];
  srarLocationsData: any[] = [];
  isLoading: boolean = false;
  loadingError: string = '';
  
  headerData:any;
  scrollOffset: number = 0;
  scrollStep: number = 400; // Amount to scroll per click - doubled for better visibility
  
  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.isLoading = true;
    this.loadingError = '';
    
    // Load equipment data with error handling
    const data=this.apiService.getData();
    this.headerData=data;
    console.log(this.headerData);
    this.apiService.get('/sfd/sfd-details/?is_srar_equipment=True&ship='+this.headerData.ship_name?.id)
      .subscribe({
        next: (data) => {
          this.srarEquipmentData = data.results || [];
          console.log('SRAR Equipment Data loaded:', this.srarEquipmentData.length, 'items');
          this.checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error loading SRAR equipment data:', error);
          this.loadingError = 'Failed to load equipment data';
          this.isLoading = false;
        }
      });
    
    // Load locations data with error handling
    this.apiService.get('/master/locations/')
      .subscribe({
        next: (data) => {
          this.srarLocationsData = data.results || data || [];
          console.log('SRAR Locations Data loaded:', this.srarLocationsData.length, 'items');
          this.checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error loading locations data:', error);
          this.loadingError = 'Failed to load locations data';
          this.isLoading = false;
        }
      });
  }

  private checkLoadingComplete(): void {
    // Both arrays loaded, stop loading
    if (this.srarEquipmentData.length >= 0 && this.srarLocationsData.length >= 0) {
      this.isLoading = false;
      console.log('All initial data loaded successfully');
    }
  }


  

  openOperation(operation: any) {
    console.log(operation);
    this.activeOperation = operation;
  }

  scrollLeft() {
    this.scrollOffset += this.scrollStep;
    // Prevent scrolling too far left
    if (this.scrollOffset > 0) {
      this.scrollOffset = 0;
    }
  }

  scrollRight() {
    this.scrollOffset -= this.scrollStep;
    // Increased max scroll to allow reaching the last tabs
    const maxScroll = -2860; // Doubled to allow reaching tab 12 and beyond
    if (this.scrollOffset < maxScroll) {
      this.scrollOffset = maxScroll;
    }
  }
}