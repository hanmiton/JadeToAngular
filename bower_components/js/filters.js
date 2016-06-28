(function () {

  angular.module('ingedex.filters', [])
    .filter('normalize', function () {
      return function (input) {
          if (!input) return "";
          
          input = input
                  .replace('♀', 'f')
                  .replace('♂', 'm')
                  .replace(/\W+/g, "");
          return input.toLowerCase();
      };
    })
    .filter('imageifyC', ['$filter', function ($filter) {
    return function (input) {
      var url = "img/convenios/" + $filter('normalize')(input) + ".jpg";
      return url;
    };
  }])
    .filter('imageify', ['$filter', function ($filter) {
    return function (input) {
      var url = "img/ingenieros/" + $filter('normalize')(input) + ".jpg";
      return url;
    };
  }]);

})();
