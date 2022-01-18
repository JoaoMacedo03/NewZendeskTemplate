import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { create } from '@mui/material/styles/createTransitions';
import { Zendesk } from '../../../services/zendesk';
import SideBar from '../../../apps/sidebar';

jest.mock('../../../services/zendesk');
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

describe('App SideBar renders correctly', () => {
  it('Should render without crashing', () => {
    render(<SideBar />);
    expect(screen.getByTestId('create-importer-exporter')).toBeInTheDocument();
  });

  it('Should fail when the handleCreate function is called withou an importerExporter', async () => {
    const spyZendeskNotify = jest.spyOn(Zendesk.prototype, 'notify');

    render(<SideBar />);

    const createButton = screen.getByTestId('create-importer-exporter');
    fireEvent.click(createButton);

    expect(spyZendeskNotify).toHaveBeenCalledWith(
      'apps.sidebar.errorImporterExporterNotInformed',
      'error',
    );
  });

  it('Should return success when the handleCreate is called with an importerExporter', async () => {
    const spyZendeskNotify = jest.spyOn(Zendesk.prototype, 'notify');
    const spyZendesRequest = jest
      .spyOn(Zendesk.prototype, 'request')
      .mockImplementation(() => new Promise(() => {}));

    render(<SideBar />);

    const fieldImporterExporter = screen.getByTestId('input-importer-exporter');
    fireEvent.input(fieldImporterExporter, {
      target: { value: 'Importador/Exportador' },
    });

    const createButton = screen.getByTestId('create-importer-exporter');
    fireEvent.click(createButton);

    await waitFor(() => createButton);

    expect(spyZendesRequest).toHaveBeenCalled();
    expect(spyZendeskNotify).toHaveBeenCalledWith(
      'apps.sidebar.successCreateImporterExporter',
      'success',
    );
  });

  // it('Should show an error when habdleCreate is called with no importerExporter', async () => {
  //   const { getAllByTestId } = render(<SideBar />);

  //   const [createImportExporter] = getAllByTestId('create-importer-exporter');
  //   const [input] = getAllByTestId('input-importer-exporter');
  //   // console.log('Input -> ', input);
  //   // console.log('Button -> ', createImportExporter);

  //   fireEvent.input(input, { target: '' });
  //   const teste = fireEvent.click(createImportExporter);
  //   console.log('?? -> ', teste);
  //   await waitFor(() => createImportExporter);
  // });

  // it('Should call handleCreate when the create button is clicked', () => {
  //   const { getAllByTestId } = render(<SideBar />);

  //   const [createImportExporter] = getAllByTestId('create-importer-exporter');

  //   fireEvent.click(createImportExporter);

  //   expect(mockedHandleCreate).toHaveBeenCalledTimes(0);
  // });
});
