from django.db.models.signals import post_save

def create_profile(instance, sender,created, **kwargs):
    pass
# was previously considering creating a signal for user profile; I'd forgotting that my profile has a profile_image field
