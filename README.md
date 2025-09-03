# true-ms

[![CI](https://github.com/shahradelahi/true-ms/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/shahradelahi/true-ms/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/true-ms.svg)](https://www.npmjs.com/package/true-ms)
![NPM Bundle Size](https://img.shields.io/bundlephobia/min/true-ms)
![Edge Runtime Compatible](https://img.shields.io/badge/edge--runtime-%E2%9C%94%20compatible-black)

_true-ms_ is a robust JavaScript utility package designed to accurately convert various time formats into a precise number of milliseconds. It handles durations, dates, and even leap years, making it a reliable choice for time-sensitive applications.

---

- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Examples](#-examples)
  - [Convert from Duration String](#-examples)
  - [Convert from Duration Object](#convert-from-duration-object)
  - [Convert from a Date with Context](#convert-from-a-date-with-context)
  - [Convert from Milliseconds to String](#convert-from-milliseconds-to-string)
  - [Time Format Written-Out (Long Format)](#time-format-written-out-long-format)
- [Documentation](#-documentation)
- [Migrations](#-migrations)
  - [Migration from `vercel/ms`](#migration-from-vercelms)
- [Contributing](#-contributing)
- [License](#license)

## 👀 Features

- **Leap Year Awareness:** Accurately calculates durations, considering leap years for precise results. (Read: [`Gregorian calendar`](https://en.wikipedia.org/wiki/Gregorian_calendar) and [`Common year`](https://en.wikipedia.org/wiki/Common_year))
- **Universal Compatibility:** Works seamlessly across [Node.js](https://nodejs.org), [`Edge Runtime`](https://nextjs.org/docs/app/api-reference/edge), and modern browsers.
- **Flexible Input/Output:**
  - When a number (milliseconds) is supplied, a human-readable string with a unit is returned (e.g., `ms(60000)` returns `"1m"`).
  - When a string containing only a number is provided, it's converted and returned as a number (e.g., `ms('100')` returns `100`).
  - When a string with a number and a valid unit is passed, the equivalent number of milliseconds is returned (e.g., `ms('2 days')` returns `172800000`).

## 📦 Installation

```bash
npm install true-ms
```

<details>
<summary>Install using your favorite package manager</summary>

**pnpm**

```bash
pnpm install true-ms
```

**yarn**

```bash
yarn add true-ms
```

</details>

## 🚀 Usage

The `ms` function is the primary export. It can take a string, a number, or an object as input, along with an optional options object.

```typescript
import ms from 'true-ms';

// Convert a duration string to milliseconds
const milliseconds = ms('1 day'); // 86400000

// Convert milliseconds to a duration string
const durationString = ms(3600000); // "1h"

// Convert a duration object to milliseconds
const objectMilliseconds = ms({ hours: 2, minutes: 30 }); // 9000000

// Convert with a starting date for accurate month/year calculations
const dateMilliseconds = ms('1 month', { from: new Date('2024-02-01') }); // Handles leap year for Feb 2024
```

## 📝 Examples

<!-- prettier-ignore -->
```js
import ms from 'true-ms';

// Basic conversions
ms('2 days')  // 172800000
ms('1d')      // 86400000
ms('10h')     // 36000000
ms('2.5 hrs') // 9000000
ms('2h')      // 7200000
ms('1m')      // 60000
ms('1mon')    // 2678400000 (approx. 31 days)
ms('5s')      // 5000
ms('1y')      // 31557600000 (approx. 365.25 days)
ms('100')     // 100

// Negative durations
ms('-3 days') // -259200000
ms('-1h')     // -3600000
ms('-200')    // -200
```

### Convert from Duration Object

<!-- prettier-ignore -->
```js
import ms from 'true-ms';

ms({ hours: 10 })          // 36000000
ms({ days: 2 })            // 172800000
ms({ minutes: 1 })         // 60000
ms({ seconds: 5 })         // 5000
ms({ years: 1 })           // 31536000000
ms({ months: 1, days: 1 }) // 2764800000 (e.g., 31 days for month + 1 day)
ms({ years: 1, months: 2, days: 3, hours: 4, minutes: 5, seconds: 6 }) // Combined duration
```

### Convert from a Date with Context

The `from` option allows for precise calculations based on a specific starting date, crucial for accurate month and year durations, especially around leap years.

<!-- prettier-ignore -->
```js
import ms from 'true-ms';

ms('1mon', { from: new Date('2016-01-01') }) // 2678400000 (31 days in Jan 2016)
ms('1mon', { from: new Date('2017-02-01') }) // 2419200000 (28 days in Feb 2017)
ms('1y', { from: new Date('2016-01-01') })   // 31622400000 (Leap year; 366 days)
ms('1y', { from: new Date('2015-01-01') })   // 31536000000 (Non-leap year; 365 days)
ms('1mon', { from: new Date('2024-02-01') }) // 2505600000 (29 days in Feb 2024 - a leap year)
```

### Convert from Milliseconds to String

<!-- prettier-ignore -->
```js
import ms from 'true-ms';

ms(60000)          // "1m"
ms(2 * 60000)      // "2m"
ms(-3 * 60000)     // "-3m"
ms(ms('10 hours')) // "10h"
```

### Time Format Written-Out (Long Format)

Use the `{ long: true }` option to get a more descriptive string.

<!-- prettier-ignore -->
```js
import ms from 'true-ms';

ms(60000, { long: true })          // "1 minute"
ms(2 * 60000, { long: true })      // "2 minutes"
ms(-3 * 60000, { long: true })     // "-3 minutes"
ms(ms('10 hours'), { long: true }) // "10 hours"
```

### 📚 Documentation

For all configuration options and detailed API reference, please see [the API docs](https://www.jsdocs.io/package/true-ms).

### 🚀 Migrations

#### Migration from `vercel/ms`

The `true-ms` package is designed to be fully compatible with [`vercel/ms`](https://github.com/vercel/ms). To migrate, simply remove `ms` from your dependencies and replace it with `true-ms`.

```diff js
- import ms from 'ms';
+ import ms from 'true-ms';
```

### 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/true-ms).

Thanks again for your support, it is much appreciated! 🙏

### License

[MIT](LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi)
