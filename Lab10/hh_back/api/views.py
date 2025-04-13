from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from django.shortcuts import get_object_or_404
from .serializers import CompanySerializer, VacancySerializer
from .models import Company, Vacancy

@api_view(['GET', 'POST'])
def company_list(request):
    if request.method == 'GET':
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def company_details(request, id):
    if request.method == 'GET':
        company = get_object_or_404(Company, id=id)
        serializer = CompanySerializer(company)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        company = get_object_or_404(Company, id=id)
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        company = get_object_or_404(Company, id=id)
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CompanyVacanciesList(APIView):
    def get(self, request, id):
        get_object_or_404(Company, id=id)
        
        vacancies = Vacancy.objects.filter(company_id=id)
        serializer = VacancySerializer(vacancies, many=True)
        return Response(serializer.data)

class VacancyList(APIView):
    def get(self, request):
        sort = request.query_params.get('sort')
        limit = request.query_params.get('limit')
        text = request.query_params.get('text')
        salary_min = request.query_params.get('salary_min')
        salary_max = request.query_params.get('salary_max')
        
        if sort is not None and sort not in ['asc', 'desc']:
            return Response({'error': 'Invalid sort parameter. Use "asc" or "desc"'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            limit = int(limit) if limit is not None else None
        except ValueError:
            return Response({'error': 'Invalid limit parameter'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            salary_min = int(salary_min) if salary_min is not None else None
            salary_max = int(salary_max) if salary_max is not None else None
        except ValueError:
            return Response({'error': 'Invalid salary_min or salary_max parameter'}, status=status.HTTP_400_BAD_REQUEST)
        
        vacancies = Vacancy.objects.all()
        
        if text:
            vacancies = vacancies.filter(
                Q(name__icontains=text) | Q(description__icontains=text)
            )
            
        if salary_min is not None:
            vacancies = vacancies.filter(salary__gte=salary_min)
        if salary_max is not None:
            vacancies = vacancies.filter(salary__lte=salary_max)
        
        if sort is not None:  
            order_by_salary = 'salary' if sort == 'asc' else '-salary'
            vacancies = vacancies.order_by(order_by_salary)
                
        if limit is not None:
            vacancies = vacancies[:limit]
            
        serializer = VacancySerializer(vacancies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = VacancySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VacancyDetails(APIView):
    def get(self, request, id):
        vacancy = get_object_or_404(Vacancy, id=id)
        serializer = VacancySerializer(vacancy)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, id):
        vacancy = get_object_or_404(Vacancy, id=id)
        serializer = VacancySerializer(vacancy, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        vacancy = get_object_or_404(Vacancy, id=id)
        vacancy.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)