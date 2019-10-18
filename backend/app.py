from flask import Flask, jsonify


def create_app():
    """
    """

    app = Flask(__name__)
    app.config.from_object('config.settings')
    app.config.from_pyfile('settings.py', silent=True)

    @app.route('/', methods=['GET'])
    def health_check():
        return jsonify({
            'data': 'Your server is running fine!',
            'status': 'OK'
        }), 200
    return app
