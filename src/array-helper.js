function ArrayHelper() {  
}

// Use JSON parse to clone the data.
ArrayHelper.prototype.cloneData = function (data) {  
  var jsonString = JSON.stringify(data);
  return JSON.parse(jsonString);
}

ArrayHelper.prototype.unique = function (arr) {
  let uniqueArray = []

  for (let index = 0; index < arr.length; index++) {
    if (uniqueArray.indexOf(arr[index]) < 0) uniqueArray.push(arr[index])
  }

  return uniqueArray
}