import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import { ja } from 'vuetify/locale';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { md3 } from 'vuetify/blueprints'

const vuetify = createVuetify({
    components,
    directives,
    locale: {
        locale: 'ja',
        fallback: 'ja',
        messages: { ja },
    },
    blueprint: md3,
    theme: {
        defaultTheme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
        themes: {
            dark: {
                dark: true,
                colors: {
                    primary: "#ffb3af",
                    onPrimary: "#68000e",
                    primaryContainer: "#930019",
                    onPrimaryContainer: "#ffdad8",
                    secondary: "#e7bdba",
                    onSecondary: "#442928",
                    secondaryContainer: "#5d3f3e",
                    onSecondaryContainer: "#ffdad8",
                    tertiary: "#e3c28c",
                    onTertiary: "#412d05",
                    tertiaryContainer: "#594319",
                    onTertiaryContainer: "#ffdea9",
                    error: "#ffb4ab",
                    onError: "#690005",
                    errorContainer: "#93000a",
                    onErrorContainer: "#ffb4ab",
                    background: "#201a1a",
                    onBackground: "#ede0de",
                    surface: "#181212",
                    onSurface: "#ede0de",
                    surfaceVariant: "#534342",
                    onSurfaceVariant: "#d7c1c0",
                    outline: "#a08c8b",
                    outlineVariant: "#534342",
                    shadow: "#000000",
                    scrim: "#000000",
                    inverseSurface: "#ede0de",
                    inverseOnSurface: "#362f2e",
                    inversePrimary: "#bf0024",
                    surfaceDim: "#181212",
                    surfaceBright: "#3f3737",
                    surfaceContainerLowest: "#120d0c",
                    surfaceContainerLow: "#201a1a",
                    surfaceContainer: "#251e1e",
                    surfaceContainerHigh: "#2f2828",
                    surfaceContainerHighest: "#3a3332",
                }
            },
            light: {
                colors: {
                    primary: "#bf0024",
                    onPrimary: "#ffffff",
                    primaryContainer: "#ffdad8",
                    onPrimaryContainer: "#410006",
                    secondary: "#775654",
                    onSecondary: "#ffffff",
                    secondaryContainer: "#ffdad8",
                    onSecondaryContainer: "#2c1514",
                    tertiary: "#735a2e",
                    onTertiary: "#ffffff",
                    tertiaryContainer: "#ffdea9",
                    onTertiaryContainer: "#271900",
                    error: "#ba1a1a",
                    onError: "#ffffff",
                    errorContainer: "#ffdad6",
                    onErrorContainer: "#410002",
                    background: "#fffbff",
                    onBackground: "#201a1a",
                    surface: "#fff8f7",
                    onSurface: "#201a1a",
                    surfaceVariant: "#f4dddc",
                    onSurfaceVariant: "#534342",
                    outline: "#857372",
                    outlineVariant: "#d7c1c0",
                    shadow: "#000000",
                    scrim: "#000000",
                    inverseSurface: "#362f2e",
                    inverseOnSurface: "#fbeeec",
                    inversePrimary: "#ffb3af",
                    surfaceDim: "#e4d7d6",
                    surfaceBright: "#fff8f7",
                    surfaceContainerLowest: "#ffffff",
                    surfaceContainerLow: "#fef1ef",
                    surfaceContainer: "#f8ebea",
                    surfaceContainerHigh: "#f2e5e4",
                    surfaceContainerHighest: "#ede0de",
                }
            },
        },
    },
});

export default vuetify;
