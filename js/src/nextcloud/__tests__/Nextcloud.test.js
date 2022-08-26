/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import mockAxios from "jest-mock-axios";
import { render } from "foris/testUtils/customTestRender";

import Nextcloud from "../Nextcloud";

describe("<Nextcloud />", () => {
    it("should render component", () => {
        const { getByText } = render(<Nextcloud />);
        expect(getByText("Nextcloud")).toBeDefined();
        expect(mockAxios.get).toBeCalledWith(
            "/reforis/nextcloud/api/example",
            expect.anything()
        );
    });
});
