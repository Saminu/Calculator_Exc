/**
 * Created by simba on 01/07/2016.
 */

//create a reusable model to hold the calculations
var calculatorModel = {
    result: 0,
    operation: "",
    memory: null,
    currentNumber: "0",
    currentDisplay: "",

    reset: function () {
        this.result = 0;
        this.operation = "";
        this.currentNumber = "0";
        this.currentDisplay = "";
    },

    setOperation: function (operationToSet) {
        this.operation = operationToSet;

        if (calculatorModel.currentNumber === "0") {
            this.currentDisplay += "0";
        }

        this.currentDisplay += " " + this.operation + " ";
        this.calculate();
        this.currentNumber = "";
    },

    calculate: function () {

        if (this.operation == "+") {
            this.result = parseFloat(this.currentNumber) + parseFloat(this.currentDisplay);
        }
        else if (this.operation == "-") {
            this.result = parseFloat(this.currentNumber) - parseFloat(this.currentDisplay);
        }
        else if (this.operation == "*") {
            this.result = parseFloat(this.currentNumber) * parseFloat(this.currentDisplay);
        }
        else if (this.operation == "/") {
            this.result = parseFloat(this.currentNumber) / parseFloat(this.currentDisplay);
        }

    }

};

//create angular module to handle interactions and use model
var calculatorModule = angular.module('calculatorModule', []);
calculatorModule.controller('calculatorController', ['$scope', function ($scope) {

    $scope.calculator = calculatorModel;

    $scope.numberButtonClicked = function (clickedNumber) {
        if (calculatorModel.currentNumber === "0") {
            calculatorModel.currentNumber = "";
            calculatorModel.currentDisplay = "";
        }

        calculatorModel.currentNumber += clickedNumber;

        console.log(calculatorModel.currentNumber);

        calculatorModel.currentDisplay += clickedNumber;
    };

    $scope.operationButtonClicked = function (clickedOperation) {
        console.log(clickedOperation);

        calculatorModel.setOperation(clickedOperation);
    };

    $scope.enterClicked = function () {
        calculatorModel.calculate();
        calculatorModel.currentDisplay = calculatorModel.result;
    };

    $scope.resetClicked = function () {
        calculatorModel.reset();
    };
}]);
