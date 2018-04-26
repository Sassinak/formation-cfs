$(function () {
  $
    .ajax('https://yts.am/api/v2/list_movies.json')
    .then(function (data) {
      console.log(data.data.movie_count);
    })
    .catch(function (err) {
      console.error(err);
    })
});
