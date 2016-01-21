function Playlist($scope) {

    $scope.playbackRateOptions = [
      '1.00',
      '1.25',
      '1.50',
      '2.00',
    ];
    $scope.playbackRate = $scope.playbackRateOptions[0];

    $scope.addUrl = function() {
        var url = $scope.newUrl;
        if (url) {
            $scope.newUrl = '';
            $scope.player.add({
                title: url,
                mp3:url,
                free: true
            });
        }
    };

    $scope.updatePlaybackRate = function() {
        var playbackRate = $scope.playbackRate;
        $scope.jPlayer.jPlayer('option', 'playbackRate', playbackRate);
    };

    angular.element(document).ready(function () {
        $scope.player = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        }, [
        ], {
            supplied: "mp3",
            smoothPlayBar: true,
            keyEnabled: true
        });
        $scope.jPlayer = $($scope.player.cssSelector.jPlayer);
        $scope.player.option('enableRemoveControls', true);
        if ($scope.jPlayer.data('jPlayer').status.playbackRateEnabled) {
          $('#playbackRateControl').css('display', 'inline');
        }
        $scope.jPlayer.bind($.jPlayer.event.error + ".jPlayer", function(event) {
            console.log("Error Event: type = " + event.jPlayer.error.type);
            switch(event.jPlayer.error.type) {
              case $.jPlayer.error.URL:
                alert(event.jPlayer.error.message);
                $scope.player.next();
                break;
              case $.jPlayer.error.NO_SOLUTION:
                // TODO: Do something
                break;
            }
        });
        $scope.jPlayer.bind($.jPlayer.event.loadstart + ".jPlayer", function(event) {
          $scope.updatePlaybackRate();
        });
    });
}
