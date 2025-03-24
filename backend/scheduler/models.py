from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# Create your models here.

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Speaker(models.Model):
    name = models.CharField(max_length=255)
    availability = models.CharField(max_length=255)  
    days = models.JSONField(default=list)

    def __str__(self):
        return self.name

class Session(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='sessions')
    title = models.CharField(max_length=255)
    start_time = models.TimeField()
    end_time = models.TimeField()
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE, related_name='sessions')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.event.title})"

    def clean(self):
        overlapping_sessions = Session.objects.filter(
            event=self.event,
            start_time__lt=self.end_time,
            end_time__gt=self.start_time
        ).exclude(id=self.id)
        if overlapping_sessions.exists():
            raise ValidationError("Session times cannot overlap within the same event.")
        
        conflicting_sessions = Session.objects.filter(
            speaker=self.speaker,
            start_time__lt=self.end_time,
            end_time__gt=self.start_time
        ).exclude(id=self.id)
        if conflicting_sessions.exists():
            raise ValidationError("Speaker is already booked for another session at this time.")
