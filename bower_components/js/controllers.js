(function (_) {

  angular.module('ingedex.controllers', [])
    .controller('IngedexController', ['$rootScope', '$scope', '$routeParams', 'Ingeniero', function ($rootScope, $scope, $routeParams, Ingeniero) {
      
      var type = $routeParams.type;
       var ingenieros = [];

      $rootScope.title = "";

      if (type) {
        $scope.type = type;

        $scope.ingenieros = ingenieros = Ingeniero.query({ type: type.toLowerCase() }, function (data) {
           
          $scope.groupped = partition(data, 4);
        });
      } else {
        $scope.ingenieros = ingenieros = Ingeniero.query(function (data) {
         
          $scope.groupped = partition(data, 4);
        });
      }

      $scope.search = function () {
        var result = ingenieros;
        if ($scope.searchTerm) {
          result = ingenieros.filter(function (ingeniero) {
            var name = ingeniero && ingeniero.name || "";

            return name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) !== -1;
          });
        }

        $scope.ingenieros = result;
        $scope.groupped = partition(result, 4);
      };

      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

    }])
    .controller('ConvedexController', ['$rootScope', '$scope', '$routeParams', 'Convenio', function ($rootScope, $scope, $routeParams, Convenio) {
      
      var type = $routeParams.type;
       var convenios = [];

      $rootScope.title = "";

      if (type) {
        $scope.type = type;

        $scope.convenios = convenios = Convenio.query({ type: type.toLowerCase() }, function (data) {
           
          $scope.groupped = partition(data, 4);
        });
      } else {
        $scope.convenios = convenios = Convenio.query(function (data) {
         
          $scope.groupped = partition(data, 4);
        });
      }

      $scope.search = function () {
        var result = convenios;
        if ($scope.searchTerm) {
          result = convenios.filter(function (convenio) {
            var name = convenio && convenio.name || "";

            return name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) !== -1;
          });
        }

        $scope.convenios = result;
        $scope.groupped = partition(result, 4);
      };

      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

    }])
    .controller('IngenieroController', ['$rootScope', '$scope', '$routeParams', 'Ingeniero', function ($rootScope, $scope, $routeParams, Ingeniero) {
       var name = $routeParams.name;
      //$scope.ingeniero = {};
        Ingeniero.get({ name: name }, function (ingeniero) {
           $rootScope.title = ingeniero.name;
          $scope.ingeniero = ingeniero;
      
          });
    }])

    .controller('ConvenioController', ['$rootScope', '$scope', '$routeParams', 'Convenio', function ($rootScope, $scope, $routeParams, Convenio) {
       var name = $routeParams.name;
      //$scope.ingeniero = {};
        Convenio.get({ name: name }, function (convenio) {
           $rootScope.title = convenio.name;
          $scope.convenio = convenio;
      
          });
    }])

    .controller('TabsController', ['$scope', function ($scope) {
      $scope.tab = 1;

      $scope.selectTab = function (tab) {
        $scope.tab = tab;
      };

      $scope.isActive = function (tab) {
        return tab === $scope.tab;
      };
    }]).controller('MapCtrl', ['MarkerCreatorService', '$routeParams', '$scope', function (MarkerCreatorService, $routeParams, $scope) {
        var name2 = $routeParams.name;
         $scope.address = name2;
         console.log($scope.address);


          
        $scope.map = {
            center: {
                latitude: -0.2006319,
                longitude: -78.5040844
            },
            zoom:4,
            markers: [],
            control: {},
            options: {
                scrollwheel: false
            }
        };

        //$scope.map.markers.push($scope.ecuadorMarker);

        MarkerCreatorService.createByAddress($scope.address, function(marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
        $scope.addAddress = function() {
            var address = $scope.address;
            if (address !== '') {
                MarkerCreatorService.createByAddress(address, function(marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
            }
        };

        function refresh(marker) {
            $scope.map.control.refresh({latitude: marker.latitude,
                longitude: marker.longitude});
        }

    }]);

})(_);
