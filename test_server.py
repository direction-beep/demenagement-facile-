#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8081

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"Serveur démarré sur http://localhost:{PORT}")
    print("Appuyez sur Ctrl+C pour arrêter")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServeur arrêté")








