# Generated by Django 2.2.4 on 2019-09-06 15:08

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    atomic = False
    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='post',
            name='pub_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
