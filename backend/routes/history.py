from flask import Blueprint
from flask import request
from flask import jsonify

from services.history_service import get_history, delete_prediction


history_bp = Blueprint(
    "history",
    __name__
)

@history_bp.route("/history", methods=["GET"])
def history():
    return jsonify(get_history())

@history_bp.route("/history", methods=["DELETE"])
def delete_item():
    data = request.json
    timestamp = data.get("time")
    success = delete_prediction(timestamp)
    return jsonify({"success": success})