from extensions import db

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)


    def __repr__(self):
        return f"Song('{self.title}')"