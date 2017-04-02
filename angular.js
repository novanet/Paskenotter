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

        vm.nuts = getNuts();           
              
        function submit(){
            if(!vm.answer.user || !vm.answer.email || !vm.answer.company){
                vm.error = "Du må fylle ut navn, epost og firma";
                return;
            }                               
            
            vm.error = null;
            vm.isSubmitting = true;
            
            dataservice.postAnswer(vm.answer)
                .then(function(result){
                    vm.hasAnswered = true;
                })
                .finally(function(){
                    vm.isSubmitting = false;    
                });
        } 
    }

    function dataservice($q, $http) {
        return {
            postAnswer : postAnswer   
        }
      
       function postAnswer(answer) {                              
            return $q(function (resolve, reject) {
                $http.post('http://easterquiz-api.azurewebsites.net/api/answers', answer)
                    .then(function (response) {
                        resolve(response.data);
                    });
            });
        }       
    }

    function getNuts(){
        return [
                { "id": 1, "q": "Rebus 1", "domestic": true },
                { "id": 1, "q": "Rebus 2", "domestic": true },
                { "id": 1, "q": "Rebus 3", "domestic": true },
                { "id": 1, "q": "Rebus 4", "domestic": true },
                { "id": 1, "q": "Rebus 5", "domestic": true },
                { "id": 1, "q": "Rebus 6", "domestic": true },
                { "id": 1, "q": "Rebus 7", "domestic": true },
                { "id": 1, "q": "Rebus 8", "domestic": true },
                { "id": 1, "q": "Rebus 9", "domestic": true },
                { "id": 1, "q": "Rebus 10", "domestic": true },
                { "id": 1, "q": "Rebus 11", "domestic": true },
                { "id": 1, "q": "Rebus 12", "domestic": true },
                { "id": 1, "q": "Rebus 13", "domestic": true },
                { "id": 1, "q": "Rebus 14", "domestic": true },
                { "id": 1, "q": "Rebus 15", "domestic": true },
                { "id": 1, "q": "Rebus 16", "domestic": true },
                { "id": 1, "q": "Rebus 17", "domestic": true },
                { "id": 1, "q": "Rebus 18", "domestic": true },
                { "id": 1, "q": "Rebus 19", "domestic": true },
                { "id": 1, "q": "Rebus 20", "domestic": false },
                { "id": 1, "q": "Rebus 21", "domestic": false },
                { "id": 1, "q": "Rebus 22", "domestic": false },
                { "id": 1, "q": "Rebus 23", "domestic": false },
                { "id": 1, "q": "Rebus 24", "domestic": false },
                { "id": 1, "q": "Rebus 25", "domestic": false },
                { "id": 1, "q": "Rebus 26", "domestic": false },
                { "id": 1, "q": "Rebus 27", "domestic": false },
                { "id": 1, "q": "Rebus 28", "domestic": false },
                { "id": 1, "q": "Rebus 29", "domestic": false },
                { "id": 1, "q": "Rebus 30", "domestic": false },
                { "id": 1, "q": "Rebus 31", "domestic": false },
                { "id": 1, "q": "Rebus 32", "domestic": false },
                { "id": 1, "q": "Rebus 33", "domestic": false },
                { "id": 1, "q": "Rebus 34", "domestic": false },
                { "id": 1, "q": "Rebus 35", "domestic": false },
                { "id": 1, "q": "Rebus 36", "domestic": false },
                { "id": 1, "q": "Rebus 37", "domestic": false },
                { "id": 1, "q": "Rebus 38 ewwefwe wefwe", "domestic": false },
                { "id": 1, "q": "Rebus 39", "domestic": false },
                { "id": 1, "q": "Rebus 40", "domestic": false },
                { "id": 1, "q": "Rebus 41", "domestic": false },
            ];
    }
})();