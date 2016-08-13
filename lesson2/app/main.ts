import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

var boot = platformBrowserDynamic();
boot.bootstrapModule(AppModule);
