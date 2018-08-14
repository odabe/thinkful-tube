const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback){
  const query ={
    q: `${searchTerm}`,
    part: "snippet",
    per_page: 5,
    key: `AIzaSyBVRP8V-9I0LZzB8sktDe6irScUBsChXe0`
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResults(result){
  return `
  <div class='results'>
      <h2>
      <a href="https://www.youtube.com/watch?v=${result.id
         .videoId}" target="_blank"><img class='pics' src='${result.snippet.thumbnails.medium.url}' alt='${result.snippet.title}'></a> 
         
    <br>${result.snippet.title}</a></h2>
    <a href='https://www.youtube.com/channel/${result.snippet.channelId}' target='_blank'>${result.snippet.channelTitle}</a>
    </div>`;
}

function displayYoutubeSearchData(data){
  const theResults = data.items.map((item, index) => renderResults(item));
$('.js-search-results').prop('hidden', false)
$('.js-search-results').html(theResults);
}

function loadPage(data) {
  displayYoutubeSearchData(data);
}

function submitIt(){
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val('');
    getDataFromApi(query, loadPage);
  });
}
$(submitIt);