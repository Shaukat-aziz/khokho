from flask import Flask, send_from_directory, request, jsonify
import os

app = Flask(__name__, static_folder='static', static_url_path='/static')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json() or {}
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    # For demo, just log to console and return success. In real site you'd send an email or store in DB.
    print('Contact form:', name, email, message)
    return jsonify({'status':'ok'}), 200

@app.route('/files/<path:filename>')
def serve_files(filename):
    base = os.path.join(os.getcwd(), 'files')
    return send_from_directory(base, filename)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
