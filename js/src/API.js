/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { REFORIS_URL_PREFIX } from "foris";

const API_URL_PREFIX = `${REFORIS_URL_PREFIX}/nextcloud/api`;

const API_URLs = new Proxy(
    {
        nextcloud: "/nextcloud",
    },
    {
        get: (target, name) => `${API_URL_PREFIX}${target[name]}`,
    }
);

export default API_URLs;
