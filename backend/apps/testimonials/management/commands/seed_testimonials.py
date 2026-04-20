from django.core.management.base import BaseCommand
from apps.testimonials.models import Testimonial

TESTIMONIALS = [
    {
        'full_name': 'Tana Fiberglass Industry',
        'role': 'Corporate Partner',
        'organization': 'Tana Fiberglass Industry',
        'message': 'Trust Agro Consult provided exceptional guidance for our livestock facilities. Their expertise in animal husbandry equipment selection saved us significant time and investment.',
        'rating': 5,
        'is_featured': True,
        'order': 1,
    },
    {
        'full_name': 'Kinn Ethiopia Association',
        'role': 'NGO Partner',
        'organization': 'Kinn Ethiopia Association',
        'message': 'The training programs delivered by Trust Agro have transformed how our community members approach farming. Practical, clear, and impactful.',
        'rating': 5,
        'is_featured': True,
        'order': 2,
    },
    {
        'full_name': 'Redeem The Generation NGO',
        'role': 'Community Partner',
        'organization': 'Redeem The Generation NGO',
        'message': 'Working with Trust Agro Consult has been a remarkable experience. Their veterinary team is responsive, knowledgeable, and deeply committed to the success of local farmers.',
        'rating': 5,
        'is_featured': True,
        'order': 3,
    },
]

class Command(BaseCommand):
    help = 'Seed testimonials'

    def handle(self, *args, **kwargs):
        for t in TESTIMONIALS:
            Testimonial.objects.get_or_create(full_name=t['full_name'], defaults=t)
        self.stdout.write(self.style.SUCCESS('Testimonials seeded.'))
