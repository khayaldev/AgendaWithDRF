from django.db import models

# Create your models here.
class Task(models.Model):
  title=models.CharField(max_length=250)
  description=models.TextField(blank=True,null=True)
  completed=models.BooleanField(default=False)
  
  def __str__(self):
    return self.title