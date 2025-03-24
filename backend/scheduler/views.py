from django.shortcuts import render
from .serializers import SpeakerSerializer
from rest_framework import viewsets, permissions
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_200_OK
from django.contrib.auth.models import User
from .models import Event, Speaker, Session
from .serializers import EventSerializer, SpeakerSerializer, SessionSerializer
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

class SpeakerViewSet(viewsets.ModelViewSet):
    queryset = Speaker.objects.all()
    serializer_class = SpeakerSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.select_related("event", "speaker").all()  
    serializer_class = SessionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]  



class SpeakerViewSet(viewsets.ModelViewSet):
    queryset = Speaker.objects.all()
    serializer_class = SpeakerSerializer
    authentication_classes = [TokenAuthentication] 
    permission_classes = [permissions.IsAuthenticated]  


@api_view(['POST'])
@permission_classes([AllowAny])  
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password required'}, status=HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    token, _ = Token.objects.get_or_create(user=user)

    return Response({'token': token.key}, status=HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])  
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Both username and password are required"}, status=HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if not user:
        return Response({"error": "Invalid credentials"}, status=HTTP_400_BAD_REQUEST)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key}, status=HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def optimized_schedule(request):
    print("Optimized Schedule API hit")
    
    events = Event.objects.all()
    schedule = []

    for event in events:
        sessions = Session.objects.filter(event=event).order_by("start_time")
        session_data = [
            {
                "title": session.title,
                "start_time": session.start_time.strftime("%H:%M"),
                "end_time": session.end_time.strftime("%H:%M"),
                "speaker": session.speaker.name if session.speaker else "N/A"
            }
            for session in sessions
        ]

        schedule.append({"event": event.title, "sessions": session_data})

    return Response(schedule)

@api_view(["GET"])
@permission_classes([IsAuthenticated])  
def available_events(request):
    events = Event.objects.all()  
    
    print("All Events:", events)  
    available = events.filter(sessions__isnull=True)  
    
    print("Available Events:", available) 

    serializer = EventSerializer(available, many=True)
    return Response(serializer.data)

