from django.shortcuts import render

def index(request):
    return render(request, 'home/welcome.html')


def resume(request):
    return render(request, 'home/resume.html')


def portfolio(request):
    return render(request, 'home/portfolio.html')


def blog(request):
    return render(request, 'home/blog.html')


def contact(request):
    return render(request, 'home/contact.html')
