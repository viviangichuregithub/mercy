from marshmallow import Schema, fields
from server.schemas.upload_schema import UploadSchema
from server.schemas.storage_node_schema import StorageNodeSchema
from server.models.allocation import Allocation
from server.extensions import ma

class AllocationSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Allocation
        load_instance = True

    id = ma.auto_field()
    upload_id = ma.auto_field()
    storage_node_id = ma.auto_field()
    allocated_size = ma.auto_field()

    upload = fields.Nested(UploadSchema, dump_only=True)
    storage_node = fields.Nested(StorageNodeSchema, dump_only=True)