from django.urls import path
from .views import (
    company_list, company_details,
    VacancyList, VacancyDetails,
    CompanyVacanciesList
)

urlpatterns = [
    path('companies/', company_list, name='company-list'),
    path('companies/<int:id>/', company_details, name='company-details'),
    path('companies/<int:id>/vacancies/', CompanyVacanciesList.as_view(), name='company-vacancies'),
    path('vacancies/', VacancyList.as_view(), name='vacancy-list'),
    path('vacancies/<int:id>/', VacancyDetails.as_view(), name='vacancy-details'),
]