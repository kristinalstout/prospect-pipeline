from models import db, Task, User, Contract, Customer, Assignee
from flask_migrate import Migrate
from flask import Flask, request, make_response
from flask_restful import Api, Resource
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)

@app.route('/')
def home():
    return '<h1>Prospect Pipeline Server</h1>'

class Customers(Resource):
    def get(self):
        customers = [customer.to_dict(rules=("-contracts.customer",))for customer in Customer.query.all()]
        return make_response(customers,200)
    
    def post(self):
        new_customer= Customer()
        data = request.get_json()
        try:
            for key in data:
                setattr(new_customer,key,data[key])
            db.session.add(new_customer)
            db.session.commit()
            return make_response(new_customer.to_dict(rules=("-contracts.customer",)),201)
        except ValueError as error:
            new_error={"error":str(error)}
        return make_response(new_error,400)
    
class CustomersById(Resource):
    def get(self,id):
        customers = Customer.query.filter(Customer.id == id).first()
        if not customers:
            return make_response({"error":"Customer not found"},404)
        return make_response(customers.to_dict(),200)
    
    def patch(self, id):
        edit_customer = CustomersById.query.filter(Customers.id == id).first()
        data = request.get_json()
        if not edit_customer:
            try:
                for key in data:
                   setattr(edit_customer,key,data[key])
                db.session.add(edit_customer)
                db.session.commit()

                return make_response(edit_customer.to_dict(rules=("-contracts.customer",)),202)
            except ValueError as error:
                new_error = {"error":str(error)}
                return make_response(new_error,400)
            
    def delete(self, id):
        customer = Customer.query.filter(Customer.id == id).first()
        if not customer:
            return make_response({"error":"Customer not found"},404)
        db.session.delete(customer)
        db.session.commit()
        return make_response({})

class Contracts(Resource):
    def get(self):
        contracts = [contract.to_dict(rules=("-customer.contract","-task.contract",))for contract in Contract.query.all()]
        return make_response(contracts,200)
    
    def post(self):
        new_contract= Contract()
        data = request.get_json()
        try:
            for key in data:
                setattr(new_contract,key,data[key])
            db.session.add(new_contract)
            db.session.commit()
            return make_response(new_contract.to_dict(rules=("-customer.contract","-task.contract",)),201)
        except ValueError as error:
            new_error={"error":str(error)}
        return make_response(new_error,400)
    
class ContractsById(Resource):
    def get(self,id):
        contracts = Contract.query.filter(Contract.id == id).first()
        if not contracts:
            return make_response({"error":"Contract not found"},404)
        return make_response(contracts.to_dict(rules=("-customer.contract","-task.contract",)),200)
    
    def patch(self, id):
        edit_contract = ContractsById.query.filter(Contracts.id == id).first()
        data = request.get_json()
        if not edit_contract:
            try:
                for key in data:
                   setattr(edit_contract,key,data[key])
                db.session.add(edit_contract)
                db.session.commit()
                return make_response(edit_contract.to_dict(rules=("-customer.contract","-task.contract",)),202)
            except ValueError as error:
                new_error = {"error":str(error)}
                return make_response(new_error,400)
            
    def delete(self, id):
        contract = Contract.query.filter(Contract.id == id).first()
        if not contract:
            return make_response({"error":"Contract not found"},404)
        db.session.delete(contract)
        db.session.commit()
        return make_response({})
    

class Users(Resource):
    def get(self):
        users = [user.to_dict(rules=("-task.user","-assignee.user",))for user in User.query.all()]
        return make_response(users,200)
    
class UsersById(Resource):
    def get(self,id):
        users = User.query.filter(User.id == id).first()
        if not users:
            return make_response({"error":"User not found"},404)
        return make_response(users.to_dict(rules=("-task.user","-assignee.user",)),200)
    
class Tasks(Resource):
    def get(self):
        tasks = [task.to_dict(rules=("-users.task","-contracts.task",))for task in Task.query.all()]
        return make_response(tasks, 200)

    def post(self):
        new_task= Task()
        data = request.get_json()
        try:
            for key in data:
                setattr(new_task,key,data[key])
            db.session.add(new_task)
            db.session.commit()
            return make_response(new_task.to_dict(rules=("-users.task","-contracts.task",)),201)
        except ValueError as error:
            new_error={"error":str(error)}
        return make_response(new_error,400)

class TasksById(Resource):
    def get(self, id):
        tasks = Task.query.filter(Task.id == id).first()
        if not tasks:
            return make_response({"error":"Task not found"},404)
        return make_response(tasks.to_dict(),200)
    
    def patch(self, id):
        edit_task = TasksById.query.filter(Tasks.id == id).first()
        data = request.get_json()
        if not edit_task:
            try:
                for key in data:
                   setattr(edit_task,key,data[key])
                db.session.add(edit_task)
                db.session.commit()
                return make_response(edit_task.to_dict(rules=("",)),202)
            except ValueError as error:
                new_error = {"error":str(error)}
                return make_response(new_error,400)
            
    def delete(self, id):
        task = Task.query.filter(Task.id == id).first()
        if not task:
            return make_response({"error":"Task not found"},404)
        db.session.delete(task)
        db.session.commit()
        return make_response({})
               


# class TaskUsers(Resource):
#     def post(self):
#         new_task_user = TaskUser()
#         data = request.get_json()
#         task_id = data.get("task_id")
#         user_id = data.get("user_id")
#         task = Task.query.filter(Task.id == task_id).first()
#         user = User.query.filter(User.id == user_id).first()
#         if task and user:
#             try:
#                 for key in data:
#                     setattr(new_task_user,key,data[key])
#                 db.session.add(new_task_user)
#                 db.session.commit()
#                 return make_response(new_task_user.to_dict(),201)
#             except ValueError as error:
#                 new_error= {"errors":["validation errors"]}
#                 return make_response(new_error,400)
#         else:
#             raise ValueError

# class TaskUsersById(Resource):
#     def delete(self,id):
#         task_users = TaskUser.query.filter(TaskUser.id == id).first()
#         if not task_users:
#             return make_response({"error":"TaskUser not found"},404)
#         db.session.delete(task_users)
#         db.session.commit()
#         return make_response({})

# api.add_resource(TaskUsers,"/task_users")
# api.add_resource(TaskUsersById,"/task_users/<int:id>")
api.add_resource(Tasks, "/tasks")
api.add_resource(TasksById, "/tasks/<int:id>")
api.add_resource(Users, "/users")
api.add_resource(UsersById, "/users/<int:id>")
api.add_resource(Customers, "/customers")
api.add_resource(CustomersById, "/customers/<int:id>")
api.add_resource(Contracts, "/contracts")

if __name__ == '__main__':
    app.run(port=5555, debug=True)