/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

const nextcloud_default = {
    nextcloud_configured: false,
    nextcloud_configuring: false,
    nextcloud_installed: true
};

export const nextcloud_configuring = {
    nextcloud_configured: false,
    nextcloud_configuring: true,
    nextcloud_installed: true
};

export const nextcloud_configured = {
    nextcloud_configured: true,
    nextcloud_configuring: false,
    nextcloud_installed: true
};

export default nextcloud_default;
