angular.module('starter.controllers', [])

.controller('AppCtrl', function ($rootScope, $scope, $ionicModal, $timeout, $ionicUser, $ionicPush) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };

    // Handles incoming device tokens
    $rootScope.$on('$cordovaPush:tokenReceived', function (event, data) {
        alert("Successfully registered token " + data.token);
        console.log('Ionic Push: Got token ', data.token, data.platform);
        $scope.token = data.token;
    });

    // Identifies a user with the Ionic User service
    $scope.identifyUser = function () {
        console.log('Ionic User: Identifying with Ionic User service');

        var user = $ionicUser.get();
        if (!user.user_id) {
            // Set your user_id here, or generate a random one.
            user.user_id = 'rodney'; //$ionicUser.generateGUID();
        };

        // Add some metadata to your user object.
        angular.extend(user, {
            name: 'Ionitron',
            bio: 'I come from planet Ion'
        });

        // Identify your user with the Ionic User Service
        $ionicUser.identify(user).then(function () {
            $scope.identified = true;
            alert('Identified user ' + user.name + '\n ID ' + user.user_id);
        });
    };

    // Registers a device for push notifications and stores its token
    $scope.pushRegister = function () {
        console.log('Ionic Push: Registering user');

        // Register with the Ionic Push service.  All parameters are optional.
        $ionicPush.register({
            canShowAlert: true, //Can pushes show an alert on your screen?
            canSetBadge: true, //Can pushes update app icon badges?
            canPlaySound: true, //Can notifications play a sound?
            canRunActionsOnWake: true, //Can run actions outside the app,
            onNotification: function (notification) {
                // Handle new push notifications here
                console.log(notification);
                return true;
            }
        });
    };


})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
        {
            title: 'Reggae',
            id: 1
        },
        {
            title: 'Chill',
            id: 2
        },
        {
            title: 'Dubstep',
            id: 3
        },
        {
            title: 'Indie',
            id: 4
        },
        {
            title: 'Rap',
            id: 5
        },
        {
            title: 'Cowbell',
            id: 6
        }
  ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {});