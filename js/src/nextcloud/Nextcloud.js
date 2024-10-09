/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect, useState } from "react";

import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    useAlert,
    SpinnerElement,
    formFieldsSize,
    useAPIGet,
    useWSForisModule,
    withErrorMessage,
    withSpinnerOnSending,
} from "foris";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ConfigurationForm from "./ConfigurationForm";
import API_URLs from "../API";

Nextcloud.propTypes = {
    ws: PropTypes.object.isRequired,
};

export default function Nextcloud({ ws }) {
    const [nextcloud, getNextcloud] = useAPIGet(API_URLs.nextcloud);

    useEffect(() => {
        getNextcloud();
    }, [getNextcloud]);

    return (
        <>
            <h1>{_("Nextcloud")}</h1>
            <p>
                {_(
                    "Nextcloud puts your data at your fingertips, under your control. Store your documents, calendar, contacts and photos on a server at home."
                )}
            </p>
            <p>
                {_(
                    "Before installing and configuring Nextcloud, it's important to first set up external storage, as using the router's internal flash memory can cause it to wear out quickly and affect performance. For more information, see the "
                )}
                <a
                    href="https://docs.turris.cz/geek/nextcloud/nextcloud/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {_("documentation")}
                    <sup>
                        <FontAwesomeIcon
                            icon={faExternalLinkAlt}
                            className="ms-1 fa-xs"
                        />
                    </sup>
                </a>
                .&nbsp;
                {_(
                    "For the best results, it's recommended to use an external drive or SSD. You can easily configure external storage by using the "
                )}
                <Link to="/storage" title="Go to Storage plugin">
                    {_("Storage plugin")}
                </Link>
                .
            </p>

            <ConfigurationWithErrorAndSpinner
                ws={ws}
                apiState={nextcloud.state}
                nextcloud={nextcloud.data}
                getNextcloud={getNextcloud}
            />
        </>
    );
}

const ConfigurationWithErrorAndSpinner = withErrorMessage(
    withSpinnerOnSending(Configuration)
);

Configuration.propTypes = {
    ws: PropTypes.object.isRequired,
    nextcloud: PropTypes.object.isRequired,
    getNextcloud: PropTypes.func.isRequired,
};

function Configuration({ ws, nextcloud, getNextcloud }) {
    const [setAlert] = useAlert();
    const [isConfiguring, setIsConfiguring] = useState(false);
    const [configurationStateWS] = useWSForisModule(
        ws,
        "nextcloud",
        "state_change"
    );

    useEffect(() => {
        if (!configurationStateWS) return;

        if (configurationStateWS.configuration === "failed") {
            setAlert(configurationStateWS.msg);
            getNextcloud();
        }
        if (configurationStateWS.configuration === "completed") {
            getNextcloud();
        }
    }, [configurationStateWS, getNextcloud, setAlert]);

    const { nextcloud_configuring, nextcloud_configured } = nextcloud;

    let componentContent;
    if (nextcloud_configuring || isConfiguring) {
        componentContent = (
            <div className="d-flex justify-content-center align-items-center text-muted">
                <SpinnerElement small className="text-primary" />
                <p className="ms-1 mb-0">{_("Configuring Nextcloud…")}</p>
            </div>
        );
    } else if (nextcloud_configured) {
        componentContent = (
            <div className="text-muted text-center">
                <p className="mb-2">{_("Congratulations!🎉")}</p>
                <p className="mb-0">
                    {_(
                        "You have configured your Nextcloud and now you can visit the "
                    )}
                    <a
                        href="/nextcloud"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {_("site")}
                        <sup>
                            <FontAwesomeIcon
                                icon={faExternalLinkAlt}
                                className="ms-1 fa-xs"
                            />
                        </sup>
                    </a>
                </p>
            </div>
        );
    } else {
        componentContent = (
            <ConfigurationForm setIsConfiguring={setIsConfiguring} />
        );
    }

    return (
        <div className={formFieldsSize}>
            <h2>{_("Nextcloud Configuration")}</h2>
            <p>{_("Create an administrator account for Nextcloud.")}</p>
            {componentContent}
        </div>
    );
}
