from django.urls import path
from .views import (
    product_list, product_details,
    category_list, category_details,
    category_products_list
)

urlpatterns = [
    path('products/', product_list, name='product-list'),
    path('products/<int:id>/', product_details, name='product-details'),
    path('categories/', category_list, name='category-list'),
    path('categories/<int:id>/', category_details, name='category-details'),
    path('categories/<int:id>/products/', category_products_list, name='category-products'),
]