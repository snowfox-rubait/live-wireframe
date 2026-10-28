#!/usr/bin/env python3
"""
Simple HTTP server to serve the LiveWire Interactive Wireframing Studio.
Includes no-cache headers to ensure immediate updates in browser.
"""
import http.server
import socketserver
import os
import sys

DEFAULT_PORT = 3333
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run(port=DEFAULT_PORT):
    # Try finding an available port if DEFAULT_PORT is in use
    for p in range(port, port + 50):
        try:
            with socketserver.TCPServer(("", p), Handler) as httpd:
                print(f"==================================================")
                print(f"📐 LiveWire Interactive Wireframe Studio running at:")
                print(f"   👉 http://localhost:{p}")
                print(f"==================================================")
                httpd.serve_forever()
                break
        except OSError:
            continue

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    run(port)
