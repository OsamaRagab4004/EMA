// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig = {
  apiKey: 'AIzaSyBBu4thhsT_MqvP3A7cXlsGQHmZNMldhOg',
  authDomain: 'ema-projekt-372b5.firebaseapp.com',
  projectId: 'ema-projekt-372b5',
  storageBucket: 'ema-projekt-372b5.appspot.com',
  messagingSenderId: '710123253026',
  appId: '1:710123253026:web:7184fd4bd34b412c71897b',
  measurementId: 'G-R6MZJF2WFL'
};


export const environment = {
  production: false,
  firebase: firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
