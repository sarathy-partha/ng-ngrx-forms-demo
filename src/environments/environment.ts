// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAA_7NsP3bqUSoIJf5O2ldDIoKdJdki1yM',
    authDomain: 'ng-ngrx-demo.firebaseapp.com',
    databaseURL: 'https://ng-ngrx-demo.firebaseio.com',
    projectId: 'ng-ngrx-demo',
    storageBucket: 'ng-ngrx-demo.appspot.com',
    messagingSenderId: '810503052775'
  },
  config: {
    tenant: 'finiteloop.io',
    clientId: '0790be0b-0fd9-461b-b6d3-923ed667a603'
  }
};
