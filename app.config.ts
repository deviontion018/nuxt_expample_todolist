import { defineAppConfig } from 'nuxt/app';

export default defineAppConfig({
    ui: {
        colors: {
            primary: 'indigo',
            secondary: 'emerald',
        },
        button: {
            slots: {
                base: 'cursor-pointer font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
            }
        },
        toaster: {
          slots: {
            viewport: 'fixed top-0 right-0 flex flex-col p-4 gap-2 w-96 max-w-[100vw] z-[100]',
          }
        }
        
    }
});