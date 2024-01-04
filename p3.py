#!/usr/bin/python3

import sqlite3

conn = sqlite3.connect('playlist.db')

create_table_query = ''' 
CREATE TABLE song(
    title TEXT NOT NULL
    
);
'''

conn.cursor().execute(create_table_query)
conn.commit()

conn.close()