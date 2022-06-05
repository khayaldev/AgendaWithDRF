from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from myagenda.models import Task
from .serializers import TaskSerializer

#List All Tasks in our agenda
@api_view(['GET'])
def taskList(request):
  tasks=Task.objects.all().order_by('-id')
  serializer=TaskSerializer(tasks,many=True)
  return Response(serializer.data)

#List individual task in agenda
@api_view(['GET'])
def taskDetail(request,pk):
  task=Task.objects.get(pk=pk)
  serializer=TaskSerializer(task)
  return Response(serializer.data)
 
#Create new task   
@api_view(['POST'])  
def taskCreate(request):
  serializer=TaskSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)
  
  
#Update existing task
@api_view(['PUT','POST'])  
def taskUpdate(request,pk):
  task=Task.objects.get(pk=pk)
  serializer=TaskSerializer(instance=task,data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)



#delete existing todo
@api_view(['DELETE'])
def taskDelete(request,pk):
  task=Task.objects.get(pk=pk)
  task.delete()
  return Response(status=status.HTTP_204_NO_CONTENT)