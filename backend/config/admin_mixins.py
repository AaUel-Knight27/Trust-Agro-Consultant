"""Admin mixins shared across apps."""


class AutoSlugAdminMixin:
    """
    Slug is generated on save; never collect it on "add".

    On add: slug is omitted from the form so it is not shown as required.
    On change: slug is read-only so URLs stay stable but users cannot edit it here.
    """

    slug_field = 'slug'

    def get_readonly_fields(self, request, obj=None):
        ro = list(super().get_readonly_fields(request, obj))
        if obj is not None and self.slug_field not in ro:
            ro.append(self.slug_field)
        return ro

    def get_fields(self, request, obj=None):
        fields = list(super().get_fields(request, obj))
        if obj is None:
            return [f for f in fields if f != self.slug_field]
        return fields
