import localFont from 'next/font/local';

export const clashDisplay = localFont({
    src: [
        { path: '../public/fonts/ClashDisplay-Regular.otf', weight: '400' },
        { path: '../public/fonts/ClashDisplay-Bold.otf', weight: '700' },
    ],
    variable: '--font-hero',
    display: 'swap',
});

export const panchang = localFont({
    src: [
        { path: '../public/fonts/Panchang-Regular.otf', weight: '400' },
        { path: '../public/fonts/Panchang-Extrabold.otf', weight: '800' },
    ],
    variable: '--font-heading',
    display: 'swap',
});

export const hkGroteskWide = localFont({
    src: [
        { path: '../public/fonts/hkgroteskwide-regular.otf', weight: '400' },
        { path: '../public/fonts/hkgroteskwide-bold.otf', weight: '700' },
        { path: '../public/fonts/hkgroteskwide-black.otf', weight: '900' },
    ],
    variable: '--font-ui',
    display: 'swap',
});

export const spaceGrotesk = localFont({
    src: [
        { path: '../public/fonts/SpaceGrotesk-Regular.otf', weight: '400' },
        { path: '../public/fonts/SpaceGrotesk-Bold.otf', weight: '700' },
    ],
    variable: '--font-body',
    display: 'swap',
});
