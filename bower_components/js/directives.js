(function () {

  angular.module('ingedex.directives', [])

    .directive('ingenieroName', function () {
        return {
          restrict: 'E',
          templateUrl: 'partials/ingeniero-name.html'
        };
      })
    
    .directive('convenioName', function () {
        return {
          restrict: 'E',
          templateUrl: 'partials/convenio-name.html'
        };
      })
    .directive('ingenieroImage', function () {
        return {
          restrict: 'E',
          templateUrl: 'partials/ingeniero-image.html'
        };
      })
    .directive('convenioImage', function () {
        return {
          restrict: 'E',
          templateUrl: 'partials/convenio-image.html'
        };
      })
    .directive('ingenieroData', function () {
        return {
          restrict: 'E',
          templateUrl: 'partials/ingeniero-data.html'
        };
      })
      .directive('convenioData', function () {
        return {
          restrict: 'E',
          templateUrl: 'partials/convenio-data.html'
        };
      })
     .directive('ingenieroStats', function () {
        return {
          restrict: 'E',
          templateUrl: 'partials/ingeniero-stats.html'
        };
      })

     .directive('ingenieroEvolution', function () {
        return {
          retrict: 'E',
          templateUrl: 'partials/ingeniero-evolution.html'
        };
      })

    .directive('ingenieroType', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/ingeniero-type.html'
      };
    })
    .directive('convenioType', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/convenio-type.html'
      };
    })
    .directive('ingenieroCard', function () {
      return {
        retrict: 'E',
        templateUrl: 'partials/ingeniero-card.html'
      }
    })

    .directive('convenioCard', function () {
      return {
        retrict: 'E',
        templateUrl: 'partials/convenio-card.html'
      }
    })

     .directive('ingenieroSolicitudes', ['solicitudesService', function (solicitudesService) {
      return {
        restrict: 'E',
        templateUrl: 'partials/ingeniero-solicitudes.html',
        scope: {
          name: '@name'
        },
        link: function (scope, element, attributes) {
          attributes.$observe('name', function (value) {
            if (value) {
              scope.name = value;
              scope.solicitudes = solicitudesService.getSolicitudes(value);
            }
          });
        },
        controller: function ($scope) {
          $scope.solicitudes = solicitudesService.getSolicitudes($scope.name);
          $scope.solicitud = {};
          $scope.show = false;

          $scope.toggle = function () {
            $scope.show = !$scope.show;
          };

          $scope.anonymousChanged = function () {
            if ($scope.solicitud.anonymous) {
              $scope.solicitud.email = "";
            }
          };

          $scope.addSolicitud = function () {
            $scope.solicitud.date = Date.now();
            solicitudesService.saveSolicitud($scope.name, $scope.solicitud);
            $scope.solicitudes = solicitudesService.getSolicitudes($scope.name);
            $scope.solicitud = {};
          };

        }
      };
    }]);

})();
