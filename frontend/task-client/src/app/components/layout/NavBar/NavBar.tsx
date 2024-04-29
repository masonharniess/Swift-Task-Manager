// NavBar.tsx

import styles from './NavBar.module.css';
import Image from 'next/image';
import React from "react";

const NavBar = () => {
    return (
        <div className={styles.navBar}>
            <div></div>
            <div className={styles.navButtons}>
                <div className={styles.navBarIconContainer}>
                    <Image
                        className={styles.NavbarItemIcon}
                        priority
                        src='/icons/sun-bright.svg'
                        alt='Sun'
                        width='24'
                        height='24'
                    />
                </div>
                <div className={styles.weatherText}>
                    7&deg;C
                </div>
            </div>
        </div>
    );
};

export default NavBar;