"""
URL configuration for petpal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from petpal import settings
from django.conf.urls.static import static

admin.site.site_header = "Mini_blog_header"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin_tools_stats/', include('admin_tools_stats.urls')),
    path('pet_listings/', include('pet_listings.urls', namespace='pet_listings')),
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('comments/', include('comments.urls', namespace='comments')),
    path('applications/', include('applications.urls', namespace='applications')),
    path('notifications/', include('notifications.urls', namespace='notifications')),
    path('analytics/' , include('analytics.urls', namespace='analytics')),
    path('shelter_analytics/' , include('shelter_analytics.urls', namespace='shelter_analytics'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
