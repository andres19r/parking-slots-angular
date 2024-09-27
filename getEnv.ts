const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({ path: 'src/.env' });

const envFile = `export const environment = {
  firebaseConfig: {
    apiKey: '${process.env.apiKey}',
    authDomain: '${process.env.authDomain}',
    databaseURL: '${process.env.databaseURL}',
    projectId: '${process.env.projectId}',
    storageBucket: '${process.env.storageBucket}',
    messagingSenderId: '${process.env.messagingSenderId}',
    appId: '${process.env.appId}',
  }
};
`;
const targetPathDev = path.join(
  __dirname,
  './src/environments/environment.development.ts',
);
fs.writeFile(targetPathDev, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Successfully generated environment.development.ts`,
    );
  }
});

const targetPathProd = path.join(
  __dirname,
  './src/environments/environment.ts',
);
fs.writeFile(targetPathProd, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Successfully generated environment.ts`,
    );
  }
});
