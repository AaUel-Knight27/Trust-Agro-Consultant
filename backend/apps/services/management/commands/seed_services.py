from django.core.management.base import BaseCommand

from ...models import Service

SEED_SERVICES = [
    {
        'title': 'Consulting Services',
        'icon_name': 'ClipboardList',
        'order': 1,
        'short_description': (
            'Professional consulting from small-scale individual farming to large-scale '
            'investment operations.'
        ),
        'full_description': (
            "Our company's primary service is agricultural consulting. We provide "
            'professional support throughout the process for any farming level, starting '
            'from the individual small farming level up to large-scale investment farming. '
            'Our team of veterinary physicians with extensive experience guides clients '
            'through every decision.'
        ),
    },
    {
        'title': 'Training Service',
        'icon_name': 'BookOpen',
        'order': 2,
        'short_description': (
            'Group and individual training for beginner and experienced farmers at all levels.'
        ),
        'full_description': (
            'We train beginner breeders and farmers at all levels, both in groups and '
            'individually. We also provide awareness training to senior farmers and experts '
            'on disease diagnosis, treatment, and modern agricultural practices.'
        ),
    },
    {
        'title': 'Veterinary Medical Service',
        'icon_name': 'Stethoscope',
        'order': 3,
        'short_description': (
            'Vaccine, treatment, and veterinary services across all fields of farming.'
        ),
        'full_description': (
            'As our institute is a combined group of experienced veterinarians, we provide '
            'vaccine administration, disease treatment, and comprehensive veterinary services '
            'in any field of farming. Our veterinary team is equipped to handle poultry, '
            'dairy, and feedlot operations.'
        ),
    },
    {
        'title': 'Animal Feed',
        'icon_name': 'Wheat',
        'order': 4,
        'short_description': (
            'Quality, standard animal feed products free from unnecessary additives.'
        ),
        'full_description': (
            'Our animal feed products are of the highest quality and standard, free from '
            'unnecessary additives or processing. We source and supply feed that meets the '
            'nutritional requirements of various farm animals, ensuring the health and '
            'productivity of your livestock.'
        ),
    },
    {
        'title': 'Sale of Farm Products',
        'icon_name': 'ShoppingBasket',
        'order': 5,
        'short_description': (
            'Chicken, eggs, broilers, and other farm products with full health guarantee.'
        ),
        'full_description': (
            'Our company offers chicken, eggs, broilers, and other farm products. We provide '
            'a full health guarantee for all our chicken products. Our chickens are fully '
            'vaccinated and raised under strict health monitoring conditions.'
        ),
    },
    {
        'title': 'Animal Husbandry Equipment',
        'icon_name': 'Wrench',
        'order': 6,
        'short_description': (
            'Farm equipment for Poultry, Dairy, and Feedlot operations.'
        ),
        'full_description': (
            'We supply a wide range of farm equipment tailored for poultry, dairy, and '
            'feedlot operations. Our equipment selection meets international standards and is '
            'sourced to suit the Ethiopian agricultural context.'
        ),
    },
]


class Command(BaseCommand):
    help = 'Seed default Service records if they do not already exist.'

    def handle(self, *args, **options):
        created_titles = []
        existing_titles = []

        for data in SEED_SERVICES:
            defaults = {
                'short_description': data['short_description'],
                'full_description': data['full_description'],
                'icon_name': data['icon_name'],
                'order': data['order'],
                'is_active': True,
            }
            obj, created = Service.objects.get_or_create(
                title=data['title'],
                defaults=defaults,
            )
            if created:
                created_titles.append(obj.title)
            else:
                existing_titles.append(obj.title)

        self.stdout.write(self.style.SUCCESS('Services seed complete.'))
        if created_titles:
            self.stdout.write(self.style.SUCCESS(f'Created ({len(created_titles)}):'))
            for title in created_titles:
                self.stdout.write(f'  + {title}')
        if existing_titles:
            self.stdout.write(f'Already present ({len(existing_titles)}):')
            for title in existing_titles:
                self.stdout.write(f'  = {title}')

        self.stdout.write('\nAll services (order, title, slug, active):')
        for s in Service.objects.order_by('order', 'id'):
            self.stdout.write(
                f"  [{s.order}] {s.title!r} | slug={s.slug!r} | is_active={s.is_active}"
            )
