"""set_new_pwd

Revision ID: da86e7d74f6f
Revises: d2a637c530c7
Create Date: 2024-08-08 20:11:02.075703

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'da86e7d74f6f'
down_revision = 'd2a637c530c7'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('IGS_USERS', sa.Column('is_pwd_set', sa.BOOLEAN(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('IGS_USERS', 'is_pwd_set')
    # ### end Alembic commands ###
