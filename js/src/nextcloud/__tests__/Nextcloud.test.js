/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import mockAxios from "jest-mock-axios";

import {
    act,
    render,
    wait,
    getByText,
    getByLabelText,
    fireEvent,
} from "foris/testUtils/customTestRender";
import { WebSockets } from "foris";
import { mockJSONError } from "foris/testUtils/network";

import Nextcloud from "../Nextcloud";
import {
    nextcloud_configured,
    nextcloud_configuring,
} from "./__fixtures__/nextcloud";
import nextcloud_default from "./__fixtures__/nextcloud";

describe("<Nextcloud />", () => {
    let webSockets;
    let container;

    beforeEach(() => {
        webSockets = new WebSockets();
        ({ container } = render(<Nextcloud ws={webSockets} />));
    });

    it("should render spinner", () => {
        expect(container).toMatchSnapshot();
    });

    it("should render error", async () => {
        expect(mockAxios.get).toBeCalledWith(
            "/reforis/nextcloud/api/nextcloud",
            expect.anything()
        );
        mockJSONError();
        await wait(() => expect(container).toMatchSnapshot());
    });

    it("should render Nextcloud", async () => {
        mockAxios.mockResponse({ data: nextcloud_default });
        await wait(() =>
            expect(getByText(container, "Nextcloud Configuration")).toBeTruthy()
        );
        await wait(() => expect(container).toMatchSnapshot());
    });

    it("should render Nextcloud configuring", async () => {
        mockAxios.mockResponse({ data: nextcloud_configuring });
        await wait(() =>
            expect(getByText(container, "Configuring Nextcloud…")).toBeTruthy()
        );
        await wait(() => expect(container).toMatchSnapshot());
    });

    it("should render Nextcloud configured", async () => {
        mockAxios.mockResponse({ data: nextcloud_configured });
        await wait(() =>
            expect(getByText(container, "Congratulations!🎉")).toBeTruthy()
        );
        await wait(() => expect(container).toMatchSnapshot());
    });

    it("should configure Nextcloud", async () => {
        mockAxios.mockResponse({ data: nextcloud_default });
        await wait(() =>
            expect(getByText(container, "Nextcloud Configuration")).toBeTruthy()
        );

        const username = "some_username";
        const password = "some_password";
        const usernameInput = getByLabelText(container, "Username");
        const passwordInput = getByLabelText(container, "Password");
        const submitButton = getByText(container, "Save");

        fireEvent.change(usernameInput, { target: { value: username } });
        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.click(submitButton);

        expect(mockAxios.post).toBeCalledWith(
            "/reforis/nextcloud/api/nextcloud",
            {
                credentials: {
                    login: username,
                    password: password,
                },
            },
            expect.anything()
        );
        mockAxios.mockResponse({ data: nextcloud_configuring });

        await wait(() =>
            expect(getByText(container, "Configuring Nextcloud…")).toBeTruthy()
        );

        act(() =>
            webSockets.dispatch({
                module: "nextcloud",
                action: "state_change",
                data: { configuration: "completed" },
            })
        );

        expect(mockAxios.get).toHaveBeenNthCalledWith(
            2,
            "/reforis/nextcloud/api/nextcloud",
            expect.anything()
        );
        mockAxios.mockResponse({ data: nextcloud_configured });

        await wait(() =>
            expect(getByText(container, "Congratulations!🎉")).toBeTruthy()
        );
    });
});
