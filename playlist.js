function Playlist($scope) {

    $scope.playlist = [];
    $scope.number = 1;

    $scope.addUrl = function() {
        var url = $scope.newUrl;
        if (url) {
            $scope.playlist.push(url);
            $scope.newUrl = '';
            $scope.number += 1;
            $scope.player.add({
                title: url,
                mp3:url,
                free: true
            });
        }
    };

    $scope.delete = function(idx) {
        $scope.playlist.splice(idx, 1);
        $scope.player.remove(idx);
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
        $scope.player.option('enableRemoveControls', true);
        $("#jquery_jplayer_1").bind($.jPlayer.event.error + ".jPlayer", function(event) {
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
    });
}
