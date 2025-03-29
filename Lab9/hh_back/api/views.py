from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import CompanySerializer, VacancySerializer
from .models import Company, Vacancy

@api_view(['GET'])
def company_list(request):
    companies = Company.objects.all()
    serializer = CompanySerializer(companies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def company_details(request, id):
    company = get_object_or_404(Company, id=id)
    serializer = CompanySerializer(company)
    return Response(serializer.data)

@api_view(['GET'])
def company_vacancies_list(request, id):
    get_object_or_404(Company, id=id)
    
    vacancies = Vacancy.objects.filter(company_id=id)
    serializer = VacancySerializer(vacancies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def vacancy_list(request):
    vacancies = Vacancy.objects.all()
    serializer = VacancySerializer(vacancies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def vacancy_details(request, id):
    vacancy = get_object_or_404(Vacancy, id=id)
    serializer = VacancySerializer(vacancy)
    return Response(serializer.data)

@api_view(['GET'])
def vacancy_top_list(request):
    num = 10
    vacancies = Vacancy.objects.all().order_by('-salary')[:num]
    serializer = VacancySerializer(vacancies, many=True)
    return Response(serializer.data)
