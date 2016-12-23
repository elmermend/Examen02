angular.module('myapp', ["ng-fusioncharts"]);

var locationAngularCtrl = function ($scope) {
  $scope.data = {                
    locations: [{
      name: 'Burger Queen',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '0.296456',
      _id: '5370a35f2536f6785f8dfb6a'
    },{
      name: 'Costy',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 5,
      facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
      distance: '0.7865456',
      _id: '5370a35f2536f6785f8dfb6a'
    }]};
};

var angularGraficaCtrl = function ($scope) {
	$scope.myDataSource = {
            chart: {
                caption: "Gráfica de ejemplo",
                subCaption: "Cuatro datos de ejemplo",
            },
            data:[{
                label: "Ejemplar 1",
                value: "980"
            },
            {
                label: "Ejemplar 2",
                value: "530"
            },
            {
                label: "Ejemplar 3",
                value: "490"
            },
            {
                label: "Ejemplar 4",
                value: "790"
            }]
          };
};

angular.module('myapp').controller('locationAngularCtrl', locationAngularCtrl);
angular.module('myapp').controller('angularGraficaCtrl', angularGraficaCtrl);