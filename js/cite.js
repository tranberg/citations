$(function() {
  // Definitions of citation dialog
  $( "#dialog" ).dialog({
      autoOpen: false,
      maxWidth:600,
      maxHeight: 600,
      width: 600,
      height: 350,
      modal: true,
      });

  // Open citation dialog on click
  $( "#opener" ).click(function() {
      $( "#dialog" ).dialog( "open" );
  });

  // Find authors
  var metas = document.getElementsByTagName('meta');
  var author = ''

  // Determine number of authors
  var numAuthors = 0
  for (i=0; i<metas.length; i++) {
      if (metas[i].getAttribute("name") == "citation_author") {
          numAuthors += 1
      }
  }

  // Build a string of authors for Bibtex
  var authorIndex = 0
  for (i=0; i<metas.length; i++) {
      if (metas[i].getAttribute("name") == "citation_author") {
          authorIndex += 1
          if (authorIndex>1) {
              if (authorIndex<=numAuthors) {
                  author = author+' and '
              }
          }
          author = author+metas[i].getAttribute("content")
      }
  }

  // Populate formatted citations in Bibtex
  var title = $("meta[name='citation_title']").attr('content').slice(2)
  var journal = $("meta[name='citation_journal_title']").attr('content')
  var pubyear = $("meta[name='citation_publication_date']").attr('content').substring(0,4)
  var puburl = document.URL
  // Build a string for the Bibtex tag
  var firstAuthor = author.substr(0,author.indexOf(','));
  if (title.indexOf(',')<title.indexOf('0')) {
      var startTitle = title.substr(0,title.indexOf(','));
  }
  else {
      var startTitle = title.substr(0,title.indexOf(' '));
  }
  $('#bibtag').html(firstAuthor+pubyear+startTitle)
  $('#bibtitle').html(title)
  $('#bibauthor').html(author)
  $('#bibjournal').html(journal)
  $('#bibyear').html(pubyear)
  $('#biburl').html(puburl)

  //Build a string of authors for APA
  var author = ''
  var authorIndex = 0
  for (i=0; i<metas.length; i++) {
      if (metas[i].getAttribute("name") == "citation_author") {
          authorIndex += 1
          if (authorIndex>1) {
              if (authorIndex<numAuthors) {
                  author = author+', '
              }
          }
          if (authorIndex>1) {
              if (authorIndex===numAuthors) {
                  author = author+', & '
              }
          }
          author = author+metas[i].getAttribute("content").substr(0,metas[i].getAttribute("content").indexOf(' ')+2)+'.'
          if (metas[i].getAttribute("content").indexOf(' ') < metas[i].getAttribute("content").lastIndexOf(' ')) {
              var addNames = metas[i].getAttribute("content").substr(metas[i].getAttribute("content").indexOf(' ')+1)
              author = author+addNames.substr(addNames.indexOf(' '))
          }
      }
  }

  // Populate formatted citations in APA
  $('#APA1').html(author)
  $('#APA2').html(' ('+pubyear+').')
  $('#APA3').html(' '+title+'.')
  $('#APA4').html(' '+journal+'.')
});