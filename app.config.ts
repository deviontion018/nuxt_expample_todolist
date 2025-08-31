import { defineAppConfig } from "nuxt/app";

export default defineAppConfig({
    ui: {
        colors: {
            primary: '#4F46E5',
            secondary: '#10B981',
        },
        button: {
            slots: {
                base: 'cursor-pointer font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
            }
        }
        
    }
});