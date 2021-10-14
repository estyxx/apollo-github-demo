import { MockedResponse } from "@apollo/client/testing";
import { MockedProvider } from "@apollo/react-testing";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { NotificationProvider } from "contexts/Notifications";
import { ReactElement } from "react";

type ProvidersProps = {
  mocks?: MockedResponse[];
};

const Providers: React.FC<ProvidersProps> = ({ mocks = [], children }) => {
  console.log("Provider!! got mockss!!");
  return (
    <MockedProvider mocks={mocks}>
      <NotificationProvider>{children}</NotificationProvider>
    </MockedProvider>
  );
};

type CustomRenderOptions = {
  ProviderOptions?: ProvidersProps;
  testingLibraryOptions?: RenderOptions;
};

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions,
): RenderResult => {
  return render(ui, {
    wrapper: (props: any) => <Providers {...props} {...options?.ProviderOptions} />,
    ...options?.testingLibraryOptions,
  });
};

// override render method
export { customRender as render };
