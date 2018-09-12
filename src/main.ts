import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// 注入vconsole
declare var window: { ready?: any, AlipayJSBridge?: any, VConsole?: any, wx?: any }
const script = document.createElement('script');
script.src = 'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js';
script.onload = function () {
  /* eslint-disable no-new */
  // TODO: change to "!environment.production"
  if (true) {
    if (<any>window.VConsole) {
      new window.VConsole();
    }
  }
};
document.head.appendChild(script);
