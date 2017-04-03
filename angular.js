(function () {
    'use strict';

    angular
        .module('app', [])
        .controller('controller', controller)
        .factory('dataservice', dataservice);

    controller.$inject = ['dataservice'];
    dataservice.$inject = ['$q', '$http'];

    function controller(dataservice) {
        var vm = this;
        vm.answer = {};
        vm.error = null;
        vm.hasSubmitted = false;
        vm.isSubmitting = false;       
        vm.submit = submit;             
              
        function submit(){
            if(!vm.answer.name || !vm.answer.email || !vm.answer.company){
                vm.error = "Du må fylle ut navn, epost og firma";
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