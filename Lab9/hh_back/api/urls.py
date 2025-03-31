from django.urls import path
from .views import (
    CompanyList, CompanyDetails,
    VacancyList, VacancyDetails,
    CompanyVacanciesList, VacancyTopList
)

urlpatterns = [
    path('companies/', CompanyList.as_view(), name='company-list'),
    path('companies/<int:id>/', CompanyDetails.as_view(), name='company-details'),
    path('companies/<int:id>/vacancies/', CompanyVacanciesList.as_view(), name='company-vacancies'),
    path('vacancies/', VacancyList.as_view(), name='vacancy-list'),
    path('vacancies/<int:id>/', VacancyDetails.as_view(), name='vacancy-details'),
    path('vacancies/top_ten/', VacancyTopList.as_view(), name='vacancy-top-list')
]