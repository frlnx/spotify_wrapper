# spotify_wrapper
A tiny flask web server that wraps spotifys search function and displays the results

# install
 - Create a virtualenv, always a good idea. Python 3.4+ is fine, probably works with Python 2.6+ too actually.
 - Activate your virtualenv
 - Run pip install -r requirements.txt
 - Start the server with:

PYTHONPATH=. python ./webserver/main.py

# Architectural decisions

The decision not to use a template engine was perhaps counter productive, as it may have been a part of the task to
 show off eventual skills with template engines or even preference of template engine.
 
 The thing is, *I don't have any experience with them*.
 
 I do however believe that there is much benefit to utilising the browser for what it was built for: Formatting HTML.
 There is a significantly lower amount of data that has to be sent from the server to the client, and the user
 experience is much smoother, as reloading a page makes the whole page blank and unusable for the time that the server
 takes to respond.
 
Another decision was to use as little jQuery as possible. jQuery was how ever already included in the page, so the extra overhead for the browser to load it is there. I simply wanted to show that I *can* do vanilla javascript, no fancy helper libraries required. That being said, I know the code I produce in javascript is not the prettiest, but the point I wanted to make by involving javascript is that I know how to use it in an architectural sense.

Apart from the above, I follow the Zen of Python and the teacings of uncle Bob's "Clean Code". Feel free to call me out on any sins I may have committed against these two, not always unitable, practices.
