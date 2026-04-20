from django.core.management.base import BaseCommand
from apps.core.models import SiteStat, SiteConfig

STATS = [
    {'label': 'Locations', 'value': '10', 'suffix': '+', 'icon_name': 'MapPin', 'order': 1},
    {'label': 'Trained Farmers', 'value': '500', 'suffix': '+', 'icon_name': 'Users', 'order': 2},
    {'label': 'Successful Projects', 'value': '50', 'suffix': '+', 'icon_name': 'CheckCircle2', 'order': 3},
    {'label': 'Years of Experience', 'value': '3', 'suffix': '+', 'icon_name': 'Award', 'order': 4},
]

class Command(BaseCommand):
    help = 'Seed core stats and site config'

    def handle(self, *args, **kwargs):
        for stat_data in STATS:
            SiteStat.objects.get_or_create(
                label=stat_data['label'],
                defaults=stat_data
            )
        SiteConfig.get()  # creates default if not exists
        self.stdout.write(self.style.SUCCESS('Core data seeded successfully.'))
