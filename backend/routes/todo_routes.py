from flask import Blueprint, request, jsonify
from config import db
from bson import ObjectId

todo_bp = Blueprint("todos", __name__)
todos = db["todos"]

@todo_bp.route("/", methods=["GET"])
def get_todos():
    try:
        all_todos = []
        for todo in todos.find():
            todo["_id"] = str(todo["_id"])
            all_todos.append(todo)
        return jsonify(all_todos), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@todo_bp.route("/", methods=["POST"])
def add_todo():
    try:
        data = request.get_json()

        if not data.get("task") or not data.get("description"):
            return jsonify({"error": "Task and Description are required!"}), 400

        todos.insert_one({
            "task": data["task"],
            "description": data["description"]
        })
        return jsonify({"message": "Todo added successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@todo_bp.route("/<id>", methods=["GET"])
def get_todo_by_id(id):
    try:
        todo = todos.find_one({"_id": ObjectId(id)})

        if not todo:
            return jsonify({"error": "Todo not found"}), 404

        todo["_id"] = str(todo["_id"])
        return jsonify(todo), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@todo_bp.route("/<id>", methods=["PUT"])
def update_todo(id):
    try:
        data = request.get_json()

        result = todos.update_one({"_id": ObjectId(id)}, {"$set": data})

        if result.matched_count == 0:
            return jsonify({"error": "Todo not found"}), 404

        return jsonify({"message": "Todo updated successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@todo_bp.route("/<id>", methods=["DELETE"])
def delete_todo(id):
    try:
        result = todos.delete_one({"_id": ObjectId(id)})

        if result.deleted_count == 0:
            return jsonify({"error": "Todo not found"}), 404

        return jsonify({"message": "Todo deleted successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
