var myApp = angular.module('my-app', ['ngRoute']);
        myApp.controller('my-controller', function($scope, $http, $rootScope) {
            $scope.start = 0; 
            $scope.pageSize = 6
            $scope.searchText = "" 
            $scope.products = [];
            $scope.index = 0
            $scope.display = -1
            $scope.products = []


            $http.get('/lib/data/Subjects.js').then(
              function(d) {$scope.products = d.data},
              function(e) {alert('error: ' + e.statusText())}
            )
                    
            var fullname = sessionStorage.getItem("fullname")
            var email = sessionStorage.getItem("email")
            var username = sessionStorage.getItem("username")
            if (fullname != "") {
                $scope.fullname = fullname
            }
            if (email != "") {
                $scope.emailSession = email
            }else{
              $scope.emailSession =  null
            }

           
            $scope.logout = function(){
                $sessionStorage.empty();
            }

            $scope.display = function(){
              $scope.display = 1
              // alert($scope.display)
            }
          
        });
//config
      myApp.config(function($routeProvider){
          $routeProvider
          .when("/Login", {
              templateUrl: 'login.html?'+ Math.random(),
             
              controller: 'my-login-controller'
          })
          .when("/Register", {
            templateUrl: 'register.html?'+ Math.random(),
           
            controller: 'my-register-controller'
          })
          .when("/editprofile", {
            templateUrl: 'editprofile.html?'+ Math.random(),
           
            controller: 'my-editProfile-controller'
          })
          .when("/forgotpassword", {
            templateUrl: 'forgotpassword.html?'+ Math.random(),
           
            controller: 'my-forgotpassword-controller'
          })
          .when("/example/:id/:name", {
            templateUrl: 'exmple.html?' + Math.random(),
           
            controller: 'my-example-controller'
         })
         .when("/quiz/:id/:name/:totalQuiz/:timeTest", {
          templateUrl: 'awnser.html?' + Math.random(),
          controller: 'my-quiz-controller'
        })
        .when("/finishquiz/:id/:name/:totalQuiz/:timeTest/:Marks", {
          templateUrl: 'finish.html?' + Math.random(),
          controller: 'my-finishQuiz-controller'
        })
        .otherwise({
          templateUrl: 'layout/item-product.html?' + Math.random(),
          controller: 'my-listproduct-controller'
      })
      })

      myApp.controller('my-listproduct-controller', function($scope, $http, $rootScope){
          $scope.start = 0; 
          $scope.pageSize = 6
          $scope.products = [];
          $scope.index = 0
          $rootScope.displayPagination = 1

        $http.get('/lib/data/Subjects.js').then(
          function(d) {$scope.products = d.data},
          function(e) {alert('error: ' + e.statusText())}
        )

        $scope.nextPage = function(){
          if ($scope.start < $scope.products.length -6) {
            $scope.start += 6
            $scope.index += 4
          } else {
            $scope.start = 0
            $scope.index = 0
          }
          console.log($scope.products.length)
        }
        $scope.previousPage = function(){
          $scope.start -= 6
          $scope.index -= 4
        }
      })

//my-login-controller
      myApp.controller('my-login-controller',function($scope, $http, $interval, $rootScope){
        $rootScope.displayPagination = 0

        $http({
                type:"GET",
                headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Accept-Charset":"charset=utf-8"
                },
                dataType:"json",
                url:"/lib/data/listsv.js",
            }).then(function success(response){
            // $scope.products =response.data;
            $scope.login = function(){
            var email = $scope.email
            var password = $scope.password
            var remember = $scope.remember
            var signin = false;
            var motsv;
            for (let i = 0; i < response.data.length; i++) {
                motsv = response.data[i];
                if (email == motsv.email && password == motsv.password) {
                    signin = true
                    break
                }
            }
            if (signin) {
                if (remember) {
                    sessionStorage.setItem("username", motsv.username)
                    sessionStorage.setItem("fullname", motsv.fullname)
                    sessionStorage.setItem("password", motsv.password)
                    sessionStorage.setItem("email", motsv.email)
                    document.location="index.html"
                }
            } else {
                alert("Login fail")
            }
            }
        });
        
    });
//my example controller
    myApp.controller('my-example-controller', function($scope, $http, $routeParams, $route, $rootScope) {
      $scope.id = $routeParams.id
      $scope.namefromquiz = $routeParams.name
      $rootScope.displayPagination = 0

      $scope.searchText = "" 
      $scope.quizs= [];
      $scope.quizname = $scope.id
      // $scope.imagefromquiz = sessionStorage.getItem()
     
      $http.get('/lib/data/Quizs/'+ $scope.quizname + '.js').then(
        function(d) {
          $scope.quizs = d.data 
          $scope.quizLength = d.data.length
          console.log(d.data.length)
        },
        function(e) {alert('error: ' + e.statusText())}
      )

      $scope.clickTotalQuiz = function(){
        var quizs =  parseInt($scope.totalQuiz)

        $scope.timeTest =quizs/2
      }
      
    });

//register controller
    myApp.controller('my-register-controller', function($scope, $rootScope) {
      var register = false
      $rootScope.displayPagination = 0

      $scope.index = -1
      // if ((username != '') && (email != '') && (password != '') && (confirmPassword != '')) {
      //     $scope.index = 1
      // }
      $scope.register = function(){
          sessionStorage.setItem("username", $scope.username)
          sessionStorage.setItem("fullname", $scope.username)
          sessionStorage.setItem("password", $scope.password)
          sessionStorage.setItem("email", $scope.email)
          document.location="index.html"
      }
      
    })

//forgot password controller
    myApp.controller('my-forgotpassword-controller', function($scope, $interval, $rootScope){
      $rootScope.displayPagination = 0
      $scope.check = false
      var email = $scope.email
      $scope.oldpassword = sessionStorage.getItem("email")
      $scope.email = ''
      $interval(function () {
        if ($scope.email == sessionStorage.getItem("email")) {
          $scope.check = true
        }else{
          $scope.check = false
        }
      }, 10)
      $scope.forgotpassword = function(){
        console.log(email)
        console.log($scope.email)

        if ($scope.email == sessionStorage.getItem("email")) {
          $scope.oldpassword = sessionStorage.getItem("password")
          console.log($scope.oldpassword)
        }else{
          console.log(email)
          console.log(sessionStorage.getItem("email"))
        }
      }
    })

//quiz controller
    myApp.controller('my-quiz-controller', function($scope, $http, $routeParams, $interval, $rootScope){
      $scope.caccauhoi = []
      $rootScope.displayPagination = 0
      $scope.id = $routeParams.id
      $scope.tenmonhoc = $routeParams.name
      $scope.timeTest = $routeParams.timeTest
      $scope.totalQuiz = $routeParams.totalQuiz
      var lengthquiz = 0;
      $scope.Marks = 0
      $scope.point = 0
      var check = false

      $http.get('/lib/data/Quizs/' + $scope.id + ".js").then(
        function(d){
          $scope.caccauhoi = d.data
          // $scope.caccauhoi = d.splice(0, '10')
          lengthquiz = d.data.length
          console.log('das' + lengthquiz)

        },
        function(d){alert('error')}
      )
      $scope.prequiz = function(){
        $scope.start -= 1
        if (check) {
          $scope.Marks += $scope.point
          console.log($scope.Marks)
        }
      }
      $scope.nextquiz = function(){
        if ($scope.start < $scope.totalQuiz -1) {
          $scope.start += 1
        }else{
          $scope.start = 0
        }
        
        if (check) {
          if (totalQuiz = 20) {
            let totalPoint = Math.ceil(10/$scope.totalQuiz)
            $scope.Marks += 0.5
            console.log($scope.Marks)
            console.log(totalPoint)
          }else
          if (totalQuiz = 30) {
            $scope.Marks += 0.33
            console.log($scope.Marks)
          }else
          if (totalQuiz = 40) {
            $scope.Marks += 0.25
            console.log($scope.Marks)
          }else
          if (totalQuiz = 50) {
            $scope.Marks += 0.2
            console.log($scope.Marks)
          }
          
        }
      }
      $scope.paramStart = function(){
        $scope.start = 0
      }
      $scope.checkAwnser = function(point, IdAnswer, IdClick){
        if (IdAnswer == IdClick) {
          $scope.point = point
          check = true
        }else{
          check = false
        }
      }
      
      $scope.seconds = 59;
      $scope.minutes = $scope.timeTest - 1
      $interval(function () {
              if ($scope.minutes > 0) {
                  $scope.seconds--;
                  if($scope.seconds == 0){
                    $scope.minutes--
                    $scope.seconds = 60;
                  }
              } else {
                  clearInterval(timer)
              }
      }, 1000);

    })

//finish quiz controller
    myApp.controller('my-finishQuiz-controller', function($scope, $routeParams, $rootScope){
      $rootScope.displayPagination = 0
      $scope.nameQuiz = $routeParams.name
      $scope.totalQuiz = $routeParams.totalQuiz
      $scope.timeTest = $routeParams.timeTest
      $scope.Marks = $routeParams.Marks
      $scope.id = $routeParams.id
    })

    // .when("/finishquiz/:name/:totalQuiz/:timeTest", {