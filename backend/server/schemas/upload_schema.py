from marshmallow import Schema, fields
from server.schemas.user_schema import UserSchema

class UploadSchema(Schema):
    id = fields.Int(dump_only=True)
    filename = fields.Str(required=True)
    size = fields.Float(required=True)
    timestamp = fields.DateTime(dump_only=True)
    user_id = fields.Int(required=True)

    user = fields.Nested(UserSchema, dump_only=True)
    #allocations = fields.List(fields.Nested('AllocationSchema'), dump_only=True)    

"""
from marshmallow import Schema, fields
from server.models import User
from server.models.schemas.user_schema import UserSchema  

class UploadSchema(Schema):
    id = fields.Int(dump_only=True)
    filename = fields.Str(required=True)
    size = fields.Float(required=True)
    timestamp = fields.DateTime(dump_only=True)
    user_id = fields.Int(required=True)

    
    user = fields.Nested(UserSchema, dump_only=True)
"""