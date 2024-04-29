// Sidebar.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Sidebar.module.css';
import Image from 'next/image';
import BrandLogo from "@/app/components/common/BrandLogo/BrandLogo";
import { MenuItem } from '@/app/types/menuTypes';
import { useSidebar } from '@/app/contexts/SidebarContext';
import {logout} from "@/app/services/authService";

const menuItems: MenuItem[] = [

    { iconSrc: '/icons/dashboard.svg', name: 'Dashboard', alt: 'Dashboard Icon', width: 24, height: 24 },
    { iconSrc: '/icons/search.svg', name: 'Search', alt: 'Search Icon', width: 21, height: 21 },
    { iconSrc: '/icons/tasks.svg', name: 'Tasks', alt: 'TaskTypes Icon', width:24, height: 24, hasSubmenu: true},
    { iconSrc: '/icons/projects.svg', name: 'Projects', alt: 'Projects Icon', width: 26, height: 26 },
    { iconSrc: '/icons/calendar.svg', name: 'Calendar', alt: 'Calendar Icon', width: 24, height: 24 },
];


const userItem = {
    iconSrc: '/icons/user.svg',
    name: 'Account',
    alt: 'User Icon',
    width: 24,
    height: 24,
};

const settingsItem = {
    iconSrc: '/icons/gear.svg',
    name: 'Settings',
    alt: 'User Icon',
    width: 24,
    height: 24,
};

const logoutItem = {
    iconSrc: '/icons/logout.svg',
    name: 'Logout',
    alt: 'User Icon',
    width: 24,
    height: 24,
};

type SidebarProps = {
    onTasksButtonClick?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onTasksButtonClick }) => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const [showExtraItems, setShowExtraItems] = useState(false);
    const router = useRouter();

    const handleLogoutClick = () => {
        logout();
    };

    const handleAccountClick = () => {
        setShowExtraItems(!showExtraItems);
    };

    const renderMenuItem = (item: MenuItem, index: number) => {
        const commonClasses = `${styles.sidebarListItemName} ${isSidebarOpen ? styles.sidebarListItemToolNameOpen : styles.sidebarListItemNameClosed}`;
        const handleItemClick = (item: MenuItem) => {
            if (item.name === 'Tasks') {
                onTasksButtonClick?.();
            }
        };

        const listItemClass = item.name === 'Dashboard' ? `${styles.sidebarListItem} ${styles.dashboardItem}` : styles.sidebarListItem;

        return (
            <React.Fragment key={item.name}>
                <li className={listItemClass} onClick={() => handleItemClick(item)}>
                    <div className={styles.sidebarListItemContent}>
                        <div className={styles.sidebarListItemIconContainer}>
                            <Image
                                className={styles.sidebarListItemIcon}
                                priority
                                src={item.iconSrc || ''}
                                alt={item.alt || ''}
                                width={item.width || 24}
                                height={item.height || 24}
                            />
                        </div>
                        <span className={commonClasses}>{item.name}</span>
                    </div>
                    <span className={styles.sidebarListItemTooltip}>{item.name}</span>
                </li>
                {item.name === 'Dashboard' && <div className={styles.dashboardItemSeparator}></div>}
            </React.Fragment>
        );
    };


    return (
        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
            <div className={styles.sidebarHeader}>
                <BrandLogo className={`${isSidebarOpen ? styles.brandAndLogoOpen : styles.brandAndLogoClosed}`} height={47}
                           width={85}/>
                <i className={`${styles.sidebarHeaderButton} ${isSidebarOpen ? styles.sidebarHeaderButtonOpen : styles.sidebarHeaderButtonClosed}`}
                   onClick={toggleSidebar}>
                    <div className={styles.sidebarHeaderButton} onClick={toggleSidebar}>
                        <Image src="/icons/bars.svg" alt="Menu" width={23} height={23} priority/>
                    </div>
                </i>
            </div>

            <ul className={styles.sidebarList}>
                {menuItems.map(renderMenuItem)}
            </ul>

            <div className={styles.sidebarFooter}>
                {showExtraItems && (
                    <>
                        <li className={styles.sidebarListItem} onClick={() => console.log('Settings')}>
                            <div className={styles.sidebarListItemContent}>
                                <div className={styles.sidebarListItemIconContainer}>
                                    <Image className={styles.sidebarListItemIcon} src="/icons/gear.svg" alt="Settings"
                                           width={24} height={24}/>
                                </div>
                                <span
                                    className={`${styles.sidebarListItemName} ${isSidebarOpen ? '' : styles.sidebarListItemNameClosed}`}>Settings
                                </span>
                            </div>
                            <span
                                className={`${styles.sidebarListItemTooltip} ${isSidebarOpen ? styles.sidebarListItemTooltipOpen : styles.sidebarListItemTooltipClosed}`}>
                        {settingsItem.name}
                        </span>
                        </li>
                        <li className={styles.sidebarListItem} onClick={handleLogoutClick}>
                            <div className={styles.sidebarListItemContent}>
                                <div className={styles.sidebarListItemIconContainer}>
                                <Image className={styles.sidebarListItemIcon} src="/icons/logout.svg" alt="Logout"
                                           width={24} height={24}/>
                                </div>

                                <span
                                    className={`${styles.sidebarListItemName} ${isSidebarOpen ? '' : styles.sidebarListItemNameClosed}`}>Logout</span>
                            </div>
                            <span
                                className={`${styles.sidebarListItemTooltip} ${isSidebarOpen ? styles.sidebarListItemTooltipOpen : styles.sidebarListItemTooltipClosed}`}>
                        {logoutItem.name}
                        </span>
                        </li>
                    </>
                )}
                <div className={styles.dashboardItemSeparator}></div>

                <li className={styles.sidebarListItem} onClick={handleAccountClick}>
                    <div className={styles.sidebarListItemContent}>

                        <div className={styles.sidebarListItemIconContainer}>
                            <Image
                                className={styles.sidebarListItemIcon}
                                priority
                                src={userItem.iconSrc}
                                alt={userItem.alt}
                                width={userItem.width}
                                height={userItem.height}
                            />
                        </div>
                        <span
                            className={`${styles.sidebarListItemName} ${isSidebarOpen ? '' : styles.sidebarListItemNameClosed}`}>
                            {userItem.name}
                        </span>


                    </div>
                    <span
                        className={`${styles.sidebarListItemTooltip} ${isSidebarOpen ? styles.sidebarListItemTooltipOpen : styles.sidebarListItemTooltipClosed}`}>
                        {userItem.name}
                        </span>
                </li>

            </div>
        </aside>
    );
};

export default Sidebar;