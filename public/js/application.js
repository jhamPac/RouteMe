var app = angular.module('route-me', []);

var requestController = app.controller('requestController', ['$scope', 'requests',
    function($scope, requests) {
        requests.getAll().success(function(requests) {
            $scope.requests = requests;
        });
        $scope.delete = function(request) {
            requests.delete(request);
            requests.getAll().success(function(requests) {
                $scope.requests = requests;
            });
        }
    }
]);

app.factory('requests', ['$http',
	function($http, auth){
		// service body
		var o = {
			requests: []
		};

		o.getAll = function() {
			return $http.get('/api/requests').success(function(data) {
				angular.copy(data, o.requests);
			});
		};

		o.delete = function(request) {
			return $http.delete('/api/requests/' + request._id).success(function(data) {
				angular.copy(data, o.requests);
			});
		}

		return o;
	}
])
