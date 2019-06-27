from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.core import serializers
from .models import table
import json

# Create your views here.
def home(request):
    return render(request, 'home.html')

def content(request, table_pk, *args, **kargs):
    context = {
        'entry': get_object_or_404(table, pk=table_pk)
    }
    return render(request, 'content.html', context)

def get_table(request):
    results = table.objects.all()
    jsondata = serializers.serialize('json',results)
    return HttpResponse(jsondata)