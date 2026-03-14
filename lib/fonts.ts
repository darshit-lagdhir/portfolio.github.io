import localFont from 'next/font/local';

export const fornire = localFont({
    src: [
        { path: '../public/fonts/fornire.otf', weight: '400' },
    ],
    variable: '--font-accent',
    display: 'swap',
});

export const ranade = localFont({
    src: [
        { path: '../public/fonts/Ranade-Medium.otf', weight: '500' },
        { path: '../public/fonts/Ranade-Bold.otf', weight: '700' },
    ],
    variable: '--font-body',
    display: 'swap',
});

export const panchang = localFont({
    src: [
        { path: '../public/fonts/Panchang-Medium.otf', weight: '500' },
        { path: '../public/fonts/Panchang-Bold.otf', weight: '700' },
    ],
    variable: '--font-display',
    display: 'swap',
});

export const hkGroteskWide = localFont({
    src: [
        { path: '../public/fonts/hkgroteskwide-medium.otf', weight: '500' },
        { path: '../public/fonts/hkgroteskwide-bold.otf', weight: '700' },
    ],
    variable: '--font-structural',
    display: 'swap',
});

