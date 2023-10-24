// Plugins
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import {
  PrimeVueResolver,
} from 'unplugin-vue-components/resolvers'

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import ViteFonts from 'unplugin-fonts/vite'

import UnoCSS from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'


// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls,
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) =>
            tag.includes('dotlottie-')
            || tag.includes('sl-')
          ,
        },
      }
    }),
    // https://github.com/unplugin/unplugin-vue-components#configuration
    Components({
      resolvers: [
        PrimeVueResolver(),
      ],
    }),
    //https://unocss.dev/integrations/vite
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify()
      ],
      content: {
        pipeline: {
          include: [
            "./src/**/*.{vue,js,ts,jsx,tsx}",
            "./node_modules/vuetify/**/*.{vue,js,ts,jsx,tsx}",
            "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
          ]
        }
      }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
