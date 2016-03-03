(function() {
    'use strict';

    angular.module('openfin.star')
        .directive('star', [() => {
            return {
                restrict: 'E',
                templateUrl: 'sidebars/star/star.html',
                scope: {
                    starClick: '&',
                    favouriteUrl: '&',
                    mouseLeave: '&',
                    mouseEnter: '&',
                    stock: '&'
                }
            };
        }]);
}());
