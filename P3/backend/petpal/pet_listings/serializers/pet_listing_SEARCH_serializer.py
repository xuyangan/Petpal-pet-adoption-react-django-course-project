from rest_framework import serializers
from pet_listings.models import PetListing

class PetListingQuerySerializer(serializers.ModelSerializer):
    AVAILABLE = 'available'
    ADOPTED = 'adopted'
    PENDING = 'pending'
    WITHDRAWN = 'withdrawn'
    STATUS_CHOICES = [
        (AVAILABLE, 'available'),
        (ADOPTED, 'adopted'),
        (PENDING, 'pending'),
        (WITHDRAWN, 'withdrawn'),
    ]

    FEMALE = 'female'
    MALE = 'male'
    GENDER_CHOICES = [
        (FEMALE, 'female'),
        (MALE, 'male'),
    ]

    shelter_name = serializers.CharField(
        required=False,
        help_text="Filter by shelter name",
        )
    breed = serializers.CharField(
        required=False,
        help_text="Filter by breed",
        )
    status = serializers.CharField(
        required=False,
        help_text="Filter by status",
        default=AVAILABLE
        )
    size = serializers.IntegerField(
        required=False,
        help_text="Filter by size",
        )
    max_age = serializers.IntegerField(
        required=False,
        help_text="Filter by max age"
    )
    min_age = serializers.IntegerField(
        required=False,
        help_text="Filter by min age"
    )
    colour = serializers.CharField(
        required=False,
        help_text="Filter by colour"
    )
    gender = serializers.CharField(
        required=False,
        help_text="Filter by gender"
    )
    sort_by_age = serializers.BooleanField(
        required=False,
        help_text="Sort by age",
    )
    sort_by_name = serializers.BooleanField(
        required=False,
        help_text="Sort by name",
    )
    sort_by_size = serializers.BooleanField(
        required=False,
        help_text="Sort by size",
    )
    sort_in_desc = serializers.BooleanField(
        required=False,
        help_text="Sort in descending order",
    )

    class Meta:
        model = PetListing
        # fields = '__all__'
        fields = ['shelter_name',
                  'breed', 
                  'status', 
                  'size', 
                  'max_age',
                  'min_age',
                  'colour', 
                  'gender', 
                  'sort_by_age', 
                  'sort_by_name', 
                  'sort_by_size', 
                  'sort_in_desc']