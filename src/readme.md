# observable


## Features

* support typescript
* immutable data


## Usage

```
import Observable from 'observable';
const o = new Observable();
o.subscribe(console.log);

o.set('', 'root value');
console.log(o.get()); // root value

o.set('prop', 'prop value');
console.log(o.get()); // {prop: 'prop value'}
console.log(o.get('prop')); // prop value
```
