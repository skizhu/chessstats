$(document).keypress(function (e) {
  if (e.which == 13) {
    $("#searchBarButton").click();
  }
});
$("#exampleModalButton").hide();

function getUserData(user) {
  user = document.getElementById("searchBar").value;

  const staticURL = "https://api.chess.com/pub/player/" + user + "/stats";

  function userProfileSuccess(user) {
    $.getJSON("https://api.chess.com/pub/player/" + user, function (data) {
      document.getElementById("userAvatar").setAttribute("src", data.avatar);
      if (data.avatar != null) {
        document.getElementById("userAvatar").src = data.avatar;
      } else {
        document.getElementById("userAvatar").src = "noavatar.gif";
      }
    });

    $.getJSON(staticURL, function (data) {
      var totalWins = Number("0");
      var totalGames = Number("0");
      if (data.chess_rapid != null) {
        var rapidRating = data.chess_rapid.last.rating;
        var rapidW = data.chess_rapid.record.win;
        var rapidL = data.chess_rapid.record.loss;
        var rapidD = data.chess_rapid.record.draw;
        var rapidPeak = data.chess_rapid.best.rating;

        totalWins += rapidW;
        totalGames += rapidW + rapidL + rapidD;
      } else {
        var rapidRating = "None";
        var rapidW = "N/A";
        var rapidL = "N/A";
        var rapidD = "N/A";
        var rapidPeak = "N/A";

        totalWins += 0;
        totalGames += 0;
      }

      if (data.chess_blitz != null) {
        var blitzRating = data.chess_blitz.last.rating;
        var blitzW = data.chess_blitz.record.win;
        var blitzL = data.chess_blitz.record.loss;
        var blitzD = data.chess_blitz.record.draw;
        var blitzPeak = data.chess_blitz.best.rating;

        totalWins += blitzW;
        totalGames += blitzW + blitzL + blitzD;
      } else {
        var blitzRating = "None";
        var blitzW = "N/A";
        var blitzL = "N/A";
        var blitzD = "N/A";
        var blitzPeak = "N/A";

        totalWins += 0;
        totalGames += 0;
      }
      if (data.chess_bullet != null) {
        var bulletRating = data.chess_bullet.last.rating;
        var bulletW = data.chess_bullet.record.win;
        var bulletL = data.chess_bullet.record.loss;
        var bulletD = data.chess_bullet.record.draw;
        var bulletPeak = data.chess_bullet.best.rating;

        totalWins += bulletW;
        totalGames += bulletW + bulletL + bulletD;
      } else {
        var bulletRating = "None";
        var bulletW = "N/A";
        var bulletL = "N/A";
        var bulletD = "N/A";
        var bulletPeak = "N/A";

        totalWins += 0;
        totalGames += 0;
      }
      if (totalWins > 0 && totalGames > 0) {
        var WR = (parseFloat(totalWins / totalGames) * 100).toFixed(2) + "%";
      } else {
        var WR = "0%";
      }

      document.getElementById("profileName").innerHTML = user;

      document.getElementById("profileRapid").innerHTML =
        "<span id='profileSpan'>Rapid Rating: </span>" + rapidRating + "</p>";
      document.getElementById("profileRapidW").innerHTML =
        "&emsp; <span id='profileSpan'>Rapid Wins: </span>" + rapidW + "</p>";
      document.getElementById("profileRapidL").innerHTML =
        "&emsp; <span id='profileSpan'>Rapid Losses: </span>" + rapidL + "</p>";
      document.getElementById("profileRapidD").innerHTML =
        "&emsp; <span id='profileSpan'>Rapid Draws: </span>" + rapidD + "</p>";
      document.getElementById("profileRapidPeak").innerHTML =
        "&emsp; <span id='profileSpan'>Peak: </span>" + rapidPeak + "</p>";

      document.getElementById("profileBlitz").innerHTML =
        "<span id='profileSpan'>Blitz Rating: </span>" + blitzRating + "</p>";
      document.getElementById("profileBlitzW").innerHTML =
        "&emsp; <span id='profileSpan'>Blitz Wins: </span>" + blitzW + "</p>";
      document.getElementById("profileBlitzL").innerHTML =
        "&emsp; <span id='profileSpan'>Blitz Losses: </span>" + blitzL + "</p>";
      document.getElementById("profileBlitzD").innerHTML =
        "&emsp; <span id='profileSpan'>Blitz Draws: </span>" + blitzD + "</p>";
      document.getElementById("profileBlitzPeak").innerHTML =
        "&emsp; <span id='profileSpan'>Peak: </span>" + blitzPeak + "</p>";

      document.getElementById("profileBullet").innerHTML =
        "<span id='profileSpan'>Bullet Rating: </span>" + bulletRating + "</p>";
      document.getElementById("profileBulletW").innerHTML =
        "&emsp; <span id='profileSpan'>Bullet Wins: </span>" + bulletW + "</p>";
      document.getElementById("profileBulletL").innerHTML =
        "&emsp; <span id='profileSpan'>Bullet Losses: </span>" +
        bulletL +
        "</p>";
      document.getElementById("profileBulletD").innerHTML =
        "&emsp; <span id='profileSpan'>Bullet Draws: </span>" +
        bulletD +
        "</p>";
      document.getElementById("profileBulletPeak").innerHTML =
        "&emsp; <span id='profileSpan'>Peak: </span>" + bulletPeak + "</p>";
      document.getElementById("profileWR").innerHTML =
        "<span id='profileSpan'>Winrate: </span>" + WR + "</p>";
      document.getElementById(
        "viewProfileButton"
      ).onclick = function redirectToProfile() {
        window.open("https://www.chess.com/member/" + user);
      };
      document.getElementById("resultDiv").style.transition = "0.5s";
      document.getElementById("resultDiv").style.marginBottom = "3rem";
      const element = document.getElementById("searchWrapper");
      element.classList.add("searchWrapperResult");
      document.getElementById("searchDiv").style.transition = "0.5s";
      document.getElementById("searchDiv").style.opacity = "1";
      document.getElementById("resultDiv").style.opacity = "1";
    });
  }

  const checkJSON = $.getJSON(
    "https://api.chess.com/pub/player/" + user,
    function () {
      userProfileSuccess(user);
    }
  ).fail(function () {
    $("#exampleModalButton").click();
  });
}
