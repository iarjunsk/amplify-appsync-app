import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify from 'aws-amplify';
import PubSub from "@aws-amplify/pubsub";
import awsconfig from './aws-exports';


Amplify.configure(awsconfig);
// PubSub.configure(awsconfig); // Optional

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
