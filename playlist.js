function Playlist($scope) {

    $scope.playbackRateOptions = [
      '1.00', '1.10', '1.15', '1.20', '1.25', '1.30', '1.35',
      '1.40', '1.45', '1.50', '1.60', '1.75', '2.00'
    ];
    $scope.playbackRate = $scope.playbackRateOptions[0];

    $scope._addUrl = function(url) {
      $scope.player.add({
        title: url,
        mp3:url,
        free: true
      });
    };

    $scope.addUrl = function() {
        var url = $scope.newUrl;
        if (url) {
            $scope.newUrl = '';
            $scope._addUrl(url);
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
        $('#droppable').on("drop", function(e) {
          $(this).removeClass('dragover');
          e.preventDefault();
          var url = e.originalEvent.dataTransfer.getData("text/plain");
          $scope._addUrl(url);
        });
        $('#droppable').on("dragover", function(e) {
          $(this).addClass('dragover');
        });
        $('#droppable').on("dragleave", function(e) {
          $(this).removeClass('dragover');
        });
    });
}
