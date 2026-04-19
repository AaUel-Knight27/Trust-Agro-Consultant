from django.core.management.base import BaseCommand
from django.utils.timezone import now
from ...models import Service
from apps.blog.models import ContentType, ContentCategory, Post
from apps.team.models import TeamMember

class Command(BaseCommand):
    help = 'Seed initial data for Trust Agro'

    def handle(self, *args, **options):
        self.seed_services()
        self.seed_blog_data()
        self.seed_team_members()
        self.stdout.write(self.style.SUCCESS('\nAll data seeded successfully!'))

    def seed_services(self):
        self.stdout.write('Seeding Services...')
        services_data = [
            {
                "title": "Consulting Services",
                "icon_name": "ClipboardList",
                "order": 1,
                "short_description": "Professional consulting from small-scale individual farming to large-scale investment operations.",
                "full_description": "Our company's primary service is agricultural consulting. We provide professional support throughout the process for any farming level, starting from the individual small farming level up to large-scale investment farming. Our team of veterinary physicians with extensive experience guides clients through every decision."
            },
            {
                "title": "Training Service",
                "icon_name": "BookOpen",
                "order": 2,
                "short_description": "Group and individual training for beginner and experienced farmers at all levels.",
                "full_description": "We train beginner breeders and farmers at all levels, both in groups and individually. We also provide awareness training to senior farmers and experts on disease diagnosis, treatment, and modern agricultural practices."
            },
            {
                "title": "Veterinary Medical Service",
                "icon_name": "Stethoscope",
                "order": 3,
                "short_description": "Vaccine, treatment, and veterinary services across all fields of farming.",
                "full_description": "As our institute is a combined group of experienced veterinarians, we provide vaccine administration, disease treatment, and comprehensive veterinary services in any field of farming. Our veterinary team is equipped to handle poultry, dairy, and feedlot operations."
            },
            {
                "title": "Animal Feed",
                "icon_name": "Wheat",
                "order": 4,
                "short_description": "Quality, standard animal feed products free from unnecessary additives.",
                "full_description": "Our animal feed products are of the highest quality and standard, free from unnecessary additives or processing. We source and supply feed that meets the nutritional requirements of various farm animals, ensuring the health and productivity of your livestock."
            },
            {
                "title": "Sale of Farm Products",
                "icon_name": "ShoppingBasket",
                "order": 5,
                "short_description": "Chicken, eggs, broilers, and other farm products with full health guarantee.",
                "full_description": "Our company offers chicken, eggs, broilers, and other farm products. We provide a full health guarantee for all our chicken products. Our chickens are fully vaccinated and raised under strict health monitoring conditions."
            },
            {
                "title": "Animal Husbandry Equipment",
                "icon_name": "Wrench",
                "order": 6,
                "short_description": "Farm equipment for Poultry, Dairy, and Feedlot operations.",
                "full_description": "We supply a wide range of farm equipment tailored for poultry, dairy, and feedlot operations. Our equipment selection meets international standards and is sourced to suit the Ethiopian agricultural context."
            }
        ]

        created_count = 0
        for data in services_data:
            service, created = Service.objects.get_or_create(
                title=data['title'],
                defaults={
                    'icon_name': data['icon_name'],
                    'order': data['order'],
                    'short_description': data['short_description'],
                    'full_description': data['full_description'],
                    'is_active': True
                }
            )
            if created:
                created_count += 1
                self.stdout.write(f"  + Created Service: {service.title}")
            else:
                self.stdout.write(f"  = Service already exists: {service.title}")

    def seed_blog_data(self):
        self.stdout.write('\nSeeding Blog Categories and Posts...')
        
        # 1. Content Type
        content_type, _ = ContentType.objects.get_or_create(name="Blog")

        # 2. Categories
        categories_names = [
            "Poultry Farming",
            "Dairy Farming",
            "Animal Health & Veterinary",
            "Modern Agriculture Technology",
            "Farmer Training & Education",
            "Agribusiness & Investment"
        ]
        categories = {}
        for name in categories_names:
            cat, created = ContentCategory.objects.get_or_create(name=name)
            categories[name] = cat
            if created:
                self.stdout.write(f"  + Created Category: {name}")

        # 3. Blog Posts
        posts_data = [
            {
                "title": "Optimizing Poultry Yields in Ethiopia: A Comprehensive Guide",
                "category": "Poultry Farming",
                "excerpt": "Learn how to maximize your poultry farm's productivity through modern vaccination and feeding strategies tailored for the Ethiopian climate.",
                "body": (
                    "Poultry farming in Ethiopia is a rapidly growing sector with immense potential. To succeed, farmers must focus on three core pillars: biosecurity, nutrition, and breed selection. "
                    "In this guide, we explore the best practices for raising broilers and layers in various regions of Ethiopia. "
                    "Biosecurity is the first line of defense. Ensuring that your farm is shielded from common diseases like Newcastle Disease and Gumboro is essential. "
                    "Nutrition plays a vital role; using high-quality feed without unnecessary additives ensures healthy growth and high egg production. "
                    "Ethiopian farmers are increasingly adopting modern housing systems that provide better ventilation and waste management, significantly reducing mortality rates. "
                    "By following these guidelines, you can ensure a sustainable and profitable poultry operation."
                )
            },
            {
                "title": "Modern Dairy Management: From Feed to Milk Production",
                "category": "Dairy Farming",
                "excerpt": "Discover the latest techniques in dairy cattle management, focusing on Ethiopian highlands' unique environmental conditions.",
                "body": (
                    "Dairy farming is a cornerstone of Ethiopian agriculture. However, many small-scale farmers struggle with low milk yields. "
                    "The secret to high production lies in high-quality forage and proper cow comfort. "
                    "In the Ethiopian highlands, temperature and altitude play a significant role in cattle health. Breeding strategies that incorporate both local and exotic genes (like Holstein-Friesian) have shown great success in increasing yields. "
                    "Additionally, providing clean water and a balanced mineral supplement is non-negotiable. "
                    "Regular veterinary checks and timely artificial insemination can help maintain a consistent calving interval, ensuring a steady stream of income for the farm. "
                    "Join us as we break down the economics of a 10-cow dairy operation in Ethiopia."
                )
            },
            {
                "title": "Common Livestock Diseases and Prevention Strategies",
                "category": "Animal Health & Veterinary",
                "excerpt": "An overview of prevalent livestock diseases in East Africa and how to prevent them through vaccination and hygiene.",
                "body": (
                    "Animal health is the backbone of a successful farm. In Ethiopia, diseases like Foot and Mouth Disease (FMD), Peste des Petits Ruminants (PPR), and various tick-borne illnesses can devastate a herd. "
                    "Prevention is always better—and cheaper—than cure. A robust vaccination schedule, developed in consultation with experienced veterinarians, is the most effective way to protect your investment. "
                    "Hygiene on the farm cannot be overstated. Regular cleaning of sheds and quarantine of new arrivals are simple but effective measures. "
                    "Recognizing the early signs of illness, such as lethargy, loss of appetite, or abnormal discharge, can save lives. "
                    "At Trust Agro, we provide comprehensive veterinary services to help farmers navigate these challenges and ensure their livestock remains healthy and productive."
                )
            },
            {
                "title": "Harnessing IoT and Drip Irrigation for Ethiopian Farms",
                "category": "Modern Agriculture Technology",
                "excerpt": "How smart technology and efficient water management are transforming traditional farming practices in Ethiopia.",
                "body": (
                    "Technology is no longer a luxury in agriculture; it's a necessity. With changing weather patterns, Ethiopian farmers are turning to smart irrigation systems. "
                    "Drip irrigation allows for precise water delivery to the roots, saving up to 60% more water compared to traditional methods. "
                    "Furthermore, IoT-enabled soil sensors can tell a farmer exactly when to water and fertilize, preventing waste and optimizing growth. "
                    "These technologies are becoming more affordable and accessible to medium-scale investors. "
                    "By integrating tech into your farm, you not only increase efficiency but also build resilience against drought. "
                    "We explore some of the successful tech adoptions in the Rift Valley and Oromia regions."
                )
            },
            {
                "title": "Empowering the Next Generation of Farmers",
                "category": "Farmer Training & Education",
                "excerpt": "Why education is the most critical input for modern agricultural success in Africa.",
                "body": (
                    "Farming is a business, and like any business, it requires knowledge and skill. "
                    "Training the next generation of Ethiopian farmers is vital for national food security. "
                    "At Trust Agro, we believe in hands-on learning. Our training programs cover everything from basic animal husbandry to advanced agribusiness management. "
                    "We see a trend of young graduates returning to the land, bringing fresh perspectives and a willingness to innovate. "
                    "Education helps farmers move from subsistence to commercial farming, allowing them to better understand market dynamics and supply chain management. "
                    "Knowledge sharing between experienced senior farmers and tech-savvy youth creates a powerful synergy that can drive the sector forward."
                )
            },
            {
                "title": "Investing in Ethiopian Agriculture: Opportunities and Risks",
                "category": "Agribusiness & Investment",
                "excerpt": "A deep dive into the investment landscape of Ethiopia's agricultural sector for domestic and international investors.",
                "body": (
                    "Ethiopia offers vast tracts of fertile land and a diverse range of agro-ecological zones. "
                    "The government has prioritized agriculture as a key driver of economic growth, offering various incentives for investors. "
                    "Opportunities abound in high-value crops, livestock processing, and agricultural machinery. "
                    "However, investors must navigate land lease regulations, infrastructure challenges, and market fluctuations. "
                    "Success requires a long-term vision and strong local partnerships. "
                    "Understanding the local context, from labor relations to community engagement, is as important as the technical aspects of the project. "
                    "We provide a roadmap for those looking to invest in Ethiopia's green gold."
                )
            },
            {
                "title": "Scaling Your Broiler Operation: Best Practices",
                "category": "Poultry Farming",
                "excerpt": "Practical tips for expanding your poultry business from 500 to 5000 birds.",
                "body": (
                    "Scaling a poultry farm requires more than just more birds; it requires better systems. "
                    "As you grow, feed conversion ratios (FCR) become the difference between profit and loss. "
                    "Automated feeding and watering systems can reduce labor costs and minimize waste. "
                    "Market timing is also crucial—aligning your production cycles with peak demand periods like holidays can significantly boost revenue. "
                    "We also discuss the importance of vertical integration, such as producing your own feed or managing your own distribution channels. "
                    "Scaling is a journey, and we are here to support you at every step with expert consulting."
                )
            },
            {
                "title": "High-Quality Forage: The Secret to Dairy Success",
                "category": "Dairy Farming",
                "excerpt": "Why the quality of what your cows eat is the most important factor in milk yield.",
                "body": (
                    "You are what you eat, and the same applies to dairy cows. "
                    "In Ethiopia, many dairy farms rely on crop residues which are low in nutritional value. "
                    "Transitioning to improved forage species like Alfalfa, Napier Grass, and Desho Grass can double milk production. "
                    "Silage making is another critical skill for ensuring feed availability during the dry season. "
                    "We explain the process of harvesting, chopping, and fermenting forage to maintain its nutritional quality. "
                    "Investing in your pasture is often more profitable than buying expensive concentrates. "
                    "Learn how to manage your forage production as a 'crop' within your dairy business."
                )
            }
        ]

        for p in posts_data:
            post, created = Post.objects.get_or_create(
                title=p['title'],
                defaults={
                    'excerpt': p['excerpt'],
                    'body': p['body'],
                    'content_type': content_type,
                    'content_category': categories[p['category']],
                    'is_published': True,
                    'published_at': now()
                }
            )
            if created:
                self.stdout.write(f"  + Created Post: {p['title']}")

    def seed_team_members(self):
        self.stdout.write('\nSeeding Team Members...')
        team_data = [
            {
                "name": "Dr. Abebe Kebede",
                "role": "Chief Veterinary Surgeon",
                "order": 1,
                "experience_short": "15+ years in Large Animal Surgery",
                "email": "abebe.k@trustagro.com",
                "linkedin_url": "https://linkedin.com/in/dr-abebe-kebede"
            },
            {
                "name": "Tigist Bekele",
                "role": "Lead Agricultural Consultant",
                "order": 2,
                "experience_short": "Expert in Agribusiness Investment",
                "email": "tigist.b@trustagro.com",
                "linkedin_url": "https://linkedin.com/in/tigist-bekele"
            },
            {
                "name": "Samuel Tadesse",
                "role": "Animal Nutrition Specialist",
                "order": 3,
                "experience_short": "Feed Formulation Expert",
                "email": "samuel.t@trustagro.com",
                "linkedin_url": "https://linkedin.com/in/samuel-tadesse"
            },
            {
                "name": "Martha Haile",
                "role": "Farm Operations Manager",
                "order": 4,
                "experience_short": "Certified Poultry Specialist",
                "email": "martha.h@trustagro.com",
                "linkedin_url": "https://linkedin.com/in/martha-haile"
            },
            {
                "name": "Dawit Girma",
                "role": "Modern Ag Tech Lead",
                "order": 5,
                "experience_short": "IoT & Irrigation Systems Engineer",
                "email": "dawit.g@trustagro.com",
                "linkedin_url": "https://linkedin.com/in/dawit-girma"
            },
            {
                "name": "Meron Solomon",
                "role": "Farmer Training Coordinator",
                "order": 6,
                "experience_short": "Community Outreach & Education",
                "email": "meron.s@trustagro.com",
                "linkedin_url": "https://linkedin.com/in/meron-solomon"
            }
        ]

        for t in team_data:
            member, created = TeamMember.objects.get_or_create(
                name=t['name'],
                defaults={
                    'role': t['role'],
                    'order': t['order'],
                    'experience_short': t['experience_short'],
                    'email': t['email'],
                    'linkedin_url': t['linkedin_url'],
                    'is_active': True
                }
            )
            if created:
                self.stdout.write(f"  + Created Team Member: {t['name']}")
            else:
                self.stdout.write(f"  = Team Member already exists: {t['name']}")
