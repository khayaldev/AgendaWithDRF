from django.urls import path
from .views import taskList,taskDetail,taskCreate,taskUpdate,taskDelete
urlpatterns = [
  path('all/',taskList, name='task-list'),
  path('<int:pk>/',taskDetail, name='task-detail'),
  path('new/',taskCreate, name='task-create'),
  path('<int:pk>/update/',taskUpdate, name='task-update'),
  path('<int:pk>/delete/',taskDelete, name='task-delete')
]

