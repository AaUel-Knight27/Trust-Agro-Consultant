from django.core.management.base import BaseCommand
import cloudinary
import cloudinary.uploader

class Command(BaseCommand):
    help = 'Test Cloudinary connection'

    def handle(self, *args, **kwargs):
        try:
            cfg = cloudinary.config()
            if not cfg.cloud_name:
                self.stdout.write(self.style.ERROR(
                    'FAIL: cloud_name is empty. Check your .env file.'
                ))
                return

            self.stdout.write(f'Cloud name: {cfg.cloud_name}')
            self.stdout.write(f'API key set: {"YES" if cfg.api_key else "NO"}')
            self.stdout.write(f'API secret set: {"YES" if cfg.api_secret else "NO"}')

            # Upload a tiny test image
            result = cloudinary.uploader.upload(
                'https://res.cloudinary.com/demo/image/upload/sample.jpg',
                folder='trust_agro_test',
                public_id='connection_test',
            )
            self.stdout.write(self.style.SUCCESS(
                f'SUCCESS: Test image uploaded to Cloudinary!'
            ))
            self.stdout.write(f'URL: {result["secure_url"]}')

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'FAIL: {e}'))
