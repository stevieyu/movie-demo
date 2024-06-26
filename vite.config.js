// Plugins
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import {
  PrimeVueResolver,
} from 'unplugin-vue-components/resolvers'

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// import ViteFonts from 'unplugin-fonts/vite'

import UnoCSS from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'

import biomePlugin from 'vite-plugin-biome';


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
    // biomePlugin({
    //   mode: 'format',
    //   files: 'src/**/*', // Format only JavaScript files in src
    //   applyFixes: true
    // }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: {labs: true},
      styles: true
    }),
    // ViteFonts({
      // google: {
      //   families: [{
      //     name: 'Roboto',
      //     styles: 'wght@100;300;400;500;700;900',
      //   }],
      // },
    // }),
  ],
  css: {
    transformer: 'lightningcss'
  },
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id){
          id = id.replace(process.cwd(),'')
          if(id.includes('node_modules')){
            const isVendor = !/vue/.test(id)
            if(isVendor) {
              return 'vendor'
            }
          }
        }
      }
    }
  }
})
