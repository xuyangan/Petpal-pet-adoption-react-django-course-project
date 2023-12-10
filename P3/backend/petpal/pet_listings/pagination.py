from rest_framework.pagination import PageNumberPagination

class PetListingPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100


class PetListingPaginationSmall(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 100