from django.http import JsonResponse
from django.shortcuts import render
from twitmaker.models import Tweet
from twitmaker.forms import TweetForm


def index(request):
    return render(request, 'index.html', {
        'tweets': Tweet.objects.all(),
        'form': TweetForm()
    })


def create_tweet(request):
    form = TweetForm(request.POST)
    tweet = form.instance
    if form.is_valid():
        form.save()
        return JsonResponse({'success': True, 'tweet': {'message': tweet.message, 'created_at': tweet.created_at}})
    else:
        return JsonResponse({'success': False})
