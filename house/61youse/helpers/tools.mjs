/* eslint-disable */
/** Used for built-in method references. */
const objectProto = Object.prototype;

const freeGlobal =
  typeof global == 'object' && global && global.Object === Object && global;
const freeSelf =
  typeof self == 'object' && self && self.Object === Object && self;
const root = freeGlobal || freeSelf || Function('return this')();
const nativeIsFinite = root.isFinite;

/** Used as references for various `Number` constants. */
const NAN = 0 / 0;
const INFINITY = 1 / 0;
const MAX_INTEGER = 1.7976931348623157e308;

const numberTag = '[object Number]';
const symbolTag = '[object Symbol]';
const funcTag = '[object Function]';
const genTag = '[object GeneratorFunction]';
const nullTag = '[object Null]';
const undefinedTag = '[object Undefined]';
const symToStringTag = Symbol ? Symbol.toStringTag : undefined;
const argsTag = '[object Arguments]';

const spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

const nativeObjectToString = objectProto.toString;
const propertyIsEnumerable = objectProto.propertyIsEnumerable;
const hasOwnProperty = objectProto.hasOwnProperty;

/** Used to match leading and trailing whitespace. */
const reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
const reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
const reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
const freeParseInt = parseInt;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
const objectToString = objectProto.toString;

export const isString = (val) => typeof val === 'string';
export const isUndefined = (value) => value === undefined;
export const isObjectLike = (value) => !!value && typeof value == 'object';
export const isPlainObject = (val) =>
  !!val && typeof val === 'object' && val.constructor === Object;
export const isObject = (value) => {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
};

export const isSymbol = (value) => {
  return (
    typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag)
  );
};

export const toNumber = (value) => {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value)
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : reIsBadHex.test(value)
    ? NAN
    : +value;
};

export const toFinite = (value) => {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
};

export const toInteger = (value) => {
  var result = toFinite(value),
    remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
};

export const isNumber = (value) =>
  typeof value == 'number' ||
  (isObjectLike(value) && objectToString.call(value) == numberTag);
export const isNaN = (value) => isNumber(value) && value != +value;
export const isFinite = (value) =>
  typeof value == 'number' && nativeIsFinite(value);
export const isInteger = (value) =>
  typeof value == 'number' && value == toInteger(value);
export const isFunction = (value) => {
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
};

/** tools */
export const deepClone = (obj) => {
  if (obj === null) return null;
  const clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]),
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone;
};

export const map = (obj, fn) =>
  Array.isArray(obj)
    ? obj.map(fn)
    : isPlainObject(obj)
    ? Object.keys(obj).map((key) => fn(obj[key], key))
    : [];

export const omit = (obj, arr) =>
  Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

export const crossCombine = (arr1, arr2) =>
  arr1.reduce((prev, cur) => [...prev, ...arr2.map((v) => [cur, v])], []);

export const clamp = (number, lower, upper) => {
  number = +number;
  lower = +lower;
  upper = +upper;
  lower = lower === lower ? lower : 0;
  upper = upper === upper ? upper : 0;
  if (number === number) {
    number = number <= upper ? number : upper;
    number = number >= lower ? number : lower;
  }
  return number;
};

export const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []],
  );

export const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
    tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value)
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(
  (function () {
    return arguments;
  })(),
)
  ? baseIsArguments
  : function (value) {
      return (
        isObjectLike(value) &&
        hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee')
      );
    };

export const isFlattenable = (value) => {
  return (
    Array.isArray(value) ||
    isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol])
  );
};

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
    length = values.length,
    offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
    length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

export const flatMapDepth = (collection, iteratee, depth) => {
  depth = depth === undefined ? 1 : toInteger(depth);
  return baseFlatten(map(collection, iteratee), depth);
};
/** tools */
/* eslint-enable */
