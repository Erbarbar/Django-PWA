# Django-PWA
This project is meant to be the base for any django progressive web app. It is already setup for heroku deployment.

----
## Installation
#### Clone from this repo
Clone the project to your desired directory, and deploy it to your repository.

```
$ git clone https://github.com/Erbarbar/Django-PWA .
$ cd Django-PWA
```
Delete the `.git` folder. From Windows console it can be done with `$ rd /Q /S .git`
```
$ git init
$ git remote add origin https://githb.com/<your_remote_repository>
```
#### Create Heroku app
Go to your Heroku account, and create a new app. After that, go to the `Resources` tab to `Find more addons`, and add `Heroku postgres` to the app just created.
Next, go to your app `Settings` tab, `Reveal Config Vars`, and make sure you have `DATABASE_URL` set up. Add another config var by typing in the `Key` field:
```
DISABLE_COLLECTSTATIC
```
And in the `Value` field:
```
1
```
#### Enable automatic deployment
Go to the `Deploy` tab and under `Deployment method` pick the GitHub one. Search for the repository you're going to push and `Enable Automatic Deploys`. 

#### Change links in settings and javascript
Go to `settings.py` and change the `ALLOWED_HOSTS` from `['*']` to `['<your_heroku_url>']`

#### Deploy
Finally, push the changes to your repository, which will trigger Heroku to build from it.
```
$ git add .
$ git commit -m "First commit"
$ git push -u origin master
```
#### Generate secret key

Wait for Heroku to finish the update, and check for any errors. After everything has settled down, click the `More` button (top-right on heroku dashboard), `Run console`, and run the commands:
```
python manage.py shell
$ from django.core.management.utils import get_random_secret_key
$ get_random_secret_key()
```
Copy the returned string (should be something like `0@tuu0=zsc=(*xujw393_$@dl1f8@b7=1(!nbby^5$2gq6qqoj`).
Create another config var in Heroku (`Settings`>`Reveal Config Vars`) with `Key` as `SECRET_KEY`, and `Value` as the string just copied.

Finally, run a command to migrate the models to the database: 

```
python manage.py migrate
```

Your app is now completely configured and ready to go!

## Customization

#### Adding objects
For `adding` objects to the database, run on Heroku console:
```
python manage.py shell
$ from pwapp.models import table
$ t = table(text="Text here")
$ t.save()
```
For `deleting` objects:
```
$ table.objects.filter(text="Text here").delete()
```


#### Icons
To change the default icons, create a `static` folder in the project root directory, inside it add another folder `images`. Inside this folder add the directory `icons`. Finally, add the icons you want your app to serve. 
It is recommended that you use a name format that includes the dimensions of the icon (ex: `icon-512x512.png` for a 512px icon).
For each icon you add, make sure you add it in the `settings.py` to the `PWA_APP_ICONS` list:
```
PWA_APP_ICONS = [
    {
        'src': '/static/images/icons/icon-192x192.png',
        'sizes': '192x192',
        'type': 'image/png',
    },
    {
        'src': '/static/images/icons/icon-512x512.png',
        'sizes': '512x512',
        'type': 'image/png',
    }
]
```
For more customization check the [pwa app used in this project](https://github.com/silviolleite/django-pwa)
