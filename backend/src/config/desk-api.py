import json
from http.server import BaseHTTPRequestHandler, HTTPServer

VERSION = "v1"
API_KEY = "E9Y2LxT4g1hQZ7aD8nR3mWx5P0qK6pV7"

desks = [
    {
        "id": "cd:fb:1a:53:fb:e6",
        "name": "DESK 4486",
        "manufacturer": "Linak A/S",
        "position": 920,
        "speed": 0,
        "status": "Normal",
    },
    {
        "id": "ee:62:5b:b8:73:1d",
        "name": "DESK 6743",
        "manufacturer": "Linak A/S",
        "position": 1020,
        "speed": 0,
        "status": "Normal",
    },
]


class SimpleRESTServer(BaseHTTPRequestHandler):
    def _send_response(self, status_code, data):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


    def _is_valid_api_key(self, api_key):
        return api_key == API_KEY

    def do_GET(self):
        path_parts = self.path.strip("/").split("/")

        # Path format: /api/<version>/<api_key>/desks[/<desk_id>]
        if len(path_parts) < 4 or path_parts[0] != "api":
            self._send_response(404, {"error": "Invalid endpoint"})
            return

        version = path_parts[1]
        api_key = path_parts[2]

        if not self._is_valid_api_key(api_key):
            self._send_response(401, {"error": "Unauthorized"})
            return

        if version != VERSION:
            self._send_response(404, {"error": "Invalid API version"})
            return

        if len(path_parts) == 4 and path_parts[3] == "desks":
            # Return list of desks
            self._send_response(200, [desk["id"] for desk in desks])
        elif len(path_parts) == 5 and path_parts[3] == "desks":
            # Return a specific item by ID
            try:
                desk_id = str(path_parts[4])
                desk = next((desk for desk in desks if desk["id"] == desk_id), None)
                if desk:
                    self._send_response(200, desk)
                else:
                    self._send_response(404, {"error": "Desk not found"})
            except ValueError:
                self._send_response(400, {"error": "Invalid desk ID"})
        else:
            self._send_response(404, {"error": "Invalid endpoint"})

    def do_PUT(self):
        path_parts = self.path.strip("/").split("/")

        # Path format: /api/<version>/<api_key>/desks/<desk_id>
        if len(path_parts) < 4 or path_parts[0] != "api":
            self._send_response(404, {"error": "Invalid endpoint"})
            return

        version = path_parts[1]
        api_key = path_parts[2]

        if not self._is_valid_api_key(api_key):
            self._send_response(401, {"error": "Unauthorized"})
            return

        if version != VERSION:
            self._send_response(404, {"error": "Invalid API version"})
            return

        if len(path_parts) == 5 and path_parts[3] == "desks":
            try:
                desk_id = str(path_parts[4])
                content_length = int(self.headers["Content-Length"])
                post_data = self.rfile.read(content_length)
                update_data = json.loads(post_data)
                desk = next((desk for desk in desks if desk["id"] == desk_id), None)
                if desk:
                    desk.update(update_data)
                    self._send_response(200, update_data)
                else:
                    self._send_response(404, {"error": "Item not found"})
            except ValueError:
                self._send_response(400, {"error": "Invalid ID"})
        else:
            self._send_response(404, {"error": "Not found"})


def run(server_class=HTTPServer, handler_class=SimpleRESTServer, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting httpd on port {port}...")
    httpd.serve_forever()


if __name__ == "__main__":
    run(port=8000)
