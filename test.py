import requests

url = 'http://localhost:3003'

template_name = 'ppt1.pptx'

def configure():
    t = {
        'host':'documents.staging.juniorisep.com',
        'access_key':'adminadmin',
        'pass_key':'adminadmin',
        'secure':True,
    }

    res = requests.post(url+'/configure', json=t)
    print(res)
    print(res.text)

def load_templates():
    print('trying to load')
    t = [
        {'bucket_name': 'new-templates', 'template_name': template_name, 'exposed_as':template_name}
    ]

    res = requests.post(url+'/load_templates', json=t)
    print(res)
    print(res.text)


def publipost():
    print('trying to publipost')
    data = {
        'template_name': template_name,
        'data': {
            'mission': {
                'company': {
                    'name':'DEM NAME'
                }
            },
        },
        'output_bucket': 'temporary',
        'output_name': 'test.pptx'
    }

    res = requests.post(url+'/publipost', json=data)
    print(res)
    print(res.text)


def get_placeholders():
    print('getting placeholders')

    data = {
        'name': template_name
    }

    res = requests.post(url+'/get_placeholders', json=data)
    print(res)
    print(res.text)


if __name__ == '__main__':
    configure()
    load_templates()
    publipost()
    # get_placeholders()
    # get_placeholders()
