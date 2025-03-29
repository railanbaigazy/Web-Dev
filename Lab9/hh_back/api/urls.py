from django.urls import path
from .views import (
    company_list, company_details, company_vacancies_list,
    vacancy_list, vacancy_details, vacancy_top_list
)

urlpatterns = [
    path('companies/', company_list, name='company-list'),
    path('companies/<int:id>/', company_details, name='company-details'),
    path('companies/<int:id>/vacancies/', company_vacancies_list, name='company-vacancies'),
    path('vacancies/', vacancy_list, name='vacancy-list'),
    path('vacancies/<int:id>/', vacancy_details, name='vacancy-details'),
    path('vacancies/top_ten/', vacancy_top_list, name='vacancy-top-list')
]