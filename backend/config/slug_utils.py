import secrets
import string

from django.utils.text import slugify

_SUFFIX_LEN = 6
_ALPHANUM = string.ascii_letters + string.digits


def generate_unique_slug_from_title(
    title: str,
    model_class,
    *,
    exclude_pk=None,
    max_length: int = 128,
) -> str:
    """Build unique slug for ``model_class``, trying clean slug first."""
    base = slugify(title) or 'item'
    reserve = _SUFFIX_LEN + 1
    max_base = max(1, max_length - reserve)
    if len(base) > max_base:
        base = base[:max_base].rstrip('-')

    # 1. Try the clean base slug first
    qs = model_class.objects.filter(slug=base)
    if exclude_pk is not None:
        qs = qs.exclude(pk=exclude_pk)
    if not qs.exists():
        return base

    # 2. If base exists, append random suffix
    while True:
        suffix = ''.join(secrets.choice(_ALPHANUM) for _ in range(_SUFFIX_LEN))
        candidate = f'{base}-{suffix}'
        qs = model_class.objects.filter(slug=candidate)
        if exclude_pk is not None:
            qs = qs.exclude(pk=exclude_pk)
        if not qs.exists():
            return candidate
