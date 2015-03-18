Formatted citations
===================
This script finds meta-tags for Google Scholar's indexer on a website and
creates a dialog with formatted citations for APA and BibTeX. It is published under the MIT license.

How-to
------
To use this script simply include the following lines in your .html file:

    <link href="./css/jquery-ui.min.css" rel="stylesheet">
    <script src="./js/jquery.js"></script>
    <script src="./js/jquery-ui.min.js"></script>
    <script src="./js/cite.js"></script>

Place the following html where you want the button to appear:

    <button id="citations">Cite this paper</button>

Now just press the button *Cite this paper* to see the dialog with the formatted citations.

A demo of the script can be seen in *demo.html*.

Notes
-----
The script was originally made for [OpenPsych](http://openpsych.net) where you can [see it in action](http://openpsych.net/ODP/2014/07/ethnicrace-differences-in-aptitude-by-generation-in-the-united-states-an-exploratory-meta-analysis/).

As of March 2015 it is also featured in *Mankind Quarterly* ([example](http://mankindquarterly.org/archive/paper.php?p=759)).

Read more about this script on [my blog](http://botranberg.dk/post/update-formatted-citations/).


Dependencies
------------
As of now the included libraries are:
- jQuery v1.11.1
- jQuery UI - v1.11.2

I only included the parts of jQuery UI neccesary for the dialog and fade effect. See [this link](http://jqueryui.com/download/#!version=1.10.4&components=1111101000010100000010000010000000) for customisation and choice of CSS theme.
