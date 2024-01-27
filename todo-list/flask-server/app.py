from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:1234@localhost/todoapp'  # Replace with your database credentials
db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True,)
    title = db.Column(db.String(100), nullable=False)
    day = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    done = db.Column(db.Boolean, default=False)

    
@app.route('/')
def home():
    return "home page"


@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    task_list = [{'id': task.id, 'title': task.title, 'day': task.day, 'description': task.description, 'done': task.done} for task in tasks]
    return jsonify({'tasks': task_list})


@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    new_task = Task(title=data['title'], day=data['day'], description=data['description'], done=False)
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task created successfully'})


@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if task:
        data = request.json
        task.title = data['title']
        task.day = data['day']
        task.description = data['description']
        task.done = data['done']
        db.session.commit()
        return jsonify({'message': 'Task updated successfully'})
    else:
        return jsonify({'message': 'Task not found'}), 404


@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted successfully'})
    else:
        return jsonify({'message': 'Task not found'}), 404


@app.route('/tasks/complete/<int:task_id>', methods=['PUT'])
def complete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        data = request.json
        task.done = 1&data['done']
        db.session.commit()
        return jsonify({'message': 'Task marked as completed successfully'} if task.done else {"Task is incomplete"})
    else:
        return jsonify({'message': 'Task not found'}), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
