# Database

The container describing the database in the state used by the participants.

It consists of the following files:

- [db.sql](./db.sql): The database schema
- [dummy_data.sql](./dummy_data.sql): The data used to fill the database, to simplify testing


In case you want to regenerate the dummy data seen by each participants, run the [generate_data.py](./generate_data.py) script.
