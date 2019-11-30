# vue-webengage

[Webengage](http://webengage.com/) wrapper for vue as a plugin

***👀 EARLY RELEASE***

[CHANGELOGS](https://github.com/alibaba-aero/vue-webengage/blob/master/CHANGELOG.md)

---

## Install

```bash
npm install vue-webengage
// or
yarn add vue-webengage
```


## Setup
In `main.js` or wherever you register the plugins:

```js
Vue.use(VueWebengage, {
    namespace: 'webengage',
    key: process.env.WEBENGAGE_LICENSE,
    schemas: {
        hotel: {
            Searched: hotelSearchedSchema,
            Selected: hotelSelectedSchema,
            AddedToCart: hotelAddedToCartSchema,
        },
    },
});
```

- `namespace`
    The property to access webengage in component context (set this without `$`). E.g `this.$webengage`
- `key`
    The key provided by webengage
- `schemas`
    All of your schemas. It's not required to use schemas. Though, it's highly recommended to implement your data structure using a good library and then list them here, so you can access them later in components. 👍 Here is some: 
    - [superstructure](https://superstructjs.org/)
    - [ObjectModel](https://objectmodel.js.org/)
    - [yup](https://www.npmjs.com/package/yup) 
    

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

webengage(schema) {
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

There are times when you need same data in different events. So, if webengage is a function, before returning the events object, defined your repetitive data, and use them multiple times in any of the events.

Also, with `webengage()` being a function, the first parameter will be `schema`.

```js
webengage(schema) {
    const departureDate = new Date(...);
    return {
        'Search - Domestic Hotel': new schema.hotel.Searched({
            'Departure Date': departureDate,
            ...
        }),
        'Selected - Domestic Hotel': new schema.hotel.Selected ({
            'Departure Date': departureDate,
            ...
        })
    }
} 
```

Each event may be an object, or a function returning an object. `this` will be available as the context of your component.

---

Later then, use `this.$webengage.track(eventName)` in a proper time, to calculate event's data and trigger webengage tracker.

## $webengage
These methods and properties will be available in `this.$webengage`.

- `.track(payload)`
    Triggers webengage's track. The payload will be available when calculating event's data like `'Search - Domestic Hotel'(payload) { ... }`.
    
- `service`
    Original webengage object. contains all methods and properties that webengage provides. use this for tracking user and other things.

## Contribute
Feel free to open pull requests or issues. make sure you implement proper test and all of them are passing with `yarn test:unit`
