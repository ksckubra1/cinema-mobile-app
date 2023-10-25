import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'new-mobile-app',
  webDir: 'build',
  server: {
    androidScheme: 'https',
      // "url": "http://192.168.1.39:3000",
      // "cleartext": true
  }
};

export default config;
