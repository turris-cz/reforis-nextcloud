/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import Nextcloud from "./nextcloud/Nextcloud";
import NextcloudIcon from "./nextcloud/NextcloudIcon";

const NextcloudPlugin = {
    name: _("Nextcloud"),
    weight: 76,
    path: "/nextcloud",
    icon: <NextcloudIcon />,
    component: Nextcloud,
};

ForisPlugins.push(NextcloudPlugin);
