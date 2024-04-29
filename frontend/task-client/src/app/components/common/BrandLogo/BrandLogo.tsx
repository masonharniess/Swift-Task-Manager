import React from 'react';
import Image from 'next/image';

import styles from './BrandLogo.module.css';

const BrandLogo = ({height = 78, width = 140, className = styles.brandAndLogo} ) => {

    const nameOfClass = `${styles.brandAndLogo} ${className || ''}`;

    return (
        <div className={nameOfClass}>
            <Image
                priority
                src="/BrandAndLogo.svg"
                height={height}
                width={width}
                alt="Website Title: Swift. Website Logo: Silhouette of a bird."
            />
        </div>
    );
};

export default BrandLogo;

