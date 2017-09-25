import { BrowserPolicy } from 'meteor/browser-policy-common';
BrowserPolicy.content.allowOriginForAll("fonts.googleapis.com");
BrowserPolicy.content.allowFontOrigin("data:");
BrowserPolicy.content.allowFontOrigin("https://fonts.gstatic.com");
BrowserPolicy.content.allowOriginForAll("cdnjs.cloudflare.com");
// BrowserPolicy.content.allowOriginForAll('*.s3.amazonaws.com');
// BrowserPolicy.content.allowOriginForAll('lorempixel.com');
