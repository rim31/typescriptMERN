# Starting project : REACT NATIVE typescript

https://www.youtube.com/watch?v=oc3PoxqpJkU
https://www.youtube.com/watch?v=KIQa_7_pvDY
https://www.youtube.com/watch?v=ZcWZUSuD_jM

https://dev.to/nas5w/creating-a-todo-list-app-in-react-using-typescript-2h00

## install

```
npm i -g expo
expo --version
expo init tsMobile
```

```
cd tsMobile
cs package.json
```

check that you have a version and name in the project : package.json
Otherwise add them

```
yarn add -D react-native-typescript-transformer typescript
```

change app.json
add this : 
```
...
    "packagerOpts": {
      "sourceExts": [
        "ts",
        "tsx"
      ],
      "transformer": "node_modules/react-native-typescript-transformer/index.js"
    }
    ...
  }
}
```

if you still have App.js
```
mv App.js App.tsx
```

inside first line : 
```
import * as React from 'react';
...
```

start typescript compile :
```
npx tsc --init
```

check this et add this in tsconfig.json
```
   "target": "es6",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "jsx": "react-native", 
```

configure how to compile :
package.json
```
```





message TS6071: Successfully created a tsconfig.json file.


