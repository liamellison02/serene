from requests import Session
from typing import Tuple

HOST = 'https://api.twitter.com'


class AuthCreds(Tuple):
    consumer_api_key: str
    consumer_api_secret: str


class TwitterClient:
    def __init__(self, credentials: AuthCreds, **kwargs):
        self._key = credentials.consumer_api_key
        self._secret = credentials.consumer_api_secret
        self._session: Session = self.authenticate()
        for k, v in kwargs.items():
            setattr(self, k, v)

    def authenticate(self) -> Session:
        session = Session()
        creds = (self._key, self._secret)
        res = session.post(url=f'{HOST}/oauth2/token', auth=creds, params={'grant_type': 'client_credentials'})
        if not res.ok:
            res.raise_for_status()
        else:
            headers = {'Authorization': f"Bearer {res.json()['access_token']}"}
            session.headers.update(headers)

        return session

    def post(self, endpoint, **kwargs):
        res = self._session.post(url=(HOST + endpoint), **kwargs)
        if not res.ok:
            res.raise_for_status()

        return res

    def get(self, endpoint, **kwargs):
        res = self._session.get(url=(HOST + endpoint), **kwargs)
        if not res.ok:
            res.raise_for_status()

        return res
