from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})


db = SQLAlchemy(metadata=metadata)


class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    phone_number = db.Column(db.Integer)

    # # Add relationship
    # contract = db.relationship("Contract", cascade="all, delete", backref = "customer")

    # # Add serialization
    serialize_rules = ("-contract.customer",)

    # Add validation
    @validates("name")
    def validate_name(self, key, name):
        if len(name) <=0:
            raise ValueError("Name is required")
        return name
    
    @validates("address")
    def validate_address(self, key, address):
        if len(address) <=0:
            raise ValueError("Address is required")
        return address
    
    @validates("phone_number")
    def validate_phone_number(self, key, phone_number):
        if len(str(phone_number))!=10 and phone_number !=int:
            raise ValueError("A phone number must be 10 digits")
        return phone_number
    
    def __repr__(self):
        return f'<Customer {self.id}>'


class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    # email = db.Column(db.String)
    # role = db.Column(db.String)

    # Add relationship
    tasks = db.relationship("Task", secondary="assignees", back_populates= "users")

    # assignee_id = db.Column(db.Integer, db.ForeignKey("assignees.id"))
    # Add serialization
    serialize_rules = ("-tasks.users",)

    # Add validation
    @validates("email")
    def validate_email(self, key, email):
        if len(email) <=0:
            raise ValueError("Email is required")
        return email
    
    @validates("password")
    def validate_password(self, key, password):
        if len(password) <=0:
            raise ValueError("Password is required")
        return password
    
    def __repr__(self):
        return f'<User {self.id}>'

class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)
    due_date = db.Column(db.String)
    priority = db.Column(db.String)
    status = db.Column(db.String)
    # assignees, status should have default values
    
    # Add relationship
    
    # assignees
    users = db.relationship("User", secondary="assignees", back_populates= "tasks")
    # assignee_id = db.Column(db.Integer, db.ForeignKey("assignees.id"))
    contract_id = db.Column(db.Integer, db.ForeignKey("contracts.id"))

    # Add serialization
    serialize_rules = ("-users.tasks","-contract.tasks",)

    # Add validation
    @validates("description")
    def validate_description(self, key, description):
        if len(description) <=0:
            raise ValueError("Description is required")
        return description
    
    @validates("contract")
    def validate_contract(self, key, contract):
        if len(contract) <=0:
            raise ValueError("Contract is required")
        return contract
    
    def __repr__(self):
        return f'<Task {self.id}>'


class Contract(db.Model, SerializerMixin):
    __tablename__ = 'contracts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address= db.Column(db.String)
    phone_number = db.Column(db.Integer)

    # Add relationship
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))
    tasks= db.relationship("Task", cascade="all, delete", backref="contract")

    # Add serialization
    serialize_rules = ("-tasks.contract",)
    "-customer.contract"
    # Add validation
    @validates("name")
    def validate_name(self, key, name):
        if len(name) <=0:
            raise ValueError("Name is required")
        return name
    
    def __repr__(self):
        return f'<Contract {self.id}>'

class Assignee(db.Model, SerializerMixin):
    __tablename__ = 'assignees'

    id = db.Column(db.Integer, primary_key=True)

    # Add relationships
    task_id = db.Column(db.Integer, db.ForeignKey("tasks.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # Add serialization
    serialize_rules = ("-task.assignees","-user.assignees",)
