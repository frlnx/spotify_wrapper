import json
from flask import Flask, send_from_directory, request
from spotify.search import query

app = Flask(__name__, static_url_path='')
SPOTIFY_API_ENDPOINT = "https://api.spotify.com/v1/search"


@app.route("/")
def index():
    return send_from_directory('static', 'index.html')


@app.route('/<path:filename>')
def static_content(filename):
    return send_from_directory('static', filename)


@app.route('/search/<path:q_type>/<path:q_term>')
def search_by_type(q_type, q_term):
    limit = request.args.get('limit', 5)
    offset = request.args.get('offset', 0)
    assert q_type in ['artist', 'track', 'album', 'playlist']
    response = query(q_type, q_term, limit=limit, offset=offset)
    return json.dumps(response)


if __name__ == "__main__":
    app.run()
