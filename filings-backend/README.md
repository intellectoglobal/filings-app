# Getting started with FastAPI

This project is build with FastAPI

**Documentation**: <a href="https://fastapi.tiangolo.com" target="_blank">https://fastapi.tiangolo.com</a>

**Source Code**: <a href="https://github.com/tiangolo/fastapi" target="_blank">https://github.com/tiangolo/fastapi</a>

## Requirements

Use this command to install the requirements:

### `pip install -r requirements.txt`

We use Uvicorn ASGI server to run this FastAPI application.

**Documentation**: <a href="https://www.uvicorn.org/" target="_blank">https://www.uvicorn.org/</a>

Use the following command to run the application:

### `uvicorn main:app --reload`

The server should reload automatically (because you added --reload to the uvicorn command above).

### Interactive API docs

Now go to <a href="http://localhost:8000/docs" class="external-link" target="_blank">http://localhost:8000/docs</a>.

This interactive API documentation is provided by Swagger UI:

**Documentation**: <a href="https://swagger.io/tools/swagger-ui/" target="_blank">https://swagger.io/tools/swagger-ui/</a>

### Alternative API docs

And now, go to <a href="http://localhost:8000/redoc" class="external-link" target="_blank">http://localhost:8000/redoc</a>.

You will see the alternative automatic documentation

# Database Configuration

## To change the database credentials:

In the db.env file which is in this directory:

F:\IGS\filings-app\filings-backend\app\src\db.env

## Change the value of the variables with your database credentials in db.env file.

DB_USER = **\*\***
DB_PASS = **\*\***
DB_HOST = localhost
DB_NAME = fdb

# Alembic

Steps to be followed to migrate the changes in models to database:

### `alembic revision --autogenerate -m 'changes made as a message`.

The above command will create a revision file in 'alembic/versions' directory.

(optional)

### `alembic upgrade head --sql`.

This command will list out the sql queries that is going to be applied. use this command to make sure the changes are correct before making migrations.

### `alembic upgrade head`.

this command will migrate the changes into database.

If you're getting this error while running `alembic upgrade head` command:

### FAILED: Target database is not up to date.

Use the following command to use the current state of database to migrate:

### `alembic stamp head`

Then run the `alembic upgrade head` to migrate.

While running `alembic revision --autogenerate -m 'changes made as a message` command. If you get the following error:

## FAILED: Can't locate revision identified by 'revision number'

use this command to set the revision number

### `alembic revision --rev-id=revision number`

then run the `alembic revision --autogenerate -m 'changes made as a message` command again.
