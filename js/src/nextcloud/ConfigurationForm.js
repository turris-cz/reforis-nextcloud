/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";

import {
    API_STATE,
    Button,
    TextInput,
    PasswordInput,
    useAPIPost,
    useForm,
    useAlert,
    undefinedIfEmpty,
    withoutUndefinedKeys,
} from "foris";
import PropTypes from "prop-types";

import API_URLs from "API";

ConfigurationForm.propTypes = {
    setIsConfiguring: PropTypes.func.isRequired,
};

export default function ConfigurationForm({ setIsConfiguring }) {
    const [setAlert] = useAlert();
    const [postNextcloudResponse, postNextcloud] = useAPIPost(
        API_URLs.nextcloud
    );

    useEffect(() => {
        if (postNextcloudResponse.state === API_STATE.ERROR) {
            setAlert(postNextcloudResponse.data);
            setIsConfiguring(false);
        }
    }, [postNextcloudResponse, setAlert, setIsConfiguring]);

    const [formState, formChangeHandler, reloadForm] = useForm(validator);
    const formData = formState.data;
    const formErrors = formState.errors || {};

    useEffect(() => {
        reloadForm({ login: "", password: "" });
    }, [reloadForm]);

    const handleSubmit = (event) => {
        event.preventDefault();
        postNextcloud({ data: { credentials: formData } });
        setIsConfiguring(true);
    };

    if (!formData) {
        return null;
    }

    const buttonIsDisabled = undefinedIfEmpty(formErrors);

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                label={_("Username")}
                value={formData.login || ""}
                error={formErrors.login}
                onChange={formChangeHandler((value) => ({
                    login: { $set: value },
                }))}
            />
            <PasswordInput
                label={_("Password")}
                newPass
                withEye
                value={formData.password || ""}
                error={formErrors.password}
                onChange={formChangeHandler((value) => ({
                    password: { $set: value },
                }))}
            />
            <div className="text-end">
                <Button type="submit" forisFormSize disabled={buttonIsDisabled}>
                    {_("Save")}
                </Button>
            </div>
        </form>
    );
}

function validator({ login, password }) {
    const errors = {
        login: !login ? _("Username cannot be empty.") : undefined,
        password: !password ? _("Password cannot be empty.") : undefined,
    };
    return undefinedIfEmpty(withoutUndefinedKeys(errors));
}
