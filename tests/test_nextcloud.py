#  Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from http import HTTPStatus
from reforis.test_utils import mock_backend_response


NEXTCLOUD_URL = "/nextcloud/api/nextcloud"


@mock_backend_response(
    {
        "nextcloud": {
            "get_status": {
                "nextcloud_configured": False,
                "nextcloud_configuring": False,
                "nextcloud_installed": True,
            }
        }
    }
)
def test_get_settings(client):
    response = client.get(NEXTCLOUD_URL)
    assert response.status_code == HTTPStatus.OK
    assert response.json["nextcloud_installed"] is True
    assert response.json["nextcloud_configuring"] is False
    assert response.json["nextcloud_configured"] is False


@mock_backend_response({"nextcloud": {"configure_nextcloud": {"result": True}}})
def test_post_settings_invalid_json(client):
    response = client.post(NEXTCLOUD_URL, json=False)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json == "Invalid JSON"


@mock_backend_response({"nextcloud": {"configure_nextcloud": {"result": True}}})
def test_post_settings(client):
    response = client.post(
        NEXTCLOUD_URL,
        json={"credentials": {"login": "test", "password": "testpass"}},
    )
    assert response.status_code == HTTPStatus.ACCEPTED


@mock_backend_response({'nextcloud': {'configure_nextcloud': {'result': False}}})
def test_post_settings_bad_foris_controller_response(client):
    response = client.post(
        NEXTCLOUD_URL, json={"login": "test", "password": "testpass"}
    )
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
    assert response.json == "Cannot configure Nextcloud"
