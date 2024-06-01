class FailedCondition(Exception):
    def __init__(self, message="Bad Request - Failed Condition"):
        self.message = message
        super().__init__(self.message)

    def get_status_code(self):
        return 400


class InvalidArgument(Exception):
    def __init__(self, message="Bad Request - Invalid Argument"):
        self.message = message
        super().__init__(self.message)

    def get_status_code(self):
        return 400


class AlreadyExists(Exception):
    def __init__(self, message="Bad Request - Already Exists"):
        self.message = message
        super().__init__(self.message)

    def get_status_code(self):
        return 400


class NotAllowed(Exception):
    def __init__(self, message="Not Allowed"):
        self.message = message
        super().__init__(self.message)

    def get_status_code(self):
        return 403
    

class NotExist(Exception):
    def __init__(self, message="Does not exists"):
        self.message = message
        super().__init__(self.message)

    def get_status_code(self):
        return 404


class InternalServerError(Exception):
    def __init__(self, message="Internal Server Error"):
        self.message = message
        super().__init__(self.message)

    def get_status_code(self):
        return 500
