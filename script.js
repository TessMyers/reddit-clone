$(function(){

  // first, populate headlines with 5 most popular subreddits
  $.getJSON('http://api.reddit.com/subreddits/popular.json?limit=5&jsonp=', function(data){

    // Add titles of most popular subreddits
    data.data.children.forEach(function(sub, i){
      $('.title.'+ i).text(sub.data.display_name);
      getHotLinks(sub.data.display_name, i);
    })
  })

})

function getHotLinks(sub, col){
  // Grab the correct column for the subreddit
  var column = $('.subreddit.' + col);

  $.getJSON('http://api.reddit.com/r/'+sub+'/hot.json?limit=12&jsonp=', function(data){
    data.data.children.forEach(function(link){

      // only add more links if the parent div has room.
      if (parseInt($(column).css('height')) < 1800 ){
        // create a link template
        var linkTemplate = '<div class="link"><a href="http://www.reddit.com'+link.data.permalink+'">'+ link.data.title+'</a><img src="'+link.data.thumbnail+'"></img></div>';

        // Add link template
        $(column).append(linkTemplate);
      }
    })
  })
}