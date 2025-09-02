import { Component, ElementRef, HostListener, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { RoleService } from '../../services/role-service/role.service';
import { Router } from '@angular/router';
import { CommandService } from '../../masters/ship-master/ship-services/command.service';
import { ShipService } from '../../masters/ship-master/ship.service'; // Import ShipService
import { DepartmentService } from '../../masters/ship-master/ship-services/department.service'; // Import DepartmentService

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit, OnDestroy {
    isChatbotOpen: boolean = false;

  // Sidebar collapse properties removed - fixed navigation
  isUserMenuOpen: boolean = false;
  isMastersDropdownOpen: boolean = false;
  title = 'Dashboard';

  role = '';

  @ViewChild('mastersDropdown') mastersDropdown!: ElementRef;

  switchRole(role: string) {
    this.roleService.setRole(role);
  }

  constructor(
    private eRef: ElementRef,
    private roleService: RoleService,
    private router: Router,
    private commandService: CommandService,
    private shipService: ShipService, // Inject ShipService
    private departmentService: DepartmentService // Inject DepartmentService
  ) {}

  ngOnInit(): void {
    this.commandService.loadAllCommandsData();
    this.shipService.loadAllShipsData(); // Load all ship data
    this.departmentService.loadAllDepartmentsData(); // Load all department data

    this.roleService.role$.subscribe((role: any) => {
      this.role = role;
    });
  }

  ngOnDestroy(): void {
    // Cleanup removed - no longer needed for fixed navigation
  }

  // Navigation methods
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMastersDropdownOpen = false;
  }

  isActiveRoute(route: string): boolean {
    const currentUrl = this.router.url;
    if (route === 'dashboard') {
      return currentUrl === '/dashboard' || currentUrl === '/';
    } else if (route === 'masters') {
      return currentUrl.startsWith('/masters');
    } else if (route === 'trans') {
      return currentUrl.startsWith('/trans');
    }
    return false;
  }

  toggleMastersDropdown(): void {
    this.isMastersDropdownOpen = !this.isMastersDropdownOpen;
  }

  logout() {
    // Clear local storage/session storage or tokens
    localStorage.clear(); // or sessionStorage.clear();

    // Navigate to login page
    this.router.navigate(['/login']);
  }

  // Sidebar collapse methods removed - fixed navigation

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    // Close user menu when clicking outside
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isUserMenuOpen = false;
    }

    // Close masters dropdown when clicking outside
    if (this.mastersDropdown && !this.mastersDropdown.nativeElement.contains(event.target)) {
      this.isMastersDropdownOpen = false;
    }

    // Close sidebar when clicking outside on mobile
    if (window.innerWidth <= 768) {
      const target = event.target as HTMLElement;
      const sidebarEl = document.querySelector('.sidebar');
      const toggleBtn = document.querySelector('.mobile-toggle');

      if (
        sidebarEl &&
        !sidebarEl.contains(target) &&
        toggleBtn &&
        !toggleBtn.contains(target)
      ) {

        document.body.style.overflow = 'auto';
      }
    }
  }
  
  openChatbot() {
    console.log("click");
    this.isChatbotOpen = true;
  }

  closeChatbot(): void {
    this.isChatbotOpen = false;
  }

  minimizeChatbot(): void {
    this.isChatbotOpen = false; // For this simple example, we can treat minimize the same as close
  }

}
