# Generated by Django 4.1.7 on 2023-04-27 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0002_alter_variant_options'),
        ('product', '0002_remove_product_orderd_product_orderd'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='orderd',
        ),
        migrations.AddField(
            model_name='product',
            name='orderd',
            field=models.ManyToManyField(blank=True, to='service.orderditem'),
        ),
    ]
