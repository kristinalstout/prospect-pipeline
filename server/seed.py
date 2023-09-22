from random import randint, choice as rc

from faker import Faker


from app import app
from models import db, Task, User, Contract, Customer, Assignee

fake = Faker()

def create_user():
    li = []
    for i in range(10):
        u = User(username=fake.user_name(),
                password="123",
                # email=fake.email(),
                # role=fake.name()
        )
        li.append(u)
    return li

def create_customer():
    li = []
    for i in range(10):
        c = Customer(name=fake.user_name(),
                     address = "569 Pike Place",
                     phone_number = 2223334444
        )
        li.append(c)
    return li

def create_contract():
    li = []
    for i in range(8):
        co = Contract(name=fake.user_name(),
                      address = "560 Pike Place",
                      phone_number = 2223334444,
                    #   customer_id = rc(customers).id
        )
        li.append(co)
    return li

def create_task(contracts):
    li = []
    for i in range(10):
        t = Task(description=fake.paragraph(),
                 due_date="10/20/23",
                 priority = "high",
                 status="not complete",
                 contract_id = rc(contracts).id
        )
        li.append(t)
    return li

def assign_task(users,tasks):
    for i in range(5):
        rc(tasks).users.append(rc(users))

if __name__ == '__main__':
    with app.app_context():
        print("clearing db")
        User.query.delete()
        Customer.query.delete()
        Contract.query.delete()
        Task.query.delete()
        Assignee.query.delete()

        print("creating users...")
        users = create_user()
        print("creating customers...")
        customers = create_customer()

        db.session.add_all(users)
        db.session.commit()
        db.session.add_all(customers)
        db.session.commit()

        print("creating contracts...")
        contracts = create_contract()
        db.session.add_all(contracts)
        db.session.commit()
        print("creating tasks...")
        tasks = create_task(contracts)
       
        db.session.add_all(tasks)
        db.session.commit()

        assign_task(users,tasks)
        db.session.commit()


