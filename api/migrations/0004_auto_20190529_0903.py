# Generated by Django 2.1.5 on 2019-05-29 12:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20190529_0902'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='assignment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='api.Assignment'),
        ),
    ]
