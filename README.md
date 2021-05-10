# kltk Observable

a simple observable data

## Installtion

```shell
npm install kltk-observable
```

## Usage

1. import with esm

   ```typescript
   import { observable } from 'kltk-observable';
   ```

2. create a observable

   ```typescript
   const initial = {};
   const store = observable(initial);
   ```

3. subscribe/unsubscribe observable state changes

   ```typescript
   const listener = (state) => {
     console.log('store changed', state);
   };

   const unsubscribe = store.subscribe(listener);

   setTimeout(() => {
     // unsubscribe with subscribe return 
     unsubscribe();

     // unsubscribe with store
     // store.unsubscribe(listener);
   });
   ```
