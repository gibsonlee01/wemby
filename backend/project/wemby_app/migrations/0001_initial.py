# Generated by Django 4.2.3 on 2024-07-22 04:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, null=True)),
                ('gender', models.CharField(max_length=1, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_pictures/')),
                ('instagram_id', models.CharField(blank=True, max_length=100, null=True)),
                ('likes', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]
