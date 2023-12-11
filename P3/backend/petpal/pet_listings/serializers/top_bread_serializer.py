from rest_framework import serializers

class TopBreedsChartSerializer(serializers.Serializer):
    breed = serializers.CharField()
    count = serializers.IntegerField()

    # Define other necessary fields and methods
