// Script by Bo Tranberg
// http://botranberg.dk
// https://github.com/tranberg/citations
//
// This script requires jQuery and jQuery UI

$(function() {
    // Inser html for dialog just before the button to open it
    var butt = document.getElementById('citations');
    butt.insertAdjacentHTML('beforeBegin',
                            '\
                            <div id="dialog" title="Cite this paper" style="text-align:left"> \
                              <p style="text-align: center;"><b>Copy and paste one of the formatted citations into your bibliography manager.</b></p> \
                              <table style="border-collapse:separate; border-spacing:2em"> \
                                <tr style="vertical-align:top;"> \
                                  <td><strong>APA</strong></td> \
                                  <td><span id="APA1"></span><span id="APA2"></span><span id="APA3"></span><span id="APA4" style="font-style: italic"></span></td> \
                                </tr> \
                                <tr style="vertical-align:top;"> \
                                  <td><strong>Bibtex</strong></td> \
                                  <td> \
                                    @article{<span id="bibtag"></span>,<br> \
                                    &nbsp;&nbsp;&nbsp;&nbsp;title={<span id="bibtitle"></span>},<br> \
                                    &nbsp;&nbsp;&nbsp;&nbsp;author={<span id="bibauthor"></span>},<br> \
                                    &nbsp;&nbsp;&nbsp;&nbsp;journal={<span id="bibjournal"></span>},<br> \
                                    &nbsp;&nbsp;&nbsp;&nbsp;year={<span id="bibyear"></span>},<br> \
                                    &nbsp;&nbsp;&nbsp;&nbsp;url={<span id="biburl"></span>},<br> \
                                    } \
                                  </td> \
                                </tr> \
                              </table> \
                            </div>');

    // Definitions of citations dialog
    $("#dialog").dialog({
      autoOpen: false,
      show: {
          effect: "fade",
          duration: 200
      },
      hide: {
          effect: "fade",
          duration: 200
      },
      maxWidth:600,
      maxHeight: 600,
      width: 660,
      height: 400,
      modal: true,
    });

    // Open citation dialog on click
    $("#citations").click(function() {
        $("#dialog").dialog("open");
    });

    // Find authors
    var metas = document.getElementsByTagName('meta');
    var author = ''

    // Determine number of authors
    var numAuthors = 0
    for (i=0; i<metas.length; i++) {
        if (metas[i].getAttribute("name") == "citation_author") {
            numAuthors += 1
        };
    };

    // Build a string of authors for Bibtex
    var authorIndex = 0
    for (i=0; i<metas.length; i++) {
      if (metas[i].getAttribute("name") == "citation_author") {
          authorIndex += 1
          if (authorIndex>1) {
              if (authorIndex<=numAuthors) {
                  author = author+' and '
              };
          };
          author = author+metas[i].getAttribute("content")
      };
    };

    // Populate formatted citations in Bibtex
    var title = $("meta[name='citation_title']").attr('content')
    // The following test might seem stupid, but it's needed because some php function at OpenPsych appends two whitespaces to the start of the title in the meta data
    if (title[1] == ' ') {
        title = title.slice(2)
    };
    var journal = $("meta[name='citation_journal_title']").attr('content')
    var pubyear = $("meta[name='citation_publication_date']").attr('content').substring(0,4)
    var puburl = document.URL
    // Build a string for the Bibtex tag
    if (author.indexOf(',') < author.indexOf(' ')) {
        var firstAuthor = author.substr(0,author.indexOf(','));
    } else {
        var firstAuthor = author.substr(0,author.indexOf(' '));
    };
    if (title.indexOf(',')<title.indexOf('0')) {
        var startTitle = title.substr(0,title.indexOf(','));
    } else {
        var startTitle = title.substr(0,title.indexOf(' '));
    };
    $('#bibtag').html(firstAuthor+pubyear)
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
                };
            };
            if (authorIndex>1) {
                if (authorIndex===numAuthors) {
                  author = author+', & '
                };
            };

            // Check if author only has a single name
            if (metas[i].getAttribute("content").indexOf(', ')>0) {
                // Append author string with the surnames and first letter of next author's name
                author = author+metas[i].getAttribute("content").substr(0,metas[i].getAttribute("content").indexOf(', ')+3)+'.'
                // If the author has several names, append the first letter of these to the string
                if (metas[i].getAttribute("content").indexOf(', ') < metas[i].getAttribute("content").lastIndexOf(' ')-1) {
                    var extraNames = metas[i].getAttribute("content").substr(metas[i].getAttribute("content").indexOf(', ')+2)
                    var addNames = extraNames.substr(extraNames.indexOf(' '))
                    author = author+addNames.substr(addNames.indexOf(' '))
                };
            } else {
                author = author+metas[i].getAttribute("content")
            };
        };
    };

    // Populate formatted citations in APA
    $('#APA1').html(author)
    $('#APA2').html(' ('+pubyear+').')
    $('#APA3').html(' '+title+'.')
    $('#APA4').html(' '+journal+'.')
});
