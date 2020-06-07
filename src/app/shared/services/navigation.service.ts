import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}

export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    defaultMenu: IMenuItem[] = [
        {
            name: 'عرض الكل',
            description: '',
            type: 'link',
            icon: 'i-Receipt-4',
            state: '/permissions'
        },
        {
            name: 'اضافة نظام',
            description: '',
            type: 'link',
            icon: 'i-Add',
            state: '/permissions/add-module',
        },
        {
            name: 'اضافة صلاحيات',
            description: 'اضافة صورة إن وجدت',
            type: 'link',
            icon: 'i-Add-User',
            state: '/permissions/add-permission',
        },
        // {
        //     name: 'تقارير',
        //     description: 'خدمة التقارير',
        //     type: 'dropDown',
        //     icon: 'i-Newspaper',
        //      sub: [
        //         {icon: 'i-Add-File', name: 'تقرير ١', state: '/invoice', type: 'link'},
        //          {icon: 'i-Plane-2', name: 'تقرير ٢', state: '/inbox', type: 'link'},
        //          {icon: 'i-Speach-Bubble-3', name: 'تقرير ٣', state: '/chat', type: 'link'},
        //      ]
        // },
    ];
    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();

    constructor() {
    }

    // You can customize this method to supply different menu for
    // different user type.
    // publishNavigationChange(menuType: string) {
    //   switch (userType) {
    //     case 'admin':
    //       this.menuItems.next(this.adminMenu);
    //       break;
    //     case 'user':
    //       this.menuItems.next(this.userMenu);
    //       break;
    //     default:
    //       this.menuItems.next(this.defaultMenu);
    //   }
    // }
}
