from rest_framework import serializers
from myagenda.models import Task

class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model=Task
    fields="__all__"