from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import CompanySerializer, VacancySerializer
from .models import Company, Vacancy

class CompanyList(APIView):
    def get(self, request):
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)

class CompanyDetails(APIView):
    def get(self, request, id):
        company = get_object_or_404(Company, id=id)
        serializer = CompanySerializer(company)
        return Response(serializer.data)

class CompanyVacanciesList(APIView):
    def get(self, request, id):
        get_object_or_404(Company, id=id)
        
        vacancies = Vacancy.objects.filter(company_id=id)
        serializer = VacancySerializer(vacancies, many=True)
        return Response(serializer.data)

class VacancyList(APIView):
    def get(self, request):
        vacancies = Vacancy.objects.all()
        serializer = VacancySerializer(vacancies, many=True)
        return Response(serializer.data)

class VacancyDetails(APIView):
    def get(self, request, id):
        vacancy = get_object_or_404(Vacancy, id=id)
        serializer = VacancySerializer(vacancy)
        return Response(serializer.data)

class VacancyTopList(APIView):
    def get(self, request):
        num = 10
        vacancies = Vacancy.objects.all().order_by('-salary')[:num]
        serializer = VacancySerializer(vacancies, many=True)
        return Response(serializer.data)
