import pytest

from reforis_nextcloud import blueprint


pytest_plugins = 'reforis.test_utils.fixtures'


@pytest.fixture(scope='module')
def app(app_with_blueprint):
    return app_with_blueprint(blueprint)
