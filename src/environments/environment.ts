// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: 'bookstore-int',
    appId: '1:317112045149:web:4d72f7e818f2963c26c7b4',
    databaseURL:
      'https://bookstore-int-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'bookstore-int.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyDTAZRjRx1kgvMn5FPCkXU5i0ChbSj5E3E',
    authDomain: 'bookstore-int.firebaseapp.com',
    messagingSenderId: '317112045149',
    measurementId: 'G-81N7M4WEG2',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
