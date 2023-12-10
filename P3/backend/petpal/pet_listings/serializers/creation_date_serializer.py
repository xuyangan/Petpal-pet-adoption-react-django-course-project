from rest_framework import serializers

class CreationDateSerializer(serializers.Serializer):
    date = serializers.DateTimeField()
    count = serializers.IntegerField()