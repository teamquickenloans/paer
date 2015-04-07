﻿/**
* EditGarage controller
* @namespace pera.garages.controllers
*/
(function () {
    'use strict';

    angular
      .module('pera.garages.controllers')
      .controller('EditGarageController', EditGarageController);

    EditGarageController.$inject = ['$scope', 'Garages', 'Snackbar']; //Here 'EditGarage' is the EditGarage Service (pera.garages.service)

    /**
    * @namespace EditGarageController
    */
    function EditGarageController($scope, Garages, Snackbar) {
        var vm = this;
        $scope.garages = []; //the list of garages to be returned
        $scope.current;
        $scope.mode = "false";

        var defaultForm = {
            garageID: '',
            name: '',
            address: '',
            latitude: '',
            longitude: '',
            capacity: '',
            numberOfLeasedSpaces: '',
            numberOfTeamMemberSpaces: '',
            minimumNumberOfBufferSpaces: '',
            spaceCost: '',
            transientSalePrice: '',
            owner: '',
            billingParty: '',
            reportType: '',
            accessToken: '',
            accessTokenOptional: '',
            accessTokenCost: '',
            changeCost: '',
            validationCost: '',
            numberOfValidations: '',
            garageManager: ''
        };
        $scope.current = angular.copy(defaultForm);

        $scope.edit = angular.copy(defaultForm);
        $scope.add = angular.copy(defaultForm);

        var validationApp = angular.module('validationApp', []);

        vm.submit = submit;

        $scope.$watch('mode', switchMode);
        $scope.$watch('current', update)

        Garages.all().then(garagesSuccessFn, garagesErrorFn);
        //vm.garages = EditGarage.all();
        //console.log(vm.garages);

        // switches modes and saves result in variable
        function switchMode()
        {
            if ($scope.mode === "true")
            {
                // we are switching from add to edit
                $scope.add = $scope.current; //store the current values
                $scope.current = $scope.edit;//grab the old values

            }
            else if ($scope.mode === "false")
            {
                //we are switching from edit to add
                $scope.edit = $scope.current; //store the current values
                $scope.current = $scope.add;  //grab the old values

            }

        }

        function update()
        {
            $scope.new = $scope.current;
            console.log($scope.new.name);
        }       

        function garagesSuccessFn(data, status, headers, config) {
            $scope.garages = data.data;         //this will depend on what the API returns, it may have to change
        }

        function garagesErrorFn(data, status, headers, config) {
            //Snackbar.error("Failed to retrieve garages");
        }

        function submit() {

            // check to make sure the form is completely valid
            if ($scope.editGarageForm.$valid) {
                console.log("submit");
                // Here you will post a garage to the API
                //  using the $http angular service
                if ($scope.mode === "true")
                    Garages.update($scope.new, $scope.new.garageID).then(clearForm);
                else if ($scope.mode === "false")
                    Garages.create($scope.new).then(clearForm);
            }

        };
        /*function submit()
        {
            console.log("submit");
            // Here you will post a garage to the API
            //  using the $http angular service
            if ($scope.mode === "true")
                Garages.update($scope.new, $scope.new.garageID).then(clearForm);
            else if ($scope.mode === "false")
                Garages.create($scope.new).then(clearForm);
        }*/

        /**
        * clears the edit garage form
        */
        function clearForm() {
            Snackbar.show("Garage updated successfully");
            //clears the form
            $scope.editGarageForm.$setPristine();
            $scope.new = defaultForm;
            $scope.current = defaultForm;
        }

    }
})();
