# vue-webengage
[WIP] webengage wrapper for vue as a plugin

---

## Install
Add `{ src: '~/plugins/webengage-2/index', mode: 'client' }` to plugins section of `next.config.js `

## Usage
After adding the plugin, there will be a top-level `webengage` option available in SFCs. 

```js
export default {
    ...
    data() {},
    computed: {},
    ...,
    webengage: {
        ...
    }
}
```

`webengage` may be an object or a function returning an object, containing webengage events:

```js
webengage: {
    'Search - Domestic Hotel': {
        ...
    },
    'Selected - Domestic Hotel': {
        ...
    }
} 

// or

webengage() {
    return {
        'Search - Domestic Hotel': {
            ...
        },
        'Selected - Domestic Hotel': {
            ...
        }
    }
} 
```

There are times when you need same data in diffrent events. so, if webengage is a function, before returning the events object, defined your repetitive data, and use'em multi times in any of the events:

```js
webengage() {
    const departureDate = new Date(...);
    return {
        'Search - Domestic Hotel': {
            'Departure Date': departureDate,
            ...
        },
        'Selected - Domestic Hotel': {
            'Departure Date': departureDate,
            ...
        }
    }
} 
```

**[📑 All proper events with their required properties are listed here](https://docs.google.com/spreadsheets/d/1XxXDBvlI-okaepO-J-QuaPk4fn0y-ShszIgbV3fXHEM/edit#gid=134869755)** 

---

Each event may be an object, or a function returning an object. `this` will be available as the context of your component.
To prevent any errors in future, It's strongly recommended to use already defined webengage schemas in `~/schemas/webengage`.  

For example, if you're working on hotel, import hotel's schema, and then return a new instance of hotel's Model.


```js
import { Searched as WeSearchSchema } from '~/schemas/webengage/hotel';

export default {
    ...,
    webengage: {
        'Search - Domestic Hotel' () {
            const { name, country, state, type } = this.destination;
            const keyword = `${name}${country ? ` ${country}` : ''}${state ? ` ${state}` : ''}`;
            
            return new WeSearchSchema({
                'Keyword': keyword,
                'Check-in': new Date(dateConverter(this.departing, 'toGregorian', 'YYYY-MM-DD')),
                'Check-out': new Date(dateConverter(this.returning, 'toGregorian', 'YYYY-MM-DD')),
                'City': this.destination.name,
                'Destination Type': this.destination.type,
                'Number of Nights': this.request.stayNo,
            });
        }
    }
} 
```

Later then, use `this.$webengage2.track('Search - Domestic Hotel')` in a proper time, to trigger webengage tracker. `.track` method, also accepts a second parameter as payload. so in above example, the payload will be available as `'Search - Domestic Hotel'(payload) { ... }`.


## Contribute
- Define property in `~/webengage/properties.js` if doesn't exist. Each property should have a `key` and a `schema` property.

```js
export const checkIn = {
    key: 'Check-in',
    schema: {
        type: Date,
        required: true,
    },
};
```

- Create proper file based on event name (e.g. `searched.js`) in corresponding directory (e.g. `./hotel`)
- Export it in `index.js` in same directory.

For example:

~/schemas/webengage/hotel/searched.js

```js
import SchemaObject from 'schema-object';
import {
    appStore,
    checkIn,
    checkOut,
    keyword,
    numberOfNights,
    destinationType,
} from '../properties';

export default new SchemaObject({
    [appStore.key]: appStore.schema,
    [checkIn.key]: checkIn.schema,
    [checkOut.key]: checkOut.schema,
    [keyword.key]: keyword.schema,
    [numberOfNights.key]: numberOfNights.schema,
    [destinationType.key]: destinationType.schema,
}, {
    strict: true,
});
```

~/schemas/webengage/hotel/index.js

```js
export Searched from './searched';
```

**‌📖 [Checkout `schema-object` docs at npm](https://www.npmjs.com/package/schema-object)**