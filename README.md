# true-ms

![CI](https://github.com/shahradelahi/true-ms/workflows/CI/badge.svg)
[![NPM Version](https://img.shields.io/npm/v/true-ms.svg)](https://www.npmjs.com/package/true-ms)
![NPM Bundle Size](https://img.shields.io/bundlephobia/min/true-ms)
![Edge Runtime Compatible](https://img.shields.io/badge/edge--runtime-%E2%9C%94%20compatible-black)

_true-ms_ is a JavaScript utility package to easily convert various time formats to a precise number of milliseconds.

---

- [Features](#-features)
- [Installation](#-installation)
- [Examples](#-examples)
  - [Convert from Duration Object](#convert-from-duration-object)
  - [Convert from a Date](#convert-from-a-date)
  - [Convert from Milliseconds](#convert-from-milliseconds)
  - [Time Format Written-Out](#time-format-written-out)
- [Documentation](#-documentation)
- [Migrations](#-migrations)
  - [Migration from `vercel/ms`](#migration-from-vercelms)
- [Contributing](#-contributing)
- [License](#license)

## 👀 Features

- Calculates leap years. (Read: [`Gregorian calendar`](https://en.wikipedia.org/wiki/Gregorian_calendar) and [`Common year`](https://en.wikipedia.org/wiki/Common_year))
- Compatible with [Node.js](https://nodejs.org), [`Edge Runtime`](https://nextjs.org/docs/app/api-reference/edge) and browsers.
- Compatible with [`vercel/ms`](https://github.com/vercel/ms) package that has the worst accuracy.
- When a number is supplied to `ms`, a string formatted with a unit is returned.
- When a string containing a number is provided, it is converted and returned as a number (for example, `'100'` returns `100`).
- When a string with a number and a valid unit is passed, the equivalent number of milliseconds is returned.

## 📦 Installation

```bash
npm install true-ms
```

## 📝 Examples

<!-- prettier-ignore -->
```js
ms('2 days')  // 172800000
ms('1d')      // 86400000
ms('10h')     // 36000000
ms('2.5 hrs') // 9000000
ms('2h')      // 7200000
ms('1m')      // 60000
ms('1mon')    // 2678400000
ms('5s')      // 5000
ms('1y')      // 31557600000
ms('100')     // 100
ms('-3 days') // -259200000
ms('-1h')     // -3600000
ms('-200')    // -200
```

### Convert from Duration Object

<!-- prettier-ignore -->
```js
ms({ hours: 10 })          // 36000000
ms({ days: 2 })            // 172800000
ms({ minutes: 1 })         // 60000
ms({ seconds: 5 })         // 5000
ms({ years: 1 })           // 31536000000
ms({ months: 1, days: 1 }) // 2764800000
```

### Convert from a Date

<!-- prettier-ignore -->
```js
ms('1mon', { from: new Date('2016-01-01') }) // 2678400000 - 31 days in Jan 2016
ms('1mon', { from: new Date('2017-02-01') }) // 2419200000 - 28 days in Feb 2017
ms('1y', { from: new Date('2016-01-01') })   // 31622400000 - Leap year; 366 days
ms('1y', { from: new Date('2015-01-01') })   // 31536000000 - Non-leap year; 365 days
```

### Convert from Milliseconds

<!-- prettier-ignore -->
```js
ms(60000)          // "1m"
ms(2 * 60000)      // "2m"
ms(-3 * 60000)     // "-3m"
ms(ms('10 hours')) // "10h"
```

### Time Format Written-Out

<!-- prettier-ignore -->
```js
ms(60000, { long: true })          // "1 minute"
ms(2 * 60000, { long: true })      // "2 minutes"
ms(-3 * 60000, { long: true })     // "-3 minutes"
ms(ms('10 hours'), { long: true }) // "10 hours"
```

### 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/true-ms).

### 🚀 Migrations

#### Migration from `vercel/ms`

The `true-ms` package is fully compatible with [`vercel/ms`](https://github.com/vercel/ms). All you need to do is remove [`ms`](https://github.com/vercel/ms) from your dependencies and replace it with `true-ms`.

```diff js
- import ms from 'ms';
+ import ms from 'true-ms';
```

### 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/true-ms).

Thanks again for your support, it is much appreciated! 🙏

### License

[MIT](LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi)
