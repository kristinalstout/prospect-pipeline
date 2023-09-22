from models import db, Task, User, Contract, Customer, Assignee
from flask_migrate import Migrate
from flask import Flask, request, make_response
from flask_restful import Api, Resource
import os
from flask_cors import CORS
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app,origins=['http://localhost:3000','http://localhost:5555'])

migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)
app.secret_key = "4407ed85a7a5c14bc7fc216485d66c4dc354666d37760efcefa4c23d15add373"


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

db.init_app(app)
api = Api(app)

@app.route('/')
def home():
    return '<h1>Prospect Pipeline Server</h1>'

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data["username"]
        password = data["password"]
        user = User.query.filter(User.username==username).first()
        if user:
            if password == user.password:
                login_user(user, remember=True)
                print(user.to_dict())
                return make_response(user.to_dict(),200)
            else:
                return make_response({"error":"Incorrect Password"},404)
        else:
            return make_response({"error":"Incorrect username"},404)

class Logout(Resource):
    @login_required
    def post(self):
        logout_user()
        return make_response('',204)
    
class CurrentUser(Resource):
    @login_required
    def get(self):
        return make_response(current_user.to_dict(),)

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
        users = [user.to_dict(rules=("-tasks.users",))for user in User.query.all()]
        return make_response(users,200)
    
    def post(self):
        new_user= User()
        data = request.get_json()
        try:
            for key in data:
                setattr(new_user,key,data[key])
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(rules=("-tasks.users",)),201)
        except ValueError as error:
            new_error={"error":str(error)}
        return make_response(new_error,400)
    
class UsersById(Resource):
    def get(self,id):
        users = User.query.filter(User.id == id).first()
        if not users:
            return make_response({"error":"User not found"},404)
        return make_response(users.to_dict(rules=("-tasks.users",)),200)
    
class Tasks(Resource):
    def get(self):
        tasks = [task.to_dict(rules=("-users.tasks","-contract.tasks",))for task in Task.query.all()]
        return make_response(tasks, 200)

    def post(self):
        new_task= Task()
        data = request.get_json()
        try:
            for key in data:
                setattr(new_task,key,data[key])
            db.session.add(new_task)
            db.session.commit()
            return make_response(new_task.to_dict(rules=("-users.tasks","-contract.tasks",)),201)
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
        edit_task = Task.query.filter(Task.id == id).first()
        if not edit_task:
            return make_response({"error":"Task not found"},404)
        data = request.get_json()
        try:
            for key in data:
                setattr(edit_task, key, data[key])
                db.session.add(edit_task)
                db.session.commit()
                return make_response(edit_task.to_dict(rules=("-users.tasks","-contract.tasks",)),200)
        except ValueError as error:
            new_error = {"error": str(error)}
            return make_response(new_error,400)
            
    def delete(self, id):
        task = Task.query.filter(Task.id == id).first()
        if not task:
            return make_response({"error":"Task not found"},404)
        db.session.delete(task)
        db.session.commit()
        return make_response({},200)

api.add_resource(Tasks, "/tasks")
api.add_resource(TasksById, "/tasks/<int:id>")
api.add_resource(Users, "/users")
api.add_resource(UsersById, "/users/<int:id>")
api.add_resource(Customers, "/customers")
api.add_resource(CustomersById, "/customers/<int:id>")
api.add_resource(Contracts, "/contracts")
api.add_resource(Login,"/login")
api.add_resource(Logout,"/logout")
api.add_resource(CurrentUser,"/current_user")

if __name__ == '__main__':
    app.run(port=5555, debug=True)