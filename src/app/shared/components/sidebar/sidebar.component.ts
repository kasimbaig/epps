import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

interface MenuItem {
  label: string;
  path?: string;
  expanded?: boolean;
  children?: MenuItem[];
  icon?: string;
  hasChildren?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  // Input/Output properties removed - fixed navigation

  // expanded property removed - fixed navigation

  // ngOnChanges removed - no longer needed for fixed navigation
  
  activeItem: string = '/dashboard';
  // openSubMenus removed - no longer needed

  themeMode: 'light' | 'dark' = 'light';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeItem = event.urlAfterRedirects;
        console.log('NavigationEnd detected, updating active item:', this.activeItem);
      }
    });
  }

  menuItems: MenuItem[] = [
    {
      icon: 'fa-solid fa-home',
      label: 'Dashboard',
      path: '/dashboard',
      hasChildren: false,
    },
    {
      icon: 'fa-solid fa-database',
      label: 'Global Masters',
      path: '/masters/ship-group/ship-master',
      hasChildren: false,
    },
    {
      icon: 'fa-solid fa-anchor',
      label: 'SFD',
      path: '/sfd',
      hasChildren: false,
    },
    {
      icon: 'fa-solid fa-compass',
      label: 'SRAR',
      path: '/srar',
      hasChildren: false,
    },
    {
      icon: 'fa-solid fa-cog',
      label: 'Setup',
      path: '/setup',
      hasChildren: false,
    }
  ];

  ngOnInit() {
    console.log(this.getActiveRouteSegments());
  }

  getActiveRouteSegments(): string[] {
    const currentUrl = this.router.url;
    // Remove leading slash and split by slash
    const segments = currentUrl.replace(/^\//, '').split('/').filter(segment => segment.length > 0);
    console.log('Current URL segments:', segments);
    return segments;
  }

  isActive(path: string): boolean {
    const currentUrl = this.router.url;
    return currentUrl === path || currentUrl.startsWith(path + '/');
  }
  
  // toggleSidebar method removed - fixed navigation

  // toggleSubMenu method removed - no longer needed for simplified navigation

  navigateTo(path: string) {
    this.activeItem = path;
    console.log('navigateTo called with path:', path);
    this.router.navigate([path]);
  }

  logOut() {
    localStorage.clear();
    // window.location.href = '/login';
    this.router.navigate(['/home']);
  }
}