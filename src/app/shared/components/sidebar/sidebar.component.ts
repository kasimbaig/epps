import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
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
export class SidebarComponent implements OnChanges {
  @Input() isCollapsed: boolean = false;
  @Output() collapseSidebar = new EventEmitter<void>();

  public expanded: boolean = true;

  // Watch for changes to isCollapsed input
  ngOnChanges() {
    if (this.isCollapsed !== undefined) {
      this.expanded = !this.isCollapsed;
    }
  }
  
  activeItem: string = '/dashboard';
  openSubMenus: { [key: string]: boolean } = {};

  themeMode: 'light' | 'dark' = 'light';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeItem = event.urlAfterRedirects;
        // Auto-collapse sidebar on navigation
        console.log('NavigationEnd detected, collapsing sidebar');
        this.expanded = false;
        this.collapseSidebar.emit();
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
  
  toggleSidebar() {
    this.expanded = !this.expanded;
    if (!this.expanded) {
      this.openSubMenus = {};
    }
    console.log('toggleSidebar called, expanded:', this.expanded);
    // Emit to parent to sync the state
    this.collapseSidebar.emit();
  }

  navigateTo(path: string) {
    this.activeItem = path;
    console.log('navigateTo called with path:', path);
    
    // Auto-collapse sidebar when navigating
    this.expanded = false;
    this.openSubMenus = {};
    
    this.router.navigate([path]);
    
    // Emit to parent to sync the state
    console.log('Emitting collapseSidebar from navigateTo');
    this.collapseSidebar.emit();
  }

  logOut() {
    localStorage.clear();
    // window.location.href = '/login';
    this.router.navigate(['/home']);
  }
}