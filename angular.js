(function () {
    'use strict';

    angular
        .module('app', ['ngCookies'])
        .controller('controller', controller)
        .factory('dataservice', dataservice);

    controller.$inject = ['$scope', 'dataservice', '$cookies'];
    dataservice.$inject = ['$q', '$http'];

    function controller($scope, dataservice, $cookies) {
        var vm = this;
        vm.answer = {};
        vm.error = null;
        vm.hasSubmitted = false;
        vm.isSubmitting = false;       
        vm.submit = submit;             
              
        var answerFromCookie = $cookies.get('novaneteasterquiz');
        if(answerFromCookie)
            vm.answer = answerFromCookie; 

        $scope.$watchCollection('vm.answer', function() { 
            $cookies.put('novaneteasterquiz', vm.answer, { expires: new Date(2017, 5, 1) });
         });            

        function submit(){
            if(!vm.answer.name || !vm.answer.email || !vm.answer.company || vm.answer.email.indexOf('@') === -1){
                vm.error = "Du må fylle ut navn, gyldig epost og firma";
                return;
            }                               
            
            vm.error = null;
            vm.isSubmitting = true;
            
            dataservice.post(vm.answer)
                .then(function(){
                    vm.hasAnswered = true;
                })
                .catch(function(){
                    vm.error = "Det har skjedd en feil ved levering av svarene. Vennligst prøv på nytt.";
                })
                .finally(function(){
                    vm.isSubmitting = false;    
                });
        } 
    }

    function dataservice($q, $http) {
        return {
            post : post   
        }
      
        function post(data) {
            return $q(function (resolve, reject) {
                $http.post('http://easterquiz-api.azurewebsites.net/api/answers', data)
                    .then(saveComplete)
                    .catch(saveFailed);

                function saveComplete(response) {
                    if (!response || !response.data.success) {
                        reject(response.data.errorCode);
                    } else {
                        resolve(response.data.result);
                    }
                }

                function saveFailed() {
                    reject();
                }
            });
        }
    }    
})();