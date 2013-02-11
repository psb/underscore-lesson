(function() {
  
  // Call iterator(value, key, obj) for each element of obj
  var each = function(obj, iterator) {
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        iterator(obj[i], i, obj);
      }
    } else {
      for (var i in obj){
        if (obj.hasOwnProperty(i)){
          iterator(obj[i], i, obj);
        }
      }
    }
  };

  // Determine if the array or object contains a given value (using `===`).
  var contains = function(obj, target) {
    var doesContain = false;
    _.each(obj, function(value, key, obj){
      if (value===target) {
        doesContain = true;
      }
    });
    return doesContain;
  };

  // Return the results of applying an mappingFunction to each element.
  var map = function(array, mappingFunction) {
    var newArray = [];
    _.each(array, function(value, key, obj){
      newArray.push(mappingFunction(value));
    });
    return newArray;
  };

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  var pluck = function(obj, property) {
    return _.map(obj, function(value, key, obj){
      return value[property];
    });
  };

  // Return an array of the last n elements of an array. If n is 1, return
  // just the last element
  var last = function(array, n) {
    if (array === null) {
        return undefined;
    } else if (n === undefined) {
        return array.pop();
    } else if (n >= array.length) {
        return array;
    } else {
      var array = (Array.isArray(array)) ? array : Array.prototype.slice.call(arguments[0]);
        var arrayLength = array.length;
        var sliceFrom = arrayLength - n;
        return array.slice(sliceFrom);
    } 
  };

  // Like last, but for the first elements
  var first = function(array, n) {
    if (array === null) {
        return undefined;
    } else if (n === undefined) {
        return array.shift();
    } else if (n >= array.length) {
        return array;
    } else {
      var array = (Array.isArray(array)) ? array : Array.prototype.slice.call(arguments[0]);
        return array.slice(0, n);
    } 
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  // 
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(previous_value, item){
  //     return previous_value + item;
  //   }, 0); // should be 6
  //
  var reduce = function(obj, iterator, initialValue) {
    var newValue = initialValue ? initialValue : 0;
    _.each(obj, function(value, key, obj){
      // newvalue should be the result of the iterator on the value
      newValue = iterator(newValue, value);
    });
    return newValue;
  }; 

  // Return all elements of an array that pass a truth test.
  var select = function(array, iterator) {
    var newArray = [];
    _.each(array, function(value, key, obj){
      if (iterator(value)){
        newArray.push(value);        
      } 
    });
    return newArray;
  };

  // Return all elements of an array that don't pass a truth test.
  var reject = function(array, iterator) {
    return _.select(array, function(value, key, obj){
      return !iterator(value);
    });
  };

  // Determine whether all of the elements match a truth test.
  var every = function(obj, iterator) {
    var newArray = _.select(obj, iterator);
    return (obj.length === newArray.length) ? true : false;
  };

  // Determine whether any of the elements pass a truth test.
  var any = function(obj, iterator) {
    if (iterator === undefined){
      var truthArray = [];
      _.each(obj, function(value, key, obj){
        truthArray.push(Boolean(value));
      });
      return _.contains(truthArray, true);
    } else {
      var newArray = _.select(obj, iterator);
      return (newArray.length > 0); 
    }
  };
  // Produce a duplicate-free version of the array.
  var uniq = function(array) {
    var newArray = [];
    _.each(array, function(value, key, obj) {
      if (!_.contains(newArray, value)){
        newArray.push(value);
      }
    });
    return newArray;
  };

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  var once = function(func) {
    var funcObject = {
      argumentFunc: func,
      result: undefined,
      count: 0
    };
    return function(){
      if (funcObject.count === 0) {
        funcObject.result = funcObject.argumentFunc();
        funcObject.count++;
      } else {
        return funcObject.result;
      }
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  var memoize = function(func) {
    var funcObject = {
      argumentFunc: func,
      result: undefined
    };
    return function(argument){
      if (funcObject.result === undefined){
        funcObject.result = funcObject.argumentFunc(argument);
      } else {
        funcObject.result = funcObject.argumentFunc(funcObject.result);
      }
      return funcObject.result;
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  var delay = function(func, wait) {
    setTimeout(function(){
      func.apply(this, arguments);
    }, wait);
  };

  // Extend a given object with all the properties of the passed in 
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, { 
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //
  var extend = function(object) {
    var newObject = {};
    _.each(arguments, function(value, key, obj){
      _.each(value, function(second_value, second_key, second_obj){
        newObject[second_key] = second_value;
      });
    });
    return newObject;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  var defaults = function(object) {
    var newArgs = Array.prototype.slice.call(arguments, 1);
    _.each(newArgs, function(value, key, obj){
      _.each(value, function(second_value, second_key, second_obj){
        if (!object.hasOwnProperty(second_key)){
          object[second_key] = second_value; 
        }
      });
    });
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  var flatten = function(nestedArray, result) {
    var newArray = (result === undefined) ? [] : result;
    _.each(nestedArray, function(value, key, obj){
      if (Array.isArray(value)){
        flatten(value, newArray);
      } else {
        newArray.push(value);
      }
    });
    return newArray;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  var sortBy = function(object, iterator) {
    if (typeof(iterator) === "string") {
      return object.sort(function(a, b){
        return a[iterator] > b[iterator];
      });
    } else {
      return object.sort(function(a, b){
        return iterator(a) > iterator(b);
      });
    }
  };

  // Zip together two or more arrays with elements of the same index 
  // going together.
  // 
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  var zip = function() {
    var newArray = [];
    // debugger
    var argArray = Array.prototype.slice.call(arguments, 0);
    var lengthOfFirstArray = argArray[0].length;

    var flattenedArrays = _.flatten(argArray);

    for (var i = 0; i < lengthOfFirstArray; i++) {
      var numOfArrays = argArray.length;
      var tempArray = [];
      var jump = 0;
      while (numOfArrays > 0) {
        tempArray.push(flattenedArrays[i + jump]);
        // tempArray.push[flattenedArrays[i + lengthOfFirstArray]];
        jump += lengthOfFirstArray;
        numOfArrays--;
      }
      newArray.push(tempArray);
    }
    return newArray;
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  var intersection = function(array) {
    var argArray = Array.prototype.slice.call(arguments, 0);
    var noOfArrays = argArray.length;
    // Array for unique arrays.
    var uniqArrays = [];
    // Final results array.
    var newArray = [];

    // Create an array of unique arrays.
    _.each(argArray, function(value, key, obj){
      uniqArrays.push(_.uniq(value));
    });
    // Flatten the unique arrays.
    uniqArrays = _.flatten(uniqArrays);
    // Count the number of items in the flattened array.
    var arrayContentCount = {};
    _.each(uniqArrays, function(value, key, obj){
      arrayContentCount[value] ? arrayContentCount[value]++ : arrayContentCount[value] = 1;
    });

    _.each(arrayContentCount, function(value, key, obj){
      if (value === noOfArrays) {
        newArray.push(key);
      }
    });

    return newArray;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = function(array) {
    var argArray = Array.prototype.slice.call(arguments, 1);
    var firstArray = arguments[0];
    var newArray = [];

    // Convert firstArray to object.
    var faObject = {};
    _.each(firstArray, function(value, key, obj){
      faObject[value] = 1;
    });

    // Flatten argArray
    var flattenedArrays = _.flatten(argArray);

    // Check flattenedArray value for presence in faObject and change count in faObject.
    _.each(flattenedArrays, function(value, key, obj){
      if (faObject[value]) {
        faObject[value] = 0;
      }
    });
    // Push unique items in faObject to newArray.
    _.each(faObject, function(value, key, obj){
      if (value === 1) {
        newArray.push(key);
      }
    });

    return newArray;
  };

  // Shuffle an array.
  var shuffle = function(obj) {
    var numbers = obj;
    var newArray = [];
    var count = obj.length;

    while (count > 0) {
      var index = Math.floor(Math.random()*count) - 1;
      debugger
      newArray.push(numbers[index]);
      var head = numbers.slice(0, index+1);
      var tail = numbers.slice(index);
      numbers = head.concat(tail);
      count--;
    };

    return newArray;
  };

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  var chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  var throttle = function(func, wait) {
  };

  this._ = {
    each: each,
    contains: contains,
    map: map,
    pluck: pluck,
    last: last,
    first: first,
    reduce: reduce,
    select: select,
    reject: reject,
    every: every,
    any: any,
    uniq: uniq,
    once: once,
    memoize: memoize,
    delay: delay,
    extend: extend,
    defaults: defaults,
    flatten: flatten,
    sortBy: sortBy,
    zip: zip,
    intersection: intersection,
    difference: difference,
    shuffle: shuffle,
    chain: chain,
    throttle: throttle
  };


}).call(this);
