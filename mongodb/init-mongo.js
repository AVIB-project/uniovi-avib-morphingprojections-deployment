db.createUser({
    user: "avib",
    pwd: "password",
    roles: [
      {
        role: "dbOwner",
        db: "configuration"
      }
    ]
  })

db.createCollection("organization")
db.createCollection("project")
db.createCollection("image")
db.createCollection("annotation")
db.createCollection("case")
db.createCollection("resource")
db.createCollection("job")
db.createCollection("user")
db.createCollection("user_organization")