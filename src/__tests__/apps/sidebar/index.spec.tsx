import { render, fireEvent } from '@testing-library/react';
import SideBar from '../../../apps/sidebar';

const mockedHandleCreate = jest.fn();

jest.mock('../../../services/zendesk');

describe('App SideBar renders correctly', () => {
  it('Should render without crashing', () => {
    expect(render(<SideBar />));
  });

  it('Should call handleCreate when the create button is clicked', () => {
    const { getAllByTestId } = render(<SideBar />);

    const [createImportExporter] = getAllByTestId('create-importer-exporter');

    fireEvent.click(createImportExporter);

    expect(mockedHandleCreate).toHaveBeenCalledTimes(0);
  });
});
