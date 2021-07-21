import { devConfig } from './dev.js';
import { prodConfig } from './prod.js';
let mongoURI;

if (process.env.NODE_ENV === 'production') {
    mongoURI = prodConfig.mongoURI
} else {
    mongoURI = devConfig.mongoURI 
   }

export { mongoURI }