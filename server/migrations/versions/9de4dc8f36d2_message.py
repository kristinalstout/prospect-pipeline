"""message

Revision ID: 9de4dc8f36d2
Revises: 6b1b8bd39861
Create Date: 2023-09-22 03:13:55.806647

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9de4dc8f36d2'
down_revision = '6b1b8bd39861'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.drop_constraint('fk_tasks_creator_users', type_='foreignkey')
        batch_op.drop_column('creator')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('creator', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_tasks_creator_users', 'users', ['creator'], ['id'])

    # ### end Alembic commands ###