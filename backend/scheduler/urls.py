from django.urls import path, include
from rest_framework.routers import DefaultRouter
from scheduler.views import EventViewSet, SpeakerViewSet, SessionViewSet, optimized_schedule,register_user, login_view,available_events

router = DefaultRouter()
router.register(r'events', EventViewSet)  
router.register(r'speakers', SpeakerViewSet)
router.register(r'sessions', SessionViewSet)


urlpatterns = [
    path("auth/", login_view),
    path("register/", register_user),
    path("events/optimized/", optimized_schedule, name="optimized-schedule"),
    path("events/available/", available_events, name="available-events"),
    path("", include(router.urls)),  
]

