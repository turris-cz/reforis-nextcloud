/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import Nextcloud from "./nextcloud/Nextcloud";

const NextcloudPlugin = {
    name: _("Nextcloud"),
    submenuId: "administration",
    weight: 100,
    path: "/nextcloud",
    component: Nextcloud,
};

ForisPlugins.push(NextcloudPlugin);
