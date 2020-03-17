$(document).ready(function() {

    var engineKey = '2pcRyhspk77bfDa84m5g';

    var searchForm = $('#search-form');
    var searchInput = $('#search');

    searchForm.submit(function(e) {
        e.preventDefault();
        var value = searchInput.val();
        window.location = '/blog/searchresults/#stq=' + value;
    })

    var renderPagination = function (type, currentPage, totalPages) {
        var pages = '<div class="st-page m-pagination">',
          previousPage, nextPage;
        if (currentPage != 1) {
          previousPage = currentPage - 1;
          pages = pages + '<a href="#" class="m-icon-button filled in-pagination-left" data-hash="true" data-page="' + previousPage + '"><span class="icon-arrow-left"></span></a>';
        }
        pages += 'Page ' + currentPage + ' of ' + totalPages;
        if (currentPage < totalPages) {
          nextPage = currentPage + 1;
          pages = pages + '<a href="#" class="m-icon-button filled in-pagination-right" data-hash="true" data-page="' + nextPage + '"><span class="icon-arrow-right"></span></a>';
        }
        pages += '</div>';
        return pages;
    };
  

    var post = function(url, title, item) {
        return '<div class="m-article-card">'
            + '<div class="m-article-card__picture" style="background-image: url('+item['feature_image']+');" >'
            + '<a class="m-article-card__picture-link" href="' + url + '" class="st-search-result-link"></a>'
            + '</div>'
            + '<div class="m-article-card__info"><a class="m-article-card__tag" href="'+item['primary_tag_url']+'">'+item['primary_tag']+'</a>'
            + '<a class="m-article-card__info-link" href="' + url + '"><h2 class="m-article-card__title js-article-card-title">' + title + '</h2></a></div>';
    };

    var page = function(url, title) {
        return '<div class="m-article-card no-picture">'
            + '<div class="m-article-card__picture">'
            + '<a class="m-article-card__picture-link" href="' + url + '" class="st-search-result-link"></a>'
            + '</div>'
            + '<div class="m-article-card__info">'
            + '<a class="m-article-card__info-link" href="' + url + '"><h2 class="m-article-card__title js-article-card-title">' + title + '</h2></a></div>';
    };

    var customRenderFunction = function(document_type, item) {
        var url = Swiftype.htmlEscape(item['url']);
        var title = item['title'];

        // If the page has a featured image and tag, display those items
        if (item['feature_image'] && item['primary_tag']) {
            return post(url, title, item);
        } else {
            return page(url, title);
        }
    }; 

    function searchFn() {
        var url = new URL(window.location.href);
        searchValue = url.hash.split('=')[1];

        // Remove the pagination hash
        if (searchValue){
            searchInput.val(searchValue.replace('&stp', ''));
        }

        // Autocomplete
        searchInput.swiftype({
            engineKey: engineKey,
        });

        // Page of results
        searchInput.swiftypeSearch({
            engineKey: engineKey,
            resultContainingElement: '#st-search-container',
            renderFunction: customRenderFunction,
            renderPaginationForType: renderPagination,
            perPage: 25
        });
    }
    
    searchFn();
})