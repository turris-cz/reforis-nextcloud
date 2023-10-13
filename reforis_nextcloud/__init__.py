#  Copyright (C) 2019-2023 CZ.NIC z.s.p.o. (https://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

""" Nextcloud module for reForis """

from pathlib import Path
from http import HTTPStatus

from flask import Blueprint, current_app, jsonify, request
from flask_babel import gettext as _

from reforis.foris_controller_api.utils import validate_json, APIError

blueprint = Blueprint(
    'Nextcloud',
    __name__,
    url_prefix='/nextcloud/api',
)

BASE_DIR = Path(__file__).parent

nextcloud = {
    'blueprint': blueprint,
    # Define {python_module_name}/js/app.min.js
    # See https://gitlab.labs.nic.cz/turris/reforis/reforis-distutils/blob/master/reforis_distutils/__init__.py#L11
    'js_app_path': 'reforis_nextcloud/js/app.min.js',
    'translations_path': BASE_DIR / 'translations',
}


@blueprint.route('/nextcloud', methods=['GET'])
def get_status():
    """ Get status of Nextcloud module """
    return jsonify(current_app.backend.perform('nextcloud', 'get_status'))


@blueprint.route('/nextcloud', methods=['POST'])
def configure_nextcloud():
    """ Configure Nextcloud module """
    validate_json(request.json)

    response = current_app.backend.perform(
        'nextcloud', 'configure_nextcloud', request.json
    )
    if response.get('result') is not True:
        raise APIError(
            _('Cannot configure Nextcloud'), HTTPStatus.INTERNAL_SERVER_ERROR
        )

    return jsonify(response), HTTPStatus.ACCEPTED
