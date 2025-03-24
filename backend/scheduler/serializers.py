from rest_framework import serializers
from .models import Event, Speaker, Session

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'location']  

class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = ['id', 'name','availability','days']  

class SessionSerializer(serializers.ModelSerializer):

    event = serializers.SlugRelatedField(
        queryset=Event.objects.all(),
        slug_field="title",
        write_only=True  
    )
    speaker = serializers.SlugRelatedField(
        queryset=Speaker.objects.all(),
        slug_field="name",
        write_only=True  
    )

    event_details = EventSerializer(source="event", read_only=True)  
    speaker_details = SpeakerSerializer(source="speaker", read_only=True)  

    class Meta:
        model = Session
        fields = ["id", "event", "speaker", "title", "start_time", "end_time"]



    def create(self, validated_data):
        event_title = validated_data.pop("event")
        speaker_name = validated_data.pop("speaker")

        event = Event.objects.get(title=event_title) 
        speaker = Speaker.objects.get(name=speaker_name)  
        session = Session.objects.create(event=event, speaker=speaker, **validated_data)
        return session

    def update(self, instance, validated_data):
        if "event" in validated_data:
            event_title = validated_data.pop("event")
            instance.event = Event.objects.get(title=event_title)  
        
        if "speaker" in validated_data:
            speaker_name = validated_data.pop("speaker")
            instance.speaker = Speaker.objects.get(name=speaker_name)  

        return super().update(instance, validated_data)

    class Meta:
        model = Session
        fields = "__all__"