/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect, useState } from "react";

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
            <div className="d-flex flex-row justify-content-center text-muted">
                <SpinnerElement small>
                    <p className="ml-1">{_("Configuring Nextcloud…")}</p>
                </SpinnerElement>
            </div>
        );
    } else if (nextcloud_configured) {
        componentContent = (
            <div className="text-muted text-center">
                <p className="mb-2">{_("Congratulations!🎉")}</p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: _(
                            'You have configured your Nextcloud now you can visit the <a href="/nextcloud" target="_blank" rel="noopener noreferrer">site<sup><i class="fas fa-external-link-alt fa-sm ml-1"></i></sup></a>.'
                        ),
                    }}
                />
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
            <p>{_("Create an admininstrator account for Nextcloud.")}</p>
            {componentContent}
        </div>
    );
}
