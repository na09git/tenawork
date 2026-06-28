from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from app.routes.match_employee import bp as employee_bp
from app.routes.match_employer import bp as employer_bp

def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": Config.CORS_ORIGINS}})

    # Register blueprints
    app.register_blueprint(employee_bp, url_prefix='/match')
    app.register_blueprint(employer_bp, url_prefix='/match')

    @app.route('/health', methods=['GET'])
    def health():
        """Health check endpoint."""
        return jsonify({"status": "ok", "service": "tenawork-ai"}), 200

    from werkzeug.exceptions import HTTPException
    @app.errorhandler(Exception)
    def handle_exception(e):
        """Global exception handler."""
        if isinstance(e, HTTPException):
            return jsonify({"error": e.description}), e.code
        return jsonify({"error": str(e)}), 500

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=Config.PORT)
