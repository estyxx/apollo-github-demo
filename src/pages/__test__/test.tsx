import React from "react";
import { screen } from "@testing-library/react";
import Home from "../../pages/index";
// import Home from 'pages/index';
import { render } from "../../utils/jest-utils";
import { repositoryResult } from "./mocks";
import { RepositoryDocument as RepositoryQuery } from "../../types";
import { waitFor } from "@testing-library/dom";
import { MockedProvider } from "@apollo/client/testing";

describe("Home", () => {
  it("renders the table", async () => {
    const mocks = [
      {
        request: {
          query: RepositoryQuery,
          variables: {},
        },
        result: {
          data: {
            consignments: {
              ...repositoryResult,
            },
          },
        },
      },
    ];
    const { debug, container } = render(<Home />, {
      ProviderOptions: { mocks: mocks },
    });

    await waitFor(
      () => {
        expect(
          screen.findByText("Interfaces should not work with input types"),
        ).toBeTruthy()
        debug()
      },
      { container: container },
    );

  });
});
