from api.users.models import User

from .exceptions import NotAllowed


def check_specific_right(user: User, allow_right: str) -> bool:
    user_rights = {right.name for right in user.group.rights.all()}
    if allow_right in user_rights:
        return True
    return False


def validate_user_rights(user: User, allow_rights: set()):
    user_rights = {right.name for right in user.group.rights.all()}
    for user_right in user_rights:
        if user_right in allow_rights:
            return
    raise NotAllowed("user right not allowed")


def dictfetchall(cursor):
    """
    Return all rows from a cursor as a dict.
    Assume the column names are unique.
    """
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]
