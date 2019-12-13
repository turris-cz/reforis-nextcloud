from reforis.test_utils import get_mocked_client

def get_mocked_nextcloud_client(*args, **kwargs):
    return get_mocked_client('reforis_nextcloud', *args, *kwargs)
