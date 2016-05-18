'use strict';

/**
 * This is the project for UTS Internet Programming course, assignment 2
 *
 * @author Jack
 *
 * @note Special thanks to Black Rock Ditigal for providing the template
 * @see http://blackrockdigital.github.io/startbootstrap-shop-homepage/
 *
 */

angular.module('app', ['ui.bootstrap', 'ui.tree'])
    .controller('AppCtrl', function($scope, $http, $uibModal) {

        /**
         * Ajax loading scripts
         */
        function loadXMLFile(url, callback) {
            var xhr;

            if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
            else {
                var versions = ["MSXML2.XmlHttp.5.0",
                    "MSXML2.XmlHttp.4.0",
                    "MSXML2.XmlHttp.3.0",
                    "MSXML2.XmlHttp.2.0",
                    "Microsoft.XmlHttp"]

                for(var i = 0, len = versions.length; i < len; i++) {
                    try {
                        xhr = new ActiveXObject(versions[i]);
                        break;
                    }
                    catch(e){}
                } // end for
            }

            xhr.onreadystatechange = ensureReadiness;

            function ensureReadiness() {
                if(xhr.readyState < 4) {
                    return;
                }

                if(xhr.status !== 200) {
                    return;
                }

                // all is well
                if(xhr.readyState === 4) {
                    callback(xhr);
                }
            }

            xhr.open('GET', url, true);
            xhr.send('');
        }

        loadXMLFile("/data/categories.xml", function(xhr) {
            console.log("PureJS AJAX result: ", xhr);
        })

        /**
         * Category related codes
         */
        var url = "data/categories.xml";

        $http.get(url,{
            transformResponse: function (data) {
                var x2js = new X2JS();
                var json = x2js.xml_str2json(data);
                return json;
            }
        }).success(function (data) {
            $scope.categoryArray = data.CategoriesRoot.Categories;
        });

        $scope.selectCategory = function(category) {
            $scope.selectedCategory= category;
            $scope.addAlert(category.CategoryName +": " + category.Description);
        }

        $scope.popupCategory = function(category) {

            var categoryName = category.CategoryName;
            var description = category.Description;

            var modalInstance = $uibModal.open({
                animation: true,
                template: '<h4>Category: '+categoryName+'</h4><p> Description: '+description+'</p>',
                size: 'md',
                controller: 'CategoryCtrl'
            });
        }

        $scope.unselectCategory = function() {
            $scope.selectedCategory = undefined;
            $scope.addAlert("Displaying all products");
        }

        /**
         * Product related codes
         */
        var url = "data/products.xml";

        $http.get(url,{
            transformResponse: function (data) {
                var x2js = new X2JS();
                var json = x2js.xml_str2json(data);
                return json;
            }
        }).success(function (data) {
            $scope.productArray = data.ProductsRoot.Products;
        });

        $scope.displayProductDetail = function(product) {
            $scope.addAlert(product.ProductName +": " + product.QuantityPerUnit);
        }

        $scope.popupProduct = function(product) {

            var productName = product.ProductName;
            var description = product.QuantityPerUnit;

            var modalInstance = $uibModal.open({
                animation: true,
                template: '<h4>Product: '+productName+'</h4><p> Description: '+description+'</p>',
                size: 'md',
                controller: 'ProductCtrl'
            });
        }

        /**
         * Alert related codes
         */
        $scope.alerts = [];
        $scope.addAlert = function(message) {
            $scope.alerts.push({msg: message});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        /**
         * Tree related codes
         */
        $scope.toggle = function (scope) {
            $scope.collapsed = !$scope.collapsed;
        };

    })
    .controller('CategoryCtrl', function($scope, $http) {

    })
    .controller('ProductCtrl', function($scope, $http) {

    });
