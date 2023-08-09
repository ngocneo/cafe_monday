from django.contrib import admin

from .models import Address, Profile, CustomerNote


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'country',
        'street1',
        'street2',
        'city',
        'zipcode',
        'state',
    )
    list_filter = ('user',)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'image')
    list_filter = ('user',)


@admin.register(CustomerNote)
class CustomerNoteAdmin(admin.ModelAdmin):
    list_display = (
        'customer',
        'date',
        'description',
    )
