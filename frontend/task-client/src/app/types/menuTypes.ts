// menuTypes.ts

export interface MenuItem {
    name: string;
    iconSrc?: string;
    alt?: string;
    width?: number;
    height?: number;
    hasSubmenu?: boolean;
}
