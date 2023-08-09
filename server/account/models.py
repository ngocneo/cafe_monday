from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.conf import settings
import os
# Create your models here.


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=50, null=True, blank=True)
    street1 = models.CharField(max_length=100, null=True, blank=True)
    street2 = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    zipcode = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        verbose_name = "address"

    # ----------------------------------------------------------------------------------

    def natural_key(self):
        return {
            "street": self.street1, "city": self.city, "state": self.state
        }

    def __str__(self):
        return f"{self.street1} | {self.city} | {self.state}"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    PHONE_REGEX = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(
        validators=[PHONE_REGEX], max_length=17, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              upload_to="profile-images")

    def natural_key(self):
        return {
            "name": self.user.get_full_name(),
            "email": self.user.email,
            "phone_number": self.phone_number,
            "image": self.image.url,
        }

    def __str__(self):
        return f"{self.user.get_full_name()}"

    def delete_image(self, *args, **kwargs):
        try:
            os.remove(os.path.join(settings.MEDIA_ROOT, self.image.name))
        except:
            pass
        self.image = None
        self.save()

    def delete(self, *args, **kwargs):
        try:
            os.remove(os.path.join(settings.MEDIA_ROOT, self.image.name))
        except:
            pass
        super(Profile,self).delete(*args,**kwargs)

    def get_image(self):
        if self.image:
            return self.image.url
        else:
            return None


class CustomerNote(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'{self.user.get_full_name()}'
