//    ______  __       _______     ___      .__   __.
//   /      ||  |     |   ____|   /   \     |  \ |  |
//  |  ,----'|  |     |  |__     /  ^  \    |   \|  |
//  |  |     |  |     |   __|   /  /_\  \   |  . `  |
//  |  `----.|  `----.|  |____ /  _____  \  |  |\   |
//   \______||_______||_______/__/     \__\ |__| \__|
//
//    ______   ______    _______   _______
//   /      | /  __  \  |       \ |   ____|
//  |  ,----'|  |  |  | |  .--.  ||  |__
//  |  |     |  |  |  | |  |  |  ||   __|
//  |  `----.|  `--'  | |  '--'  ||  |____
//   \______| \______/  |_______/ |_______|
//

//   __
//  /_ |
//   | |
//   | |
//   | |
//   |_|
//


$scope.addRol = function() {
  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  $http.post($$scope._Constants.ADD_ROL_URL, $scope._RolData).
  then(function(data, status) {
    if (data.responseId != $scope._Constants.ERROR_CODE) {
      var _RolesGettedMessage = "El rol " + $scope._RolData.name + " se ha agregado correctamente."
      messageService.setMessage(_RolesGettedMessage);
    }
  })
}
//   ___
//  |__ \
//     ) |
//    / /
//   / /_
//  |____|
//
$scope.deleteStore = function(pActualStore) {

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  $http.post($$scope._Constants.DELETE_STORE_URL, $scope._StoreData).
  then(function(data, status) {
    if (data.responseId != $scope._Constants.ERROR_CODE) {
      var _RoleDeletedMessage = "El local " + $scope._StoreData.local + " se ha borrado correctamente."
      messageService.setMessage(_RoleDeletedMessage);
    }
  })
}
//   ____
//  |___ \
//    __) |
//   |__ <
//   ___) |
//  |____/
//

app.factory('messageService', function() {
  var _Message = {
    _Header: "",
    _Body: "",

    setMessage: function(pHeader, pMessage) {
      this.header = pHeader;
      this.body = pMessage;
      $('#messageModal').modal('show');
    },

    getHeader: function() {
      return this._Header;
    },
    getBody: function() {
      return this._Body;
    }
  }


  return _Message;

});

//   _  _
//  | || |
//  | || |_
//  |__   _|
//     | |
//     |_|
//

$scope.generateCSVBackup = function(pBackupFileName) {

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  $http.post($scope.CSV_BACKUP_URL, $scope._BackupData).
  then(function(data, status) {
    if (data.responseMessage != null) {
      messageService.setMessage(data.responseMessage);
    }
  })

}
//   _____
//  | ____|
//  | |__
//  |___ \
//   ___) |
//  |____/
//
modalController.$inject = ['$resource', '$scope', 'messageService'];

function modalController($resource, $scope, messageService) {
  $scope._Body = messageService.getBody();
  $scope._Header = messageService.getHeader();
  $scope.$watch(function() {
    //It is watching the message service’s header so in case it changes all the modal gets the new content.
    return messageService._Header
  }, function() {
    $scope._Body = messageService.getBody();
    $scope._Header = messageService.getHeader();
  }, true);

}

})();


//   _______   __  .______     .___________.____    ____
//  |       \ |  | |   _  \    |           |\   \  /   /
//  |  .--.  ||  | |  |_)  |   `---|  |----` \   \/   /
//  |  |  |  ||  | |      /        |  |       \_    _/
//  |  '--'  ||  | |  |\  \----.   |  |         |  |
//  |_______/ |__| | _| `._____|   |__|         |__|
//
//    ______   ______    _______   _______
//   /      | /  __  \  |       \ |   ____|
//  |  ,----'|  |  |  | |  .--.  ||  |__
//  |  |     |  |  |  | |  |  |  ||   __|
//  |  `----.|  `--'  | |  '--'  ||  |____
//   \______| \______/  |_______/ |_______|
//

//   __
//  /_ |
//   | |
//   | |
//   | |
//   |_|
//

//PROBLEM

$scope.authenticateUser = function() {
  $http.post($scope.authenticateUrl, $scope.userData)
    .then(function(data, status) {
      if (data.data[0].result != -1) {
        $scope.saveInStorage(data.data[0].result);
        messageService.setMessage('Las credenciales coinciden. El usuario ' + $scope.userData.userName + ' con id ' + data.data[0].result + ' se ha conectado. ');

      } else {
        messageService.setMessage('El usuario ' + $scope.userData.userName + ' no se ha podido autenticar');
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('userToken');
        $scope.actualUser = {};
      }

    });

};

/*
It is an example of a dirty function. Because it is doing more things that it should do.
It is not only authentichating the user but it is also managing the credentials.
Also there are some standar name that it could be changed as the following:

1. Set a constant explaining what does the -1 mean.


*/

//SOLUTION

$scope.authenticateUser = function() {
  $http.post($scope.authenticateUrl, $scope.userData)
    //First we change the parameter data to response. This to avoid confussions.
    .then(function(response, status) {
      var _Result = response.data[0].result;

      //1.Consult a constant that explaining what does the -1 mean.
      if (_Result != null) && (_Result != NOT_AUTHENICATED_RESPONSE_CODE) {
        $scope.saveInSessionStorage(_Result);
        var _IsAuthenticatedMessage = 'Las credenciales coinciden. El usuario ' + $scope.userData.userName + ' con id ' + _Result + ' se ha conectado. ';
        messageService.setMessage(_IsAuthenticatedMessage);
      }

      else {
        //We are relieving the extra functionalities to a new function.
        messageService.setMessage('El usuario ' + $scope.userData.userName + ' no se ha podido autenticar');
        $scope.cleanSessionStorage(_Result);
      }
    });
};

//   ___
//  |__ \
//     ) |
//    / /
//   / /_
//  |____|
//

//PROBLEM

$scope.$watch('movieData.data', function() {
  if ($scope.movieData.data != undefined) {
    for (actualMovie = 0; actualMovie < $scope.movieData.data.length; actualMovie++) {
      var movieElement = $scope.movieData.movies[actualMovie];
      $scope.populateGeneresByMovie(movieElement);
      $scope.populateLanguagesByMovie(movieElement);
      $scope.populateActorsByMovie(movieElement);
    }
  }

}, true);

/*
It is not clear what this function is doing.  So  for a better selfdocumented function we are doing the following.
*/

//SOLUTION

$scope.$watch('movieData.data', $scope.populateMovieElements, true);

//We are giving a good name to the function, also we are setting the variables names to the standar.
$scope.populateMovieElements = function() {
  if ($scope.movieData.data != undefined) {
    for (_ActualMovieIndex = 0; _ActualMovieIndex < $scope.movieData.data.length; _ActualMovieIndex++) {
      var _actualMovie = $scope.movieData.movies[_ActualMovieIndex];
      $scope.populateGeneresByMovie(movieElement);
      $scope.populateLanguagesByMovie(movieElement);
      $scope.populateActorsByMovie(movieElement);
    }
  }

}

//   ____
//  |___ \
//    __) |
//   |__ <
//   ___) |
//  |____/
//

//PROBLEM

$scope.$watch('actorDataSet.time', function() {
  var actualTime = $scope.actorDataSet.time;
  if (actualTime <= 3) {
    $scope.actualClass = "iconWaiting" + actualTime + " fa-spinner fa-spin";
  } else {
    $scope.actualClass = "iconComplete"
  }

});
/*
  This function has similar problem to the one before. Although i think inside the function it is not clear what is doing.
*/

//SOLUTION

$scope.$watch('actorDataSet.time', setLoadingIconClass, true);

$scope.setLoadingIconClass = function() {
  var _ActualWaitingTime = $scope.actorDataSet.time;
  var _NewLoadingIconClass = "";

  if (_ActualWaitingTime <= WAITING_TIME_LIMIT) {
    _NewLoadingIconClass = "iconWaiting" + actualTime + " fa-spinner fa-spin";
  } else {
    _NewLoadingIconClass = "iconComplete"
  }
  $scope.actualLoadingIconClass = _NewLoadingIconClass;
}



//   _  _
//  | || |
//  | || |_
//  |__   _|
//     | |
//     |_|
//

//PROBLEM
function isInDiv() {
  var actualWindowScreen = $(this).scrollTop();
  actualWindowScreen = Math.floor(actualWindowScreen / 100) * 100;
  if (canBeLoaded(actualWindowScreen)) {
    var _ActualDiv = divs[actualWindowScreen];
    for (var actualTime = 0; actualTime < $scope.constants.timeSections; actualTime++) {
      (function(ind) {
        setTimeout(function() {
          manageData(divs[actualWindowScreen], actualWindowScreen);
          actualDiv[actualId].time = actualDiv[actualId].time + 1;
        }, $scope.constants.waitTime * ind);
      })(actualTime);
    }
  }
}

/*
This piece of code has several problems.
-First of all is managing magic numbers. Those should be replaced by some variables explaining thir reason to be.
-This function is not unitary. Is doing multiple things.
-It is not clear what is doing or what it should be. "isInDiv" is an ambiguos name and is not explaining what the function should do.
-Sections time is a constant and its name does not refer it as one.
*/

//SOLUTION

//This function is in charge to determine if the data from the actual div
//(Or the div in which the user is scrolling) need to be requested.

function getWindowScreenSize() {
  var _ActualWindowScreen = $(this).scrollTop();
  return Math.floor(actualWindowScreen / $scope.constants.SCREEN_DIVISOR) * $scope.constants.SCREEN_DIVISOR;
}

function checkNeedToRequestData() {
  var _ActualWindowScreen = getWindowScreenSize();
  if (canBeLoaded(_ActualWindowScreen)) {
    var _ActualDiv = divs[_ActualWindowScreen];
    for (var _ActualTime = 0; _ActualTime < $scope.constants.TIME_SECTIONS; _ActualTime++) {
      (function(pActualTime) {
        setTimeout(function() {
          manageData(_ActualDiv, _ActualWindowScreen);
          _ActualDiv.time = _ActualDiv.time + 1;
        }, $scope.constants.WAIT_TIME * pActualTime);
      })(_ActualTime);
    }
  }
}





//   _____
//  | ____|
//  | |__
//  |___ \
//   ___) |
//  |____/
//

//PROBLEM

function manageData(actualTable, actualWindowScreen) {
  var actualTableId = actualTable.id;
  var pageSizePorcentage = $('#' + actualTableId).outerHeight(true) * 0.4;
  var newActualWindowScreen = $(this).scrollTop();
  var actualTime = $scope._DivData[actualTableId].time;

  var isInRangeTop = (actualWindowScreen >= (newActualWindowScreen - pageSizePorcentage))
  var isInRangeDown = (actualWindowScreen <= (newActualWindowScreen + pageSizePorcentage))

  if (isInRangeTop && isInRangeDown) {

    if (actualTime > $scope.constants.timeSections) {
      getDivData(actualTable);
      actualTable.loaded = true;
    }

  } else {
    $scope._DivData[actualTableId].time = 0;
  }

}
/*
As the previous piece of code this one has several problem.

Starting from the name. "Manage Data" is a very general name and doesn't explain what the function is doing.
In this one there is also a magin number that need to be replaced with a variable or a constant.
The function also is not unitary, its doing more than one thing at once.

*/
//SOLUTION

function getPageValidPageSection(pActualTableId) {
  var _PageSection = $('#' + actualTableId).outerHeight(true) * $scope.constants.PAGE_PORCENTAGE;
}

function resetTime(pActualTable) {
  $scope._DivData[actualTableId].time = 0;

}

function checkScreenRange(pActualTable, pWindowScreen) {
  var _ActualWindowScreen = getWindowScreenSize();
  var _ActualTableId = pActualTable.id;

  var _PageSection = getPageValidPageSection(_ActualTableId);
  var _ActualTime = $scope._DivData[actualTableId].time;

  var _IsInRangeTop = (pWindowScreen >= (_ActualWindowScreen - _PageSection))
  var _IsInRangeDown = (pWindowScreen <= (_ActualWindowScreen + _PageSection))

  if (_IsInRangeTop && _IsInRangeDown) {

    if (_ActualTime > $scope.constants.TIME_SECTIONS) {
      getDivData(actualTable);
      pActualTable.loaded = true;
    }

  } else {
    resetTime(pActualTable)
  }

}
