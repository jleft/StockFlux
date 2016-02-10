(function() {
    'use strict';

    const DESELECTION_OBJECT = {code: '', name: ''};

    class SelectionService {
        constructor() {
            this._stock = DESELECTION_OBJECT;
        }

        select(stock) {
            this._stock = stock;
        }

        selectedStock() {
            return this._stock;
        }

        deselect() {
            this._stock = DESELECTION_OBJECT;
        }

        hasSelection() {
            return this._stock !== DESELECTION_OBJECT;
        }
    }
    SelectionService.$inject = [];

    angular.module('openfin.selection', [])
        .service('selectionService', SelectionService);
}());
